import uploadFileFeature from "@adminjs/upload";
import { FeatureType, ResourceOptions } from "adminjs";
import path from "path";

export const userResourceOptions: ResourceOptions = {
  navigation: "Administração",
  properties: {
    role: {
      availableValues: [
        { value: "admin", label: "Administrador" },
        { value: "user", label: "Usuário" },
      ],
    },
  },
  editProperties: [
    "nickname",
    "email",
    "password",
    "locale",
    "role",
    "name",
    "bio",
    "birth",
    "profileImage",
    "profileBannerImage",
  ],
  filterProperties: [
    "nickname",
    "email",
    "password",
    "locale",
    "role",
    "name",
    "bio",
    "birth",
    "createdAt",
    "updatedAt",
  ],
  listProperties: ["id", "nickname", "email", "role"],
  showProperties: [
    "id",
    "nickname",
    "email",
    "password",
    "locale",
    "role",
    "name",
    "bio",
    "birth",
    "createdAt",
    "updatedAt",
    "profileImage",
    "profileBannerImage",
  ],
};

export const userResourceFeatures: FeatureType[] = [
  uploadFileFeature({
    provider: {
      local: {
        opts: {},
        bucket: path.join(__dirname, "../../public"),
      },
    },
    properties: {
      key: "profileImg",
      file: "profileImage",
      filePath: "profileImgPath",
      filesToDelete: "profileImgToDelete",
    },
    uploadPath: (record, filename) => `users/${record.get("id")}/${filename}`,
  }),
  uploadFileFeature({
    provider: {
      local: {
        opts: {},
        bucket: path.join(__dirname, "../../public"),
      },
    },
    properties: {
      key: "profileBannerImg",
      file: "profileBannerImage",
      filePath: "profileBannerImgPath",
      filesToDelete: "profileBannerImgToDelete",
    },
    uploadPath: (record, filename) => `users/${record.get("id")}/${filename}`,
  }),
];
