import { Address } from "./address.model";

export class IUser {
  id?: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: Address[];
  isVerify: boolean;
  status: string;
  imageUrl?: string;
  roles: string[];

  constructor() {
    this.email = "";
    this.firstName = "";
    this.lastName = "";
    this.phone = "";
    this.address = [];
    this.isVerify = false;
    this.status = "";
    this.imageUrl = "";
    this.roles = [];
  }
}

export enum ERole {
  ADMIN = "Quản trị viên",
  USER = "Người dùng",
}

interface IRole {
  name: string;
  description: string;
  permission: Permission[];
}

interface Permission {
  name: string;
  description: string;
}

interface IUpdateUser {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  imageUrl: string;
  roles?: string[];
}

interface IChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export type { IUpdateUser, IChangePasswordRequest, IRole, Permission };
