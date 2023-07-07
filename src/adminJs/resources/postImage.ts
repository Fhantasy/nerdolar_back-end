import { ResourceOptions } from "adminjs";

export const postImageResourceOptions: ResourceOptions = {
  navigation: "Administração",
  editProperties: ["imageUrl"],
  filterProperties: ["imageUrl", "postId", "createdAt", "updatedAt"],
  listProperties: ["imageUrl", "postId"],
  showProperties: ["id", "imageUrl", "postId", "createdAt", "updatedAt"],
};
