import uploadFileFeature, { BaseProvider } from "@adminjs/upload";
import { FeatureType, ResourceOptions, UploadedFile } from "adminjs";
import fs, { existsSync } from "fs";
import { move } from "fs-extra";
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

class UploadProvider extends BaseProvider {
  constructor() {
    super(path.join(__dirname, "../../../public"));
    if (!existsSync(path.join(__dirname, "../../../public"))) {
      throw new Error(
        `directory: "${path.join(
          __dirname,
          "../../../public"
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

export const mediaProductsResourceFeatures: FeatureType[] = [
  uploadFileFeature({
    provider: new UploadProvider(),
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
