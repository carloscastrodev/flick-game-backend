import { Server, Socket } from "socket.io";
import IGame from "./IGame";
import IPlayer from "./IPlayer";

export default interface IGameManager {
  io: Server;
  players: IPlayer[];
  games: IGame[];
  connections: Socket[];
}
