import { Request, Response } from "express";
import { Category } from "../models/Category";

export const CategoryController = {
  //GET /categories
  all: async (req: Request, res: Response) => {
    try {
      const categories = await Category.findAll();
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
