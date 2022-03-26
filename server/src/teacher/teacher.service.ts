import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from '../models/teacher.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {}

  async createTeacher(userId: number) {
    await this.teacherRepository.save({
      userId: userId,
    });
  }

  async getTeachers() {
    return await this.teacherRepository.find();
  }
}
