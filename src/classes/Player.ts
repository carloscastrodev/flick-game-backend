import IGame from "../interfaces/IGame";
import IGameInvite from "../interfaces/IGameInvite";
import IPlayer from "../interfaces/IPlayer";

class Player implements IPlayer {
  id: string;
  name: string;
  currentGame: IGame | null = null;
  currentScore: Number | null = null;
  currentMouseX: Number | null = null;
  currentMouseY: Number | null = null;
  currentInvite: IGameInvite | null = null;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  setCurrentGame(game: IGame) {
    this.currentGame = game;
  }

  setCurrentScore(score: Number) {
    this.currentScore = score;
  }

  setCurrentMouseX(mouseX: Number) {
    this.currentMouseX = mouseX;
  }

  setCurrentMouseY(mouseY: Number) {
    this.currentMouseY = mouseY;
  }

  setCurrentGameInvite(gameInvite: IGameInvite) {
    this.currentInvite = gameInvite;
  }
}

export default Player;
