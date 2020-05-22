const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

require("dotenv").config();

const authRouter = require("../auth/authentication-router.js");
const songsRouter = require("../savedSongsForEachUser/savedSongs-router");
const recommendedSongsRouter = require("../recommendedSongs/recommendedSongs-router.js");

const authenticator = require("../auth/authentication-check-middleware.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(morgan("common"));

server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});

server.use("/api/auth", authRouter);
server.use("/api/songs", authenticator, songsRouter);
server.use("/api/recommendedsongs", authenticator, recommendedSongsRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "Server is up and running" });
});

module.exports = server;
