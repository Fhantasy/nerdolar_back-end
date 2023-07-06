import { Request, Response } from "express";
import { userService } from "../services/userService";

export const UserController = {
  //POST /register
  create: async (req: Request, res: Response) => {
    const { nickname, email, password } = req.body;
    try {
      const user = await userService.create({
        nickname: nickname,
        email: email,
        password: password,
        role: "user",
        name: nickname,
      });
      return res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return error;
    }
  },
};
