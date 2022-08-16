"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
class UsersService {
    get(id, firstName, lastName, email, phoneNumber) {
        return {
            id,
            firstName: firstName ?? "Putin",
            lastName: lastName ?? "Huilo",
            email: email ?? "LOH_UA@mail.com",
            phoneNumber: phoneNumber ?? "103",
        };
    }
}
exports.UsersService = UsersService;
// export interface User {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phoneNumber: string;
// }
//# sourceMappingURL=usersService.js.map