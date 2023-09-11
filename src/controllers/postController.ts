import { NextFunction, Request, Response } from "express";
import { AuthorizatedRequest } from "../middlewares/auth";
import { postService } from "../services/postService";
import { getPaginationParams } from "../helpers/getPaginationParams";
import fs from "fs";
import { upload } from "../services/upload";

const uploadPostImage = upload("post-images").array("images");

export async function uploadPostImageMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  uploadPostImage(req, res, (error) => {
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    next();
  });
}

export const PostController = {
  //POST /posts
  create: async (req: AuthorizatedRequest, res: Response) => {
    const user = req.user!;
    const { message, mediaProductId } = req.body;
    const images = req.files as Express.Multer.File[];

    try {
      await postService.create(
        {
          message,
          userId: user.id,
          mediaProductId,
        },
        images ? images : undefined
      );

      res.status(201).send();
    } catch (error) {
      if (images) {
        images.forEach((image) => {
          fs.unlink(image.path, () => {});
        });
      }
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return error;
    }
  },

  //GET /posts/:id
  show: async (req: AuthorizatedRequest, res: Response) => {
    const user = req.user!;
    const { id } = req.params;
    try {
      const post = await postService.getOne(Number(id), user.id);

      if (!post) return res.status(404).json({ message: "Post not found" });
      return res.status(200).json(post);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return error;
    }
  },

  //GET /posts/user/:id
  allFromUser: async (req: AuthorizatedRequest, res: Response) => {
    const user = req.user!;
    const { id } = req.params;
    const [page, perPage] = getPaginationParams(req.query);
    try {
      const posts = await postService.getAllFromUser(
        Number(id),
        user.id,
        page,
        perPage
      );

      console.log(posts);
      res.status(200).json(posts);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return error;
    }
  },

  //GET /posts/media-product/:id
  allFromMedia: async (req: AuthorizatedRequest, res: Response) => {
    const user = req.user!;
    const { id } = req.params;
    const [page, perPage] = getPaginationParams(req.query);
    try {
      const posts = await postService.getAllFromMedia(
        user.id,
        Number(id),
        page,
        perPage
      );

      res.status(200).json(posts);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return error;
    }
  },

  //GET /posts/search
  search: async (req: AuthorizatedRequest, res: Response) => {
    const user = req.user!;
    const { name } = req.query;
    const [page, perPage] = getPaginationParams(req.query);
    try {
      if (typeof name === "string") {
        const posts = await postService.findByMessage(
          name,
          user.id,
          page,
          perPage
        );

        res.status(200).json(posts);
      }
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return error;
    }
  },

  //GET /feed
  feed: async (req: AuthorizatedRequest, res: Response) => {
    const user = req.user!;
    const [page, perPage] = getPaginationParams(req.query);
    try {
      const posts = await postService.feed(user.id, page, perPage);

      res.status(200).json(posts);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return error;
    }
  },

  //DELETE /posts/:id
  delete: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await postService.delete(Number(id));

      res.status(200).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return error;
    }
  },
};
