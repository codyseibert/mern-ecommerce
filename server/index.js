const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BlogPostSchema = new Schema({
  body: String,
});
const BlogPostModel = mongoose.model("BlogPost", BlogPostSchema);

app.use(express.json());
app.use(cors());

app.get("/hello", async (req, res) => {
  const instance = new BlogPostModel({
    body: "hello world",
  });
  await instance.save();
  res.send("what is up dawg");
});

mongoose.connect("mongodb://localhost/shopping_cart").then(() => {
  app.listen(8080);
});
