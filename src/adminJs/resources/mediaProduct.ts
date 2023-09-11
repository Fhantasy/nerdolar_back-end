import uploadFileFeature from "@adminjs/upload";
import { FeatureType, ResourceOptions } from "adminjs";
import path from "path";

export const mediaProductResourceOptions: ResourceOptions = {
  navigation: "Produtos de Mídia",
  properties: {
    launchDate: {
      type: "date",
    },
    status: {
      availableValues: [
        { value: "ongoing", label: "Em Andamento" },
        { value: "complete", label: "Completo" },
      ],
    },
  },
  editProperties: [
    "title",
    "sinopsys",
    "status",
    "isEpisodic",
    "launchDate",
    "endDate",
    "totalEpisodes",
    "currentEpisode",
    "releaseDates",
    "thumbnailImage",
    "pageBannerImage",
    "categoryId",
  ],
  filterProperties: [
    "id",
    "title",
    "status",
    "isEpisodic",
    "launchDate",
    "endDate",
    "totalEpisodes",
    "currentEpisode",
    "releaseDates",
    "categoryId",
    "createdAt",
    "updatedAt",
  ],
  listProperties: [
    "title",
    "status",
    "isEpisodic",
    "launchDate",
    "endDate",
    "categoryId",
  ],
  showProperties: [
    "id",
    "title",
    "sinopsys",
    "status",
    "isEpisodic",
    "launchDate",
    "endDate",
    "totalEpisodes",
    "currentEpisode",
    "releaseDates",
    "thumbnailImage",
    "pageBannerImage",
    "categoryId",
    "createdAt",
    "updatedAt",
  ],
};

export const mediaProductsResourceFeatures: FeatureType[] = [
  uploadFileFeature({
    provider: {
      local: {
        opts: {},
        bucket: path.join(__dirname, "../../../public"),
      },
    },
    properties: {
      key: "thumbnailImg",
      file: "thumbnailImage",
      filePath: "thumbnailImgPath",
      filesToDelete: "thumbnailImgToDelete",
    },
    uploadPath: (record, filename) => {
      return `media-products/${record.get("id")}/${filename}`;
    },
  }),
  uploadFileFeature({
    provider: {
      local: {
        opts: {},
        bucket: path.join(__dirname, "../../../public"),
      },
    },
    properties: {
      key: "pageBannerImg",
      file: "pageBannerImage",
      filePath: "pageBannerImgPath",
      filesToDelete: "pageBannerImgToDelete",
    },
    uploadPath: (record, filename) => {
      return `media-products/${record.get("id")}/${filename}`;
    },
  }),
];
