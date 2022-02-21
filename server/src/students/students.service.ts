import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../models/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
  ) {}

  async createStudent(dto: CreateStudentDto) {
    await this.studentsRepository.save({
      userId: dto.userId,
    });
  }
}
