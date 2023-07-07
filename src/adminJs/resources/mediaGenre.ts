import { ResourceOptions } from "adminjs";

export const mediaGenreResourceOptions: ResourceOptions = {
  navigation: "Produtos de Mídia",
  editProperties: ["mediaProductId", "genreId"],
  filterProperties: ["mediaProductId", "genreId", "createdAt", "updatedAt"],
  listProperties: ["mediaProductId", "genreId"],
  showProperties: ["id", "mediaProductId", "genreId", "createdAt", "updatedAt"],
};
