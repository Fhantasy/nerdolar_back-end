import { Op } from "sequelize";
import { Category, Genre, MediaProduct } from "../models";
import { WatchItem } from "../models/WatchItem";

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

  getOne: async (id: number, userId: number) => {
    const mediaProduct = await MediaProduct.findByPk(id, {
      include: [
        {
          model: WatchItem,
          as: "watchItens",
          attributes: ["id"],
          where: {
            user_id: userId,
          },
          required: false,
        },
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
        {
          model: Genre,
          as: "genres",
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });

    return mediaProduct;
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
      where: { status: "ongoing" },
    });

    mediasOngoing.forEach(async (mediaProduct) => {
      mediaProduct.releaseDates.forEach(async (date, index) => {
        if (date < new Date()) {
          const datesUpdated = [...mediaProduct.releaseDates];

          datesUpdated.splice(index, index + 1);

          await mediaProduct.update({
            currentEpisode: mediaProduct.currentEpisode + 1,
            releaseDates: datesUpdated,
            status:
              mediaProduct.currentEpisode + 1 >= mediaProduct.totalEpisodes
                ? "complete"
                : "ongoing",
            endDate:
              mediaProduct.currentEpisode + 1 >= mediaProduct.totalEpisodes
                ? date
                : undefined,
          });
        }
      });
    });
    console.log("Media products updated!");
  },
};
