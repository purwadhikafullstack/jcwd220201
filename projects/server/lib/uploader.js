const multer = require("multer");
const path = require("path");

const upload = ({
  filePrefix = "FILE",
  fileName = Date.now(),
  acceptedFileTypes = [],
  maxSize,
}) => {
  const filePath = path.join(__dirname, ".././public");
  const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      try {
        cb(null, filePath);
      } catch (err) {
        return err;
      }
    },
    filename: (req, file, cb) => {
      const { originalName } = file;
      fileName = originalName + Date.now();
      const filepict = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, `${filePrefix}-${filepict}.${file.mimetype.split("/")[1]}`);
    },
  });

  const fileFilter = (req, file, cb) => {
    const extension = file.mimetype.split("/")[1];

    if (acceptedFileTypes.includes(extension)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  };

  return multer({
    storage: diskStorage,
    limits: { fileSize: maxSize },
    fileFilter,
  });
};

module.exports = {
  upload,
};
