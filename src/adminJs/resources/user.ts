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
    "profileImg",
    "profileBannerImg",
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
    "profileImg",
    "profileBannerImg",
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
      key: "profileImage",
      file: "profileImg",
      filePath: "profileImgPath",
      filesToDelete: "profileImageToDelete",
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
      key: "profileBannerImage",
      file: "profileBannerImg",
      filePath: "profileBannerImgPath",
      filesToDelete: "profileBannerImageToDelete",
    },
    uploadPath: (record, filename) => `users/${record.get("id")}/${filename}`,
  }),
];
