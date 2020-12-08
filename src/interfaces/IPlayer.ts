import IGame from "./IGame";
import IGameInvite from "./IGameInvite";

export default interface IPlayer {
  id: string;
  name: string;
  currentGame: IGame | null;
  currentScore: Number | null;
  currentMouseX: Number | null;
  currentMouseY: Number | null;
  currentInvite: IGameInvite | null;
}
