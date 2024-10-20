import { Role } from "./Role";

export type User = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  status: string;
  imageUrl: string;
  roles: Role[];
};
