const multer = require("multer");
const fs = require("fs");
const path = require("path");
const createHttpError = require("http-errors");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // اگر پوشه public/upload وجود نداشته باشد، آن را ایجاد می‌کند.
    fs.mkdirSync("public/upload", { recursive: true });
    cb(null, "public/upload");
  },
  filename: (req, file, cb) => {
    const formatFile = path.extname(file.originalname);
    const whiteListFormat = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/webp",
    ];
    // imetype نوع واقعی فایل را (نوع محتوای فایل) مشخص می‌کند و توسط مرورگر هنگام آپلود ارسال می‌شود.
    if (whiteListFormat.includes(file.mimetype)) {
      const format = path.extname(file.originalname);
      const filename = new Date().getTime().toString() + format;
      cb(null, filename);
    } else {
      cb(new createHttpError.BadRequest("format of pictures are wrong!"));
    }

    const fileName = Date.now() + formatFile;
  },
});
const uploadFile = multer({ storage, limits: { fileSize: 3 * 1000 * 1000 } });
module.exports = { uploadFile };
