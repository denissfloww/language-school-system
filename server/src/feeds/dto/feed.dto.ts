export class FeedDto {
  createdAt: Date;
  id: number;
  name: string;
  description: string;
  data: string;
  createdUser: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
}
