export interface CreateUserDto {
  login: string;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}
export interface LoginDto {
  login :string;
  password: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}