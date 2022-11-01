import fs from "fs";
import path from "path";
const multer = require("multer");

export const uploader = (dir, fileNamePrefix) => {
  try {
    // lokasi penyimpanan
    let defaultDir = "public";

    // disk storage : menyimpan file dr FE ke direktori BE
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        const pathDir = defaultDir + dir;
        if (fs.existsSync(pathDir)) {
          cb(null, pathDir);
        } else {
          fs.mkdir(pathDir, { recursive: true }, (err) => cb(err, pathDir));
        }
      },

      filename: (req, file, cb) => {
        cb(
          null,
          fileNamePrefix + "-" + Date.now() + path.extname(file.originalname)
        );
      },
    });

    return multer({
      storage,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};
