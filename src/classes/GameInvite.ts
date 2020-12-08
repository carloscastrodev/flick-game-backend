import IGameInvite from "../interfaces/IGameInvite";

class GameInvite implements IGameInvite {
  invitingPlayerId: string;
  invitedPlayerId: string;
  invitingPlayerName: string;
  invitedPlayerName: string;

  constructor(
    invitingPlayerId: string,
    invitingPlayerName: string,
    invitedPlayerId: string,
    invitedPlayerName: string
  ) {
    this.invitingPlayerId = invitingPlayerId;
    this.invitedPlayerId = invitedPlayerId;
    this.invitingPlayerName = invitingPlayerName;
    this.invitedPlayerName = invitedPlayerName;
  }
}

export default GameInvite;
