import uploadFileFeature from "@adminjs/upload";
import { FeatureType, ResourceOptions } from "adminjs";
import path from "path";

export const postImageResourceOptions: ResourceOptions = {
  navigation: "Administração",
  editProperties: ["imgUrl", "postId"],
  filterProperties: ["id", "imgUrl", "postId", "createdAt", "updatedAt"],
  listProperties: ["id", "imgUrl", "postId"],
  showProperties: ["id", "imgUrl", "postId", "createdAt", "updatedAt"],
};
