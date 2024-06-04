const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

const uploadPath = path.join(__dirname, "/../static/uploads/images/")

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, done) => {
    done(null, uploadPath);
  },

  filename: (req, file, done) => {
    const customFileName = crypto.randomBytes(18).toString("hex");
    const extension = file.originalname.split(".")[1];
    done(null, customFileName + "." + extension);
  },
});

module.exports = storage;
