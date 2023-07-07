import { ResourceOptions } from "adminjs";

export const likeResourceOptions: ResourceOptions = {
  navigation: "Administração",
  editProperties: ["userId", "postId"],
  filterProperties: ["userId", "postId", "createdAt", "updatedAt"],
  listProperties: ["userId", "postId"],
  showProperties: ["id", "userId", "postId", "createdAt", "updatedAt"],
};
