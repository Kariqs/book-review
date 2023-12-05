const express = require("express");
const db = require("../data/database");
const multer = require("multer");
const { ObjectId } = require("mongodb");

const storageConfig = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "images");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storageConfig });
const router = express.Router();

router.get("/", async function (req, res) {
  const books = await db.getDatabase().collection("books").find().toArray();
  res.render("books-list", { books: books });
});

router.get("/share", function (req, res) {
  res.render("book-share");
});

router.post("/share", upload.single("image"), async function (req, res) {
  const data = {
    title: req.body.title,
    author: req.body.author,
    price: req.body.price,
    email: req.body.email,
    summary: req.body.summary,
    imagePath: req.file.path,
    date: new Date(),
  };

  await db.getDatabase().collection("books").insertOne(data);

  res.redirect("/");
});

router.get("/share/:id", async function (req, res) {
  const bookId = new ObjectId(req.params.id);
  const book = await db
    .getDatabase()
    .collection("books")
    .findOne({ _id: bookId });
  res.render("book-review", { book: book });
});

router.get("/share/:id/comments", async function (req, res) {
  const bookId = new ObjectId(req.params.id);

  const comments = await db
    .getDatabase()
    .collection("comments")
    .find({ bookId: bookId })
    .toArray();

  res.json(comments);
});

router.post("/share/id/comments", async function (req, res) {
  const bookId = new ObjectId(req.params.id);
  const data = {
    bookId: bookId,
    comment: req.body.comment,
  };
  await db.getDatabase().collection("comments").insertOne(data);
});

module.exports = router;
