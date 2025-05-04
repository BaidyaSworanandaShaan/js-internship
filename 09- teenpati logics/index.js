import { playersData } from "./data/playerData.js";
import { Game } from "./models/Game.js";

const game = new Game();

// Add list of players in game
game.addPlayers(playersData);

// Distribute Cards
game.distributeCardsToPlayer();
game.placeBet(game.players[0], 100);

game.players[0].revealCards();
game.foldPlayer(game.players[1]);
game.foldPlayer(game.players[2]);
