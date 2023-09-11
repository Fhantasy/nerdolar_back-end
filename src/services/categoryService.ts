import { Category } from "../models";
import { WatchItem } from "../models/WatchItem";

export const categoryService = {
  getAllFromUserWatchList: async (userId: number) => {
    const categories = await Category.findAll({
      where: { "$watchItens.user_id$": userId },
      attributes: ["id", "name"],
      include: [
        {
          model: WatchItem,
          as: "watchItens",
          attributes: [],
        },
      ],
    });

    return categories;
  },
};
