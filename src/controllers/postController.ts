import { Request, Response } from "express";
import { AuthorizatedRequest } from "../middlewares/auth";
import { postService } from "../services/postService";
import { getPaginationParams } from "../helpers/getPaginationParams";

export const PostController = {
  //POST /posts
  create: async (req: AuthorizatedRequest, res: Response) => {
    const user = req.user!;
    const { message, mediaProductId, urlImgs } = req.body;
    try {
      await postService.create(
        {
          message,
          userId: user.id,
          mediaProductId,
        },
        urlImgs
      );

      res.status(200).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return error;
    }
  },

  //GET /posts/:id
  show: async (req: AuthorizatedRequest, res: Response) => {
    const { id } = req.params;
    try {
      const post = await postService.getOne(Number(id));

      if (!post) res.status(404).json({ message: "Post not found" });
      res.status(200).json(post);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return error;
    }
  },

  //GET /posts/user/:id
  allFromUser: async (req: AuthorizatedRequest, res: Response) => {
    const { id } = req.params;
    const [page, perPage] = getPaginationParams(req.query);
    try {
      const posts = await postService.getAllFromUser(Number(id), page, perPage);

      res.status(200).json(posts);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return error;
    }
  },

  //GET /posts/search
  search: async (req: Request, res: Response) => {
    const { term } = req.body;
    const [page, perPage] = getPaginationParams(req.query);
    try {
      const posts = await postService.search(term, page, perPage);

      res.status(200).json(posts);
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
    try {
      const posts = await postService.feed(user.id);

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
