import { REGISTER_PLAYER } from "./constants";
import http from "http";
import express from "express";
import cors from "cors";
import { Server, Socket } from "socket.io";
import GameManager from "./classes/GameManager";

const corsOptions: cors.CorsOptions = {
  optionsSuccessStatus: 200,
  maxAge: 86400,
  origin: "*",
  preflightContinue: true,
};

const app = express();
app.use(cors(corsOptions));

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const gameManager = new GameManager(io, [], [], []);
gameManager.init();

app.get("/hello", (req, res, next) => {
  res.send({ message: "Hello World" });
});

app.get("/", (req, res, next) => {
  res.send({ message: "Home" });
});

server.listen(8080, () => {
  console.log("App started. Listening on port 8080 😀");
});
