import {
  HttpException,
  HttpService,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { User } from '../models/user.entity';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from '../models/role.entity';
import * as bcrypt from 'bcryptjs';
import { RolesEnum } from '../auth/roles.enum';
import { StudentsService } from '../students/students.service';
import { CreateStudentDto } from '../students/dto/create-student.dto';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import { CreatedUserDto } from './dto/created-user.dto';
import { TeacherService } from '../teacher/teacher.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { UserDto } from './dto/user.dto';
import moment from 'moment';
import { PageMetaDto } from '../common/dtos/page-meta.dto';
import { PageDto } from '../common/dtos/page.dto';
import { PageOptionsDto } from '../common/dtos/page-options.dto';
import { RolesService } from '../roles/roles.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
    private studentsService: StudentsService,
    private rolesService: RolesService,
    private teacherService: TeacherService,
    private httpService: HttpService,
    private configService: ConfigService,
    private jwtService: JwtService,
    @InjectConnection() private connection: Connection,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async createUser(dto: CreateUserDto) {
    return await this.connection.transaction(async (manager) => {
      const login = await UsersService.generateLogin(
        dto.firstName,
        dto.lastName,
      );

      if (await this.checkExistUserByLogin(login)) {
        throw new HttpException(
          'Пользователь с такими данными уже существует!',
          HttpStatus.BAD_REQUEST,
        );
      }

      const randomPassword = Math.random().toString(36).slice(-8);
      const hashPassword = await bcrypt.hash(randomPassword, 5);

      const user = await manager.getRepository(User).save({
        firstName: dto.firstName,
        lastName: dto.lastName,
        middleName: dto.middleName,
        login: login,
        password: hashPassword,
        phone: dto.phone,
        email: dto.email,
        birthDate: dto.birthDate,
        roles: await this.rolesService.getRolesByEnumArray(dto.roles),
      });

      if (dto.roles.includes(RolesEnum.Student)) {
        const studentDto: CreateStudentDto = {
          parentEmail: dto.parentEmail,
          parentLastName: dto.parentLastName,
          parentMiddleName: dto.parentMiddleName,
          parentName: dto.parentName,
          parentPhone: dto.parentPhone,
          userId: user.id,
        };
        await this.studentsService.createStudentWithManager(
          studentDto,
          manager,
        );
      }

      if (dto.roles.includes(RolesEnum.Teacher)) {
        await this.teacherService.createTeacherWithManager(user.id, manager);
      }

      const createdUser: CreatedUserDto = {
        id: String(user.id),
        login: user.login,
        firstName: user.firstName,
        lastName: user.lastName,
        middleName: user.middleName,
        creditionalsNoteLink: await this.generateCreditionalsNoteLink(
          login,
          randomPassword,
        ),
        roles: dto.roles,
      };

      return createdUser;
    });
  }

  async generateCreditionalsNoteLink(login: string, password: string) {
    const response = await this.httpService.axiosRef.post(
      this.configService.get<string>('SAFE_NOTE_API_HOST'),
      {
        note: `login: ${login}\npassword: ${password} `,
        lifetime: this.configService.get<string>('SAFE_NOTE_LIFETIME'),
        read_count: this.configService.get<string>('SAFE_NOTE_READ_COUNT'),
      },
    );

    return response.data.link;
  }

  async checkExistUserByLogin(login: string) {
    const existUser = await this.usersRepository.find({
      where: {
        login: login,
      },
    });

    return existUser.length > 0;
  }

  private static async generateLogin(firstName: string, lastName: string) {
    const cyrillicToTranslit = new CyrillicToTranslit();

    return cyrillicToTranslit.transform(`${firstName}.${lastName}`);
  }

  async deleteUser(id: number) {
    await this.connection.transaction(async (manager) => {
      await manager.delete<User>(User, id);
    });
  }

  async getAllUsers() {
    return await this.usersRepository.find({
      relations: ['roles', 'student'],
    });
  }

  async getAllUserDtos(pageOptionsDto: PageOptionsDto) {
    const skip =
      (Number(pageOptionsDto.page) - 1) * Number(pageOptionsDto.take);

    const [users, count] = await this.usersRepository.findAndCount({
      relations: ['roles', 'student'],
      order: {
        createdAt: pageOptionsDto.order,
      },
      take: pageOptionsDto.take,
      skip: isNaN(skip) ? undefined : skip,
    });

    const pageMetaDto = new PageMetaDto({ itemCount: count, pageOptionsDto });
    const usersDtos = this.mapper.mapArray(users, UserDto, User);

    return new PageDto(usersDtos, pageMetaDto);
  }

  async getUserByLogin(login: string) {
    const user = await this.usersRepository.findOne({
      where: {
        login: login,
      },
      relations: ['roles'],
    });
    if (!user) {
      throw new HttpException(
        'Пользователь с данным логином не найден!',
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async getUserById(id: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id: id,
      },
      relations: ['roles', 'student'],
    });
    if (!user) {
      throw new HttpException('Пользователь не найден!', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async getUserDtoById(id: number) {
    const user = await this.getUserById(id);
    const userDto = this.mapper.map(user, UserDto, User);

    return userDto;
  }

  async changePassword(dto: ChangePasswordDto, userId: any) {
    const user = await this.getUserById(userId);

    const passwordEquals = await bcrypt.compare(dto.oldPassword, user.password);

    if (passwordEquals) {
      user.password = await bcrypt.hash(dto.newPassword, 5);
      await this.usersRepository.save(user);
      return 'ok';
    } else {
      throw new HttpException('Не правильный пароль!', HttpStatus.BAD_REQUEST);
    }
  }

  async getUserIdFromHeader(headers: any) {
    const jwtToken = headers['authorization'].split(' ')[1];
    const userJwtInfo = this.jwtService.decode(jwtToken);
    return userJwtInfo['id'];
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    await this.usersRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const user = await this.getUserById(id);
        user.firstName = dto.firstName;
        user.middleName = dto.middleName;
        user.lastName = dto.lastName;
        user.birthDate = moment(dto.birthDate).toDate();
        user.phone = dto.phone;
        user.email = dto.email;

        if (user.roles.some((role) => role.name == RolesEnum.Student)) {
          const student = await this.studentsService.getStudentByUserId(id);
          await this.studentsService.updateStudent(
            {
              parentEmail: dto.parentEmail,
              parentLastName: dto.parentLastName,
              parentMiddleName: dto.parentMiddleName,
              parentName: dto.parentName,
              parentPhone: dto.parentPhone,
            },
            student.id,
          );
        }

        await transactionalEntityManager.save<User>(user);
      },
    );
  }
}
