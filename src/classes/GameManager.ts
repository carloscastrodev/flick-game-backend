import {
  INVITE_PLAYER,
  REJECT_PLAYER_INVITE,
  REGISTER_PLAYER,
  UPDATE_PLAYER,
  UPDATE_PLAYERS,
  DISCONNECTED_PLAYER,
  ACCEPT_PLAYER_INVITE,
} from "./../constants";
import { Server, Socket } from "socket.io";
import IGame from "../interfaces/IGame";
import IGameManager from "../interfaces/IGameManager";
import IPlayer from "../interfaces/IPlayer";
import Player from "./Player";
import GameInvite from "./GameInvite";
import IGameInvite from "../interfaces/IGameInvite";

export default class GameManager implements IGameManager {
  io: Server;
  players: IPlayer[];
  games: IGame[];
  connections: Socket[];

  constructor(
    io: Server,
    players: IPlayer[],
    games: IGame[],
    connections: Socket[]
  ) {
    this.io = io;
    this.players = players;
    this.games = games;
    this.connections = connections;
  }

  init = () => {
    this.io.on("connection", (socket: Socket) => {
      const player = new Player(socket.id, socket.id);
      this.players = [...this.players, player];

      this.connections = [...this.connections, socket];
      this.io.to(socket.id).emit(UPDATE_PLAYER, player);
      this.io.emit(UPDATE_PLAYERS, this.players);

      socket.on(REGISTER_PLAYER, (player: IPlayer) => {
        this.players.push(player);
        socket.broadcast.emit(UPDATE_PLAYERS, this.players);
      });

      socket.on(UPDATE_PLAYER, (args) => {
        const player = args[0] as IPlayer;
        const playerIndex = this.players.findIndex((p) => p.id === player.id);

        this.players[playerIndex] = player;

        socket.broadcast.emit(UPDATE_PLAYERS, this.players);
      });

      socket.on(INVITE_PLAYER, (args) => {
        const player1 = args[0] as IPlayer;
        const player2 = args[1] as IPlayer;

        if (!player1.currentInvite && !player2.currentInvite) {
          const invite = new GameInvite(
            player1.id,
            player1.name,
            player2.id,
            player2.name
          );
          player1.currentInvite = invite;
          player2.currentInvite = invite;

          console.log(invite);

          const player1Index = this.players.findIndex(
            (p) => p.id === player1.id
          );
          const player2Index = this.players.findIndex(
            (p) => p.id === player2.id
          );

          this.players[player1Index] = player1;
          this.players[player2Index] = player2;
          this.io.to(player1.id).emit(UPDATE_PLAYER, player1);
          this.io.to(player2.id).emit(UPDATE_PLAYER, player2);
          socket.broadcast.emit(UPDATE_PLAYERS, this.players);
        }
      });

      socket.on(REJECT_PLAYER_INVITE, (args) => {
        const invite = args[0] as IGameInvite;
        const sendingUserId = args[1] as string;
        const player1Id = invite.invitingPlayerId;
        const player2Id = invite.invitedPlayerId;
        const player2Name = invite.invitedPlayerName;

        const player1Index = this.players.findIndex((p) => p.id === player1Id);
        const player2Index = this.players.findIndex((p) => p.id === player2Id);

        this.players[player1Index].currentInvite = null;
        this.players[player2Index].currentInvite = null;
        this.io.to(player1Id).emit(UPDATE_PLAYER, this.players[player1Index]);
        if (sendingUserId !== player1Id) {
          this.io.to(player1Id).emit(REJECT_PLAYER_INVITE, player2Name);
        }
        this.io.to(player2Id).emit(UPDATE_PLAYER, this.players[player2Index]);
        socket.broadcast.emit(UPDATE_PLAYERS, this.players);
      });

      socket.on(ACCEPT_PLAYER_INVITE, (args) => {});
      socket.on("disconnect", () => {
        const disconnectedPlayer = this.players.find((p) => p.id === socket.id);

        if (disconnectedPlayer) {
          const playerInvite = disconnectedPlayer.currentInvite;

          this.players = this.players.filter((p) => p.id !== socket.id);

          if (playerInvite) {
            const invitingPlayerIndex = this.players.findIndex(
              (p) => p.id === playerInvite.invitingPlayerId
            );
            const invitedPlayerIndex = this.players.findIndex(
              (p) => p.id === playerInvite.invitedPlayerId
            );

            if (invitingPlayerIndex !== -1) {
              this.players[invitingPlayerIndex].currentInvite = null;
              this.players[invitingPlayerIndex].currentGame = null;
              const invitingPlayer = this.players[invitingPlayerIndex];
              this.io.to(invitingPlayer.id).emit(UPDATE_PLAYER, invitingPlayer);
              this.io
                .to(invitingPlayer.id)
                .emit(DISCONNECTED_PLAYER, disconnectedPlayer.name);
            }

            if (invitedPlayerIndex !== -1) {
              this.players[invitedPlayerIndex].currentInvite = null;
              this.players[invitedPlayerIndex].currentGame = null;
              const invitedPlayer = this.players[invitedPlayerIndex];
              this.io.to(invitedPlayer.id).emit(UPDATE_PLAYER, invitedPlayer);
              this.io
                .to(invitedPlayer.id)
                .emit(DISCONNECTED_PLAYER, disconnectedPlayer.name);
            }
          }
        }

        socket.broadcast.emit(UPDATE_PLAYERS, this.players);
      });
    });
  };
}
