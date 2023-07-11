import jwt, { VerifyCallback } from "jsonwebtoken";
import { JWT_KEY } from "../config/enviroment";

export const jwtService = {
  signToken: (payload: string | object | Buffer, expiration: string) => {
    return jwt.sign(payload, JWT_KEY, {
      expiresIn: expiration,
    });
  },

  verifyToken: (token: string, callbackfn: VerifyCallback) => {
    jwt.verify(token, JWT_KEY, callbackfn);
  },
};
