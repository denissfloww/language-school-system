export interface JwtPayload {
  id: number | string;
  login: string;
  firstName: string;
  lastName: string;
  roles: { name: string; desc: string }[];
}
