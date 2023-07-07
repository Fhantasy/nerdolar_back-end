import { ResourceOptions } from "adminjs";

export const categoryResourceOptions: ResourceOptions = {
  navigation: "Produtos de Mídia",
  editProperties: ["name"],
  filterProperties: ["name", "createdAt", "updatedAt"],
  listProperties: ["name"],
  showProperties: ["id", "name", "createdAt", "updatedAt"],
};
