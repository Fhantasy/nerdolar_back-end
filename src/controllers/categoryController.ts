import { Request, Response } from "express";
import { Category } from "../models/Category";
import { AuthorizatedRequest } from "../middlewares/auth";
import { categoryService } from "../services/categoryService";

export const CategoryController = {
  //GET /categories/:userId
  getAllFromUserWatchList: async (req: AuthorizatedRequest, res: Response) => {
    const { userId } = req.params;

    try {
      const categories = await categoryService.getAllFromUserWatchList(
        Number(userId)
      );

      return res.status(200).json(categories);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return error;
    }
  },
  //GET /categories/:id
  show: async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const category = await Category.findByPk(id);
      return res.status(200).json(category);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return error;
    }
  },
};
