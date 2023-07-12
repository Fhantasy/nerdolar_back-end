import { Request, Response } from "express";
import { userService } from "../services/userService";
import { AuthorizatedRequest } from "../middlewares/auth";
import { getPaginationParams } from "../helpers/getPaginationParams";

export const UserController = {
  //GET /users/:nickname
  show: async (req: Request, res: Response) => {
    const { nickname } = req.params;
    try {
      const user = await userService.show(nickname);
      return res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return error;
    }
  },

  //GET /users/search
  search: async (req: Request, res: Response) => {
    const { name } = req.body;
    const [page, perPage] = getPaginationParams(req.query);
    try {
      const user = await userService.search(name, page, perPage);
      return res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return error;
    }
  },

  //GET /users/current
  currentUserData: (req: AuthorizatedRequest, res: Response) => {
    const user = req.user;
    try {
      return res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return error;
    }
  },

  //PUT /users/current/profile
  profileUpdate: async (req: AuthorizatedRequest, res: Response) => {
    const user = req.user!;
    const { name, bio, birth, locale, profileImg, profileBannerImg } = req.body;

    try {
      await userService.profileUpdate(user.id, {
        name,
        bio,
        locale,
        birth,
        profileImg,
        profileBannerImg,
      });
      res.status(200).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return error;
    }
  },

  //PUT /users/current/account
  accountDataUpdate: async (req: AuthorizatedRequest, res: Response) => {
    const user = req.user!;
    const { nickname, email } = req.body;

    try {
      await userService.accountDataUpdate(user.id, {
        nickname,
        email,
      });
      res.status(200).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return error;
    }
  },

  //PUT /users/current/password
  passwordUpdate: async (req: AuthorizatedRequest, res: Response) => {
    const user = req.user!;
    const { currentPassword, newPassword } = req.body;

    user.checkPassword(currentPassword, async (error, isSame) => {
      try {
        if (error) throw error;
        if (!isSame) throw new Error("Senha atual incorreta!");

        await userService.passwordUpdate(user.id, newPassword);
        return res.status(204).send();
      } catch (error) {
        if (error instanceof Error) {
          return res.status(400).json({ message: error.message });
        }
        return error;
      }
    });
  },

  //DELETE /users/current
  delete: async (req: AuthorizatedRequest, res: Response) => {
    const user = req.user!;

    try {
      await userService.delete(user.id);

      res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return error;
    }
  },
};
