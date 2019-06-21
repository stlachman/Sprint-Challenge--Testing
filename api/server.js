const express = require("express");

const server = express();

server.use(express.json());

const gamesRouter = require("../games/games-route");

server.get("/", (req, res) => {
  res.status(200).json({ message: "hello everyone" });
});

server.use("/games", gamesRouter);

module.exports = server;
