const express = require("express");
const mongodb = require("mongodb");
const path = require("path");
const bookRoutes = require("./routes/books");
const db = require("./data/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join("views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use("/images", express.static("images"));
app.use(bookRoutes);

db.connectToDatabase().then(function () {
  app.listen(3000);
});
