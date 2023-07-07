import { ResourceOptions } from "adminjs";

export const postResourceOptions: ResourceOptions = {
  navigation: "Administração",
  editProperties: ["message", "userId", "mediaProductId"],
  filterProperties: [
    "message",
    "userId",
    "mediaProductId",
    "createdAt",
    "updatedAt",
  ],
  listProperties: ["message", "userId", "mediaProductId"],
  showProperties: [
    "id",
    "message",
    "userId",
    "mediaProductId",
    "createdAt",
    "updatedAt",
  ],
};
