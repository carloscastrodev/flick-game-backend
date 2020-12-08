import { ICanvas, IGameState, IUpdateState } from "./../interfaces/IGame";
import IGame from "../interfaces/IGame";
import IPlayer from "../interfaces/IPlayer";
import ITarget from "../interfaces/ITarget";

class Game implements IGame {
  id: String;
  canvas: ICanvas;
  players: IPlayer[];
  target: ITarget;
  maxScore: number;
  maxPlayers: number;

  constructor(
    id: string,
    canvas: ICanvas,
    players: IPlayer[],
    target: ITarget,
    maxScore: number,
    maxPlayers: number
  ) {
    this.id = id;
    this.canvas = canvas;
    this.players = players;
    this.target = target;
    this.maxScore = maxScore;
    this.maxPlayers = maxPlayers;
  }

  updateState: IUpdateState = (
    currentState: IGameState,
    nextState: IGameState
  ) => {
    return nextState;
  };
}

export default Game;
