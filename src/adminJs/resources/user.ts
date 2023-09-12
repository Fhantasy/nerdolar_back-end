import uploadFileFeature, { BaseProvider } from "@adminjs/upload";
import { FeatureType, ResourceOptions, UploadedFile } from "adminjs";
import fs, { existsSync } from "fs";
import { move } from "fs-extra";
import path from "path";

export const userResourceOptions: ResourceOptions = {
  navigation: "Administração",
  properties: {
    birth: {
      type: "date",
    },
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

class UploadProvider extends BaseProvider {
  constructor() {
    super(path.join(__dirname, "../../../"));
    if (!existsSync(path.join(__dirname, "../../../"))) {
      throw new Error(
        `directory: "${path.join(
          __dirname,
          "../../../"
        )}" does not exists. Create it before running LocalAdapter`
      );
    }
  }

  // * Fixed this method because original does rename instead of move and it doesn't work with docker volume
  public async upload(file: UploadedFile, key: string): Promise<any> {
    const filePath =
      process.platform === "win32" ? this.path(key) : this.path(key).slice(1); // adjusting file path according to OS
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
    await move(file.path, filePath, { overwrite: true });
  }

  public async delete(key: string, bucket: string): Promise<any> {
    await fs.promises.unlink(
      process.platform === "win32"
        ? this.path(key, bucket)
        : this.path(key, bucket).slice(1)
    ); // adjusting file path according to OS
  }

  // eslint-disable-next-line class-methods-use-this
  public path(key: string, bucket?: string): string {
    // Windows doesn't requires the '/' in path, while UNIX system does
    return process.platform === "win32"
      ? `${path.join(bucket || this.bucket, key)}`
      : `/${path.join(bucket || this.bucket, key)}`;
  }
}

export const userResourceFeatures: FeatureType[] = [
  uploadFileFeature({
    provider: new UploadProvider(),
    properties: {
      key: "profileImg",
      file: "profileImage",
      filePath: "profileImgPath",
      filesToDelete: "profileImgToDelete",
    },
    uploadPath: (record, filename) =>
      `public/users/${record.get("id")}/${filename}`,
  }),
  uploadFileFeature({
    provider: {
      local: {
        opts: {},
        bucket: path.join(__dirname, "../../.."),
      },
    },
    properties: {
      key: "profileBannerImg",
      file: "profileBannerImage",
      filePath: "profileBannerImgPath",
      filesToDelete: "profileBannerImgToDelete",
    },
    uploadPath: (record, filename) =>
      `public/users/${record.get("id")}/${filename}`,
  }),
];
