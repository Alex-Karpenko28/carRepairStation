import { User } from "./user.dto";


export class UsersService {
  public get(id: number, firstName?: string, lastName?: string, email?: string, phoneNumber?:string): User {
    return {
      id,
      firstName: firstName ?? "Putin",
      lastName: lastName ?? "Huilo",
      email: email ?? "LOH_UA@mail.com",
      phoneNumber: phoneNumber ?? "103",
    };
  }
}

// export interface User {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phoneNumber: string;
// }