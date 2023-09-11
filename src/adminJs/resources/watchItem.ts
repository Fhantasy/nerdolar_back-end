import { ResourceOptions } from "adminjs";

export const watchItemResourceOptions: ResourceOptions = {
  navigation: "Administração",
  editProperties: [
    "status",
    "currentEpisode",
    "userId",
    "mediaProductId",
    "categoryId",
  ],
  filterProperties: [
    "status",
    "currentEpisode",
    "userId",
    "mediaProductId",
    "categoryId",
    "createdAt",
    "updatedAt",
  ],
  listProperties: ["status", "currentEpisode", "userId", "mediaProductId"],
  showProperties: [
    "id",
    "status",
    "currentEpisode",
    "userId",
    "mediaProductId",
    "createdAt",
    "updatedAt",
  ],
};
