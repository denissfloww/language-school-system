import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
    private studentsService: StudentsService,
    private teacherService: TeacherService,
    private jwtService: JwtService,
    @InjectConnection() private connection: Connection,
  ) {}

  async createUser(dto: CreateUserDto) {
    const cyrillicToTranslit = new CyrillicToTranslit();
    const login = cyrillicToTranslit.transform(
      `${dto.firstName}.${dto.lastName}`,
    );

    const existUser = await this.usersRepository.find({
      where: {
        login: login,
      },
    });
    if (existUser.length > 0) {
      throw new HttpException(
        'Пользователь с такими данными уже существует!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const randomPassword = Math.random().toString(36).slice(-8);
    const hashPassword = await bcrypt.hash(randomPassword, 5);

    const roles: Role[] = [];
    for (const roleName of dto.roles) {
      const role = await this.rolesRepository.findOne({
        where: { name: roleName },
      });

      roles.push(role);
    }

    const user = await this.usersRepository.save({
      firstName: dto.firstName,
      lastName: dto.lastName,
      middleName: dto.middleName,
      login: login,
      password: hashPassword,
      roles: roles,
      phone: dto.phone,
      email: dto.email,
      birthDate: dto.birthDate,
    });

    if (dto.roles.includes(RolesEnum.Student)) {
      const studentDto: CreateStudentDto = {
        parentEmail: dto.parentEmail,
        parentLastName: dto.parentLastName,
        parentMiddleName: dto.parentMiddleName,
        parentName: dto.parentName,
        parentPhone: dto.parentPhone,
        userId: parseInt(user.id),
      };
      await this.studentsService.createStudent(studentDto);
    }

    if (dto.roles.includes(RolesEnum.Teacher)) {
      await this.teacherService.createTeacher(parseInt(user.id));
    }

    const createdUser: CreatedUserDto = {
      id: user.id,
      login: user.login,
      firstName: user.firstName,
      lastName: user.lastName,
      middleName: user.middleName,
      password: randomPassword,
      roles: dto.roles,
    };

    return createdUser;
  }

  async deleteUser(id: number) {
    await this.connection.transaction(async (manager) => {
      await manager.delete<User>(User, id);
    });
  }

  async getAllUsers() {
    const users = await this.usersRepository.find({ relations: ['roles'] });
    return users;
  }

  async getUserByLogin(login: string) {
    const user = await this.usersRepository.findOne(
      { login: login },
      { relations: ['roles'] },
    );
    if (!user) {
      throw new HttpException(
        'Пользователь с данным логином не найден!',
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async getUserById(id: number) {
    const user = await this.usersRepository.findOne(id, {
      relations: ['roles'],
    });
    if (!user) {
      throw new HttpException('Пользователь не найден!', HttpStatus.NOT_FOUND);
    }
    return user;
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

  async updateUser(dto: UpdateUserDto) {}
}
