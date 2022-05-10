import { StudentDto } from '../../students/dto/students.dto';

export class GroupDto {
  id: number | string;
  name: string;
  description: string;
  priceNextMonth?: number;
  month: string;
  teacher: {
    id: number | string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    phone?: string;
    userId?: number | string;
  };
  language: {
    id: number | string;
    name: string;
    description: string;
  };
  cost: {
    id: number | string;
    name: string;
    description: string;
    lessonPrice: number;
  };
  students: StudentDto[];
}
