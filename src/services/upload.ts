import fs from "fs";
import multer from "multer";
import { AuthorizatedRequest } from "../middlewares/auth";

export function upload(folder: string) {
  return multer({
    storage: multer.diskStorage({
      destination: (req: AuthorizatedRequest, file, cb) => {
        const path = `public/${folder}/${req.user?.id}`;
        fs.mkdirSync(path, { recursive: true });
        cb(null, path);
      },
      filename: (req, file, cb) => {
        cb(
          null,
          new Date().toISOString().replace(/:/g, "-") + file.originalname
        );
      },
    }),
    limits: { fileSize: 20971520 },
    fileFilter(req, file, cb) {
      if (
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png"
      ) {
        cb(null, true);
      } else {
        cb(new Error("Error: Unacceptable file format"));
      }
    },
  });
}
