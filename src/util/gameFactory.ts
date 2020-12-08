import { ICanvas } from "./../interfaces/IGame";
import {
  DEFAULT_CANVAS_HEIGHT,
  DEFAULT_CANVAS_WIDTH,
  DEFAULT_MAX_PLAYERS,
  DEFAULT_MAX_SCORE,
  DEFAULT_TARGET_RADIUS,
} from "./../constants";
import IPlayer from "../interfaces/IPlayer";
import Game from "../classes/Game";
import ITarget from "../interfaces/ITarget";
import randInt from "./randInt";

interface IGameOptions {
  canvasWidth?: number;
  canvasHeight?: number;
  maxScore?: number;
  targetRadius?: number;
  maxPlayers?: number;
}

interface IGameFactoryArgs {
  gameOptions: IGameOptions;
  players: [IPlayer, IPlayer];
}

export default function gameFactory({
  gameOptions,
  players,
}: IGameFactoryArgs) {
  const gameId = `${players[0].id}-${players[1].id}`;
  const canvasWidth = gameOptions.canvasWidth || DEFAULT_CANVAS_WIDTH;
  const canvasHeight = gameOptions.canvasHeight || DEFAULT_CANVAS_HEIGHT;
  const maxScore = gameOptions.maxScore || DEFAULT_MAX_SCORE;
  const targetRadius = gameOptions.targetRadius || DEFAULT_TARGET_RADIUS;
  const maxPlayers = gameOptions.maxPlayers || DEFAULT_MAX_PLAYERS;

  const canvas: ICanvas = { width: canvasWidth, height: canvasHeight };
  const target: ITarget = {
    x: randInt(0 + targetRadius, canvasWidth - targetRadius),
    y: randInt(0 + targetRadius, canvasHeight - targetRadius),
    radius: targetRadius,
  };
  return function makeGame() {
    return new Game(gameId, canvas, players, target, maxScore, maxPlayers);
  };
}
