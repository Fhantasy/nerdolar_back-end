import { NextFunction, Request, Response } from "express";
import { userService } from "../services/userService";
import { AuthorizatedRequest } from "../middlewares/auth";
import { getPaginationParams } from "../helpers/getPaginationParams";
import { upload } from "../services/upload";
import fs from "fs";

const uploadProfileImages = upload("users").fields([
  { name: "profileImg", maxCount: 1 },
  { name: "profileBannerImg", maxCount: 1 },
]);

export async function uploadProfileImagesMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  uploadProfileImages(req, res, (error) => {
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    next();
  });
}

export const UserController = {
  //GET /users/:nickname
  show: async (req: AuthorizatedRequest, res: Response) => {
    const currentUser = req.user!;
    const { nickname } = req.params;

    try {
      const user = await userService.show(nickname, currentUser.id);

      if (!user) throw new Error("User not found!");

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
    const { name } = req.query;
    const [page, perPage] = getPaginationParams(req.query);
    try {
      if (typeof name !== "string") {
        throw new Error("Query title must be of type string");
      }
      const user = await userService.findByNameOrNickname(name, page, perPage);
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
        return res.status(401).json({ message: error.message });
      }
      return error;
    }
  },

  //PUT /users/current/profile
  profileUpdate: async (req: AuthorizatedRequest, res: Response) => {
    const user = req.user!;
    const { name, bio, birth, locale } = req.body;
    const images = req.files as { [fieldname: string]: Express.Multer.File[] };
    const profileImg = images.profileImg?.[0].path;
    const profileBannerImg = images.profileBannerImg?.[0].path;

    let params: {
      name: string;
      bio: string;
      locale: string;
      birth?: Date;
      profileImg?: string;
      profileBannerImg?: string;
    } = { name, bio, locale };

    if (profileImg) {
      params.profileImg = profileImg;
    }
    if (profileBannerImg) {
      params.profileBannerImg = profileBannerImg;
    }
    if (birth) {
      params.birth = birth;
    }

    try {
      await userService.profileUpdate(user, params);
      res.status(204).send();
    } catch (error) {
      if (profileImg) {
        fs.unlink(profileImg, () => {});
      }
      if (profileBannerImg) {
        fs.unlink(profileBannerImg, () => {});
      }
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
      res.status(204).send();
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
