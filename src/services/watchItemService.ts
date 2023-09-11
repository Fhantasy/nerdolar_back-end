import { Category, MediaProduct } from "../models";
import { WatchItem, WatchItemCreationsAttributes } from "../models/WatchItem";

export const watchItemService = {
  create: async (params: WatchItemCreationsAttributes) => {
    const watchItem = await WatchItem.create(params);
    return watchItem;
  },

  delete: async (userId: number, watchItenid: number) => {
    await WatchItem.destroy({
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
    await WatchItem.update(attributes, { where: { userId, id: watchItenId } });
  },

  getOne: async (userId: number, watchItenId: number) => {
    const watchIten = await WatchItem.findOne({
      attributes: ["id", "status", ["current_episode", "currentEpisode"]],
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
            "status",
            ["page_banner_img", "pageBannerImg"],
            ["current_episode", "currentEpisode"],
            ["total_episodes", "totalEpisodes"],
          ],
        },
      ],
    });

    return watchIten;
  },

  getReleasesPerCategory: async (userId: number) => {
    const watchItens = await WatchItem.findAll({
      where: { userId, status: "ongoing", "$mediaProduct.status$": "ongoing" },
      attributes: ["id", "status", ["current_episode", "currentEpisode"]],
      include: [
        {
          model: MediaProduct,
          as: "mediaProduct",
          attributes: [
            "id",
            "title",
            "status",
            ["current_episode", "currentEpisode"],
            ["release_dates", "releaseDates"],
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
      order: [["mediaProduct", "releaseDates", "ASC"]],
    });

    const watchItensPerCategory = watchItens.reduce(
      (acumulateValue: any, wacthIten) => {
        if (acumulateValue[wacthIten.mediaProduct!.category.name]) {
          acumulateValue[wacthIten.mediaProduct!.category.name].push(wacthIten);
        } else {
          acumulateValue[wacthIten.mediaProduct!.category.name] = [wacthIten];
        }
        return acumulateValue;
      },
      {}
    );

    return watchItensPerCategory;
  },

  getAllPerCategory: async (
    userId: number,
    categoryId: number,
    status: "ongoing" | "complete",
    page: number,
    perPage: number
  ) => {
    const offset = (page - 1) * perPage;

    const { rows, count } = await WatchItem.findAndCountAll({
      where: { userId, status, categoryId },
      attributes: ["id", "status", ["current_episode", "currentEpisode"]],
      include: [
        {
          model: MediaProduct,
          as: "mediaProduct",
          attributes: [
            "id",
            "title",
            "status",
            ["is_episodic", "isEpisodic"],
            ["thumbnail_img", "thumbnailImg"],
            ["current_episode", "currentEpisode"],
            ["total_episodes", "totalEpisodes"],
          ],
        },
      ],
      order: [["currentEpisode", "ASC"]],
      limit: perPage,
      distinct: true,
      offset,
    });
    return {
      watchItens: rows,
      page,
      perPage,
      total: count,
    };
  },
};
