
const express = require("express");
const path = require("path");
const ticketRoutes = require("./routes/tickets");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "../views"));

app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname, "../public")));

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/", ticketRoutes);

module.exports = app;
