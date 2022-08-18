export interface CreateUserDto {
  login: string;
  password: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}
export interface LoginDto {
  login: string;
  password: string;
}

export interface Token {
  accessToken: string;
}

export interface UserDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}



export interface JWTPayload {
  id: number;
  login: string;
  role: string;
}

export enum UserRole {
  ADMIN = "admin",
  WORKER = "worker",
  CLIENT = "client",
}

