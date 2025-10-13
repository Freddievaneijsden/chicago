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
              game.isDealer();
            }
}