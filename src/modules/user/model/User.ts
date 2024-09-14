import { Role } from "./Role";

export type User = {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string | null;
  imageUrl: string;
  roles: Role[];
};