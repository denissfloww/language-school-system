import { StudentDto } from '../../students/dto/students.dto';

export class GroupDto {
  id: number | string;
  name: string;
  description: string;
  teacher: {
    id: number | string;
    firstName: string;
    middleName: string;
    lastName: string;
    userId: number | string;
  };
  language: {
    id: number | string;
    name: string;
    description: string;
  };
  students: StudentDto[];
}
