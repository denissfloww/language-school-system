import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { User } from '../models/user.entity';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { Role } from '../models/role.entity';
import * as bcrypt from 'bcryptjs';
import { RolesEnum } from '../auth/roles.enum';
import { StudentsService } from '../students/students.service';
import { CreateStudentDto } from '../students/dto/create-student.dto';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import { CreatedUserDto } from './dto/created-user-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
    private studentsService: StudentsService,
    @InjectConnection() private connection: Connection,
  ) {}

  async createUser(dto: CreateUserDto) {
    const cyrillicToTranslit = new CyrillicToTranslit();
    const login = cyrillicToTranslit.transform(
      `${dto.lastName[0]}.${dto.firstName}`,
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
    const user = await this.usersRepository.save({
      ...dto,
      login: login,
      password: hashPassword,
    });

    if (dto.role == RolesEnum.Student) {
      const studentDto: CreateStudentDto = {
        userId: parseInt(user.id),
      };
      await this.studentsService.createStudent(studentDto);
    }

    const createdUser: CreatedUserDto = {
      id: user.id,
      login: user.login,
      firstName: user.firstName,
      lastName: user.lastName,
      middleName: user.middleName,
      password: randomPassword,
      role: user.role,
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
    const user = await this.usersRepository.findOne({ login: login });
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
}
