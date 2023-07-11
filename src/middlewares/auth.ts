import { NextFunction, Request, Response } from "express";
import { UserInstance } from "../models/User";
import { jwtService } from "../services/jwtService";
import { userService } from "../services/userService";
import { JwtPayload } from "jsonwebtoken";

export interface AuthorizatedRequest extends Request {
  user?: UserInstance | null;
}

export function EnsureAuth(
  req: AuthorizatedRequest,
  res: Response,
  next: NextFunction
) {
  const authorizationToken = req.headers.authorization;

  if (!authorizationToken) {
    return res.status(401).json({ message: "Not Authorized: Token not found" });
  }

  const token = authorizationToken.replace(/Bearer /, "");

  jwtService.verifyToken(token, async (error, decoded) => {
    if (error || typeof decoded === "undefined") {
      return res.status(401).json({ message: "Not Authorized: Invalid token" });
    }

    const user = await userService.findByEmail((decoded as JwtPayload).email);
    req.user = user;
    next();
  });
}
