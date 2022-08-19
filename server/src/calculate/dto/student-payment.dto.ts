export default interface StudentPaymentDto {
  payment: number;
  studentName: string;
  studentLastName: string;
  parentName: string;
  parentMiddleName?: string;
  parentLastName: string;
  parentEmail: string;
  parentPhone: string;
  studentId: number;
}
