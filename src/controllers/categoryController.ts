import { Request, Response } from "express";
import { Category } from "../models/Category";

export const CategoryController = {
  //POST /categories
  create: async (req: Request, res: Response) => {
    const { name } = req.body;
    try {
      const category = await Category.create({ name });
      return res.status(201).json(category);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return error;
    }
  },
  //DELETE /categories/:id
  delete: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await Category.destroy({
        where: { id },
      });
      return res.status(201).json({ message: "Category deleted!" });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return error;
    }
  },
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
