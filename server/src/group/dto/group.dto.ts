import { StudentDto } from '../../students/dto/students.dto';

export class GroupDto {
  id: number | string;
  name: string;
  desc: string;
  teacher: {
    id: number | string;
    firstName: string;
    middleName: string;
    lastName: string;
    userId: number | string;
  };
  students: StudentDto[];
}
