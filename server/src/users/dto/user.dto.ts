export class UserDto {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  email?: string;
  birthDate: Date;
  phone?: string;
  student?: {
    parentName: string;
    parentMiddleName: string;
    parentLastName: string;
    parentEmail: string;
    parentPhone: string;
  };
}
