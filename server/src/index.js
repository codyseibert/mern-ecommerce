const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config()

const {
  createProductController,
} = require("./controllers/createProductController");
const {
  getProductsController,
} = require("./controllers/getProductsController");
const { registerController } = require("./controllers/registerController");
const { loginController } = require("./controllers/loginController");
const { getProductController } = require("./controllers/getProductController");
const {
  updateProductController,
} = require("./controllers/updateProductController");
const multer  = require('multer')

const {nanoid} = require('nanoid');
const mime = require('mime-types');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images')
  },
  filename: function (req, file, cb) {
    let id = nanoid();
    let ext = mime.extension(file.mimetype);
    cb(null, `${id}.${ext}`);
  }
})

const upload = multer({ storage: storage })

app.use(express.static('./images'))
app.use(express.json());
app.use(cors());

app.post("/products", upload.single('file'), createProductController);
app.get("/products", getProductsController);
app.get("/products/:productId", getProductController);
app.patch("/products/:productId", updateProductController);
app.post("/register", registerController);
app.post("/login", loginController);

mongoose.connect(process.env.MONGO_DB_URL).then(() => {
  app.listen(8080);
});
