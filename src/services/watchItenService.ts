import { Category, MediaProduct } from "../models";
import { WatchIten, WatchItenCreationsAttributes } from "../models/WatchIten";

export const watchItenService = {
  create: async (params: WatchItenCreationsAttributes) => {
    await WatchIten.create(params);
  },

  delete: async (userId: number, watchItenid: number) => {
    await WatchIten.destroy({
      where: {
        userId,
        id: watchItenid,
      },
    });
  },

  update: async (
    attributes: { status?: string; currentEpisode?: number },
    watchItenId: number,
    userId: number
  ) => {
    await WatchIten.update(attributes, { where: { userId, id: watchItenId } });
  },

  getOne: async (userId: number, watchItenId: number) => {
    const watchIten = await WatchIten.findOne({
      attributes: [
        "id",
        "status",
        ["current_episode", "currentEpisode"],
        ["created_at", "createdAt"],
      ],
      where: {
        userId,
        id: watchItenId,
      },
      include: [
        {
          model: MediaProduct,
          as: "mediaProduct",
          attributes: [
            "id",
            "title",
            ["thumbnail_img", "thumbnailImg"],
            ["category_id", "categoryId"],
          ],
          include: [
            {
              model: Category,
              as: "category",
              attributes: ["name"],
            },
          ],
        },
      ],
    });

    return watchIten;
  },

  getAllFromUser: async (userId: number, page: number, perPage: number) => {
    const offset = (page - 1) * perPage;

    const { count, rows } = await WatchIten.findAndCountAll({
      where: {
        userId,
      },
      attributes: ["id", "status", ["current_episode", "currentEpisode"]],
      include: {
        model: MediaProduct,
        as: "mediaProduct",
        attributes: [
          "id",
          "title",
          ["thumbnail_img", "thumbnailImg"],
          ["category_id", "categoryId"],
        ],
        include: [{ model: Category, as: "category", attributes: ["name"] }],
      },
      limit: perPage,
      offset,
      distinct: true,
    });

    return {
      watchItens: rows,
      page,
      perPage,
      total: count,
    };
  },
};
