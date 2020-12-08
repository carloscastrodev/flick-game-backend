import IPlayer from "./IPlayer";
import ITarget from "./ITarget";

export interface IGameState {
  maxPlayers: number;
  players: IPlayer[];
  target: ITarget;
  maxScore: number;
}

export interface IUpdateState {
  (currentState: IGameState, nextState: IGameState): IGameState;
}

export interface ICanvas {
  width: number;
  height: number;
}

export default interface IGame extends IGameState {
  id: String;
  canvas: ICanvas;
  updateState: IUpdateState;
}
