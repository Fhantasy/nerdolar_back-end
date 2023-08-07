import { Op } from "sequelize";
import { Category, Genre, MediaProduct } from "../models";

export const mediaProductService = {
  all: async (page: number, perPage: number) => {
    const offset = (page - 1) * perPage;

    const { count, rows } = await MediaProduct.findAndCountAll({
      include: {
        model: Category,
        as: "category",
        attributes: ["name"],
      },
      offset: offset,
      limit: perPage,
      distinct: true,
    });

    return {
      mediaProducts: rows,
      page,
      perPage,
      total: count,
    };
  },

  findByTitle: async (title: string, page: number, perPage: number) => {
    const offset = (page - 1) * perPage;

    const { count, rows } = await MediaProduct.findAndCountAll({
      where: {
        title: {
          [Op.iLike]: `%${title}%`,
        },
      },
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["name"],
        },
        {
          model: Genre,
          as: "genres",
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
      offset: offset,
      limit: perPage,
      distinct: true,
    });

    return {
      mediaProducts: rows,
      page,
      perPage,
      total: count,
    };
  },

  updateStatus: async () => {
    const mediasOngoing = await MediaProduct.findAll({
      where: { status: "Em andamento" },
    });

    mediasOngoing.forEach;
  },
};
