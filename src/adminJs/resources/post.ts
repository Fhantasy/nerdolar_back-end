import { ResourceOptions } from "adminjs";

export const postResourceOptions: ResourceOptions = {
  navigation: "Administração",
  editProperties: ["message", "userId", "mediaProductId", "imageUrls"],
  filterProperties: [
    "message",
    "userId",
    "mediaProductId",
    "createdAt",
    "updatedAt",
  ],
  listProperties: ["message", "userId", "imageUrls", "mediaProductId"],
  showProperties: [
    "id",
    "message",
    "imageUrls",
    "userId",
    "mediaProductId",
    "createdAt",
    "updatedAt",
  ],
};
