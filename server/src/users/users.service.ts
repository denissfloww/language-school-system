import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { Role } from '../models/role.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async createUser(dto: CreateUserDto) {
    const existUser = await this.usersRepository.find({
      where: {
        login: dto.login,
        full_name: dto.full_name,
      },
    });
    if (existUser.length > 0) {
      throw new HttpException(
        'Пользователь с такими данными уже существует!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.usersRepository.save({
      ...dto,
      password: hashPassword,
    });
    return user;
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
