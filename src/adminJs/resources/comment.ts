import { ResourceOptions } from "adminjs";

export const commentResourceOptions: ResourceOptions = {
  navigation: "Administração",
  editProperties: ["message", "userId", "postId"],
  filterProperties: ["message", "userId", "postId", "createdAt", "updatedAt"],
  listProperties: ["message", "userId", "postId"],
  showProperties: [
    "id",
    "message",
    "userId",
    "postId",
    "createdAt",
    "updatedAt",
  ],
};
