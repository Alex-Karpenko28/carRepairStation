import type { ExtendedRequest} from './shared/extendedRequest'
import * as jwt from "jsonwebtoken";
import { JWTPayload } from "./user/userDto";
import "dotenv/config";

const verifyJWT = async (token: string): Promise<JWTPayload> =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data as JWTPayload);
    });
  });

export async function expressAuthentication(
  request: ExtendedRequest,
  securityName: string,
  roles?: string[] // admin worker client
): Promise<any> {
  if (securityName !== "barearAuth") return undefined;
  const authorization = request.headers.authorization;
  if (!authorization) {
    throw new Error("Not Authorized");
  }
  const payload: JWTPayload = await verifyJWT(authorization);
  const role = payload.role;

  if (!roles.includes(role)) {
    throw new Error("Forbidden! User is not authorized");
  }

  request.context = { userId: payload.id }

}
