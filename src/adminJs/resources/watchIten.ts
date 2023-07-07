import { ResourceOptions } from "adminjs";

export const watchItenResourceOptions: ResourceOptions = {
  navigation: "Administração",
  editProperties: ["status", "currentEpisode", "userId", "mediaProductId"],
  filterProperties: [
    "status",
    "currentEpisode",
    "userId",
    "mediaProductId",
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
