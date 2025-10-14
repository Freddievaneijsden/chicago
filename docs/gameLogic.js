export function checkWinner(game) {
            let winningThreshhold = 52;
            let highestPoint = 0;
            let winnerName = "";
            let playerIndex = "";

            game.players.forEach((player, index) => {
              if (player.score > highestPoint) {
                highestPoint = player.score;
                winnerName = player.name;
                playerIndex = index;
              }
            });
            if (
              highestPoint >= winningThreshhold &&
              (!game.callChicagoOnceToWin ||
                game.players[playerIndex].calledChicago.successes > 0 ||
                game.players[playerIndex].calledChicago.failures > 0)
            ) {
              game.currentPhase = game.phases.FINISHED;
              game.winner = {
                name: winnerName,
                score: highestPoint,
              };
            } else {
              game.currentPhase = game.phases.ROUND;
              game.currentRound = 1;
              game.output = "New round - first to reach 52 wins!";
              game.lastScore = null;
              game.players[game.currentDealer].dealer = false;
              isDealer(game);
            }
}

export function resetGame(game) {
              if (game.buttonsDisabled) return;

              game.buttonsDisabled = true;


              isDealer(game);
              game.currentPhase = game.phases.START;
              game.currentRound = 1;
              game.currentPlayer = null;
              game.winner = null;
              game.output = "";
              game.players = [];
              game.buttonsDisabled = false;
}

export function isDealer(game) {  
            let playersLength = game.players.length;
            let randNum = Math.floor(Math.random() * playersLength);
            if (game.currentDealer === null) {
              game.currentDealer = randNum;
            } else if (game.currentDealer === playersLength - 1) {
              game.currentDealer = 0;
            } else {
              game.currentDealer++;
            }
            game.players[game.currentDealer].dealer = true;
}
