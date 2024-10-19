import { User } from "./User";

export type UserGet = {
  userList: User[];
  totalElements: number;
  totalPages: number;
  isLast: boolean;
};
