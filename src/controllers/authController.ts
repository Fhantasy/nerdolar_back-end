import { Request, Response } from "express";
import { userService } from "../services/userService";
import { jwtService } from "../services/jwtService";

export const AuthController = {
  //POST /register
  register: async (req: Request, res: Response) => {
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

  //POST /login
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const user = await userService.findByEmail(email);

      if (!user) {
        return res.status(401).json({ message: "Email not resgistred!" });
      }
      user.checkPassword(password, (err, isSame) => {
        if (err) return res.status(400).json({ message: err.message });
        if (!isSame)
          return res.status(401).json({ message: "Incorrect password!" });

        const payload = {
          id: user.id,
          nickname: user.nickname,
          email: user.email,
        };

        const token = jwtService.signToken(payload, "1d");

        res.status(200).json({ token: token });
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return error;
    }
  },
};
