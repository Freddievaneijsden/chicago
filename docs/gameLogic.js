export function startGame(game) {
              let randomNum = Math.floor(Math.random() * game.players.length);
              game.currentPlayer = randomNum;
              isDealer(game);

            game.buttonsDisabled = false;
}

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

export function nextPhase(game) {
              if (game.currentPhase === game.phases.FINISHED) {
                game.currentPhase = game.phases.START;
              }
              if (game.currentPhase === game.phases.START) {
                game.currentPhase = game.phases.ROUND;
              } else if (game.currentPhase === game.phases.ROUND) {
                if (game.currentRound === 1) {
                  game.currentRound++;
                } else if (game.currentRound === 2) {
                  game.isChicago = confirm(
                    "Round 2 has ended. Does anyone wish to call Chicago?"
                  );
                  if (game.isChicago) {
                    game.currentPhase = game.phases.CHICAGO;
                  } else {
                    game.currentPhase = game.phases.TRICK;
                  }
                } else if (game.currentRound === 3) {
                  checkWinner(game);
                }
              } else if (game.currentPhase === game.phases.TRICK) {
                game.currentPhase = game.phases.ROUND;
                if (game.currentRound < 3) {
                  game.currentRound++;
                }
              } else if (game.currentPhase === game.phases.CHICAGO) {
                checkWinner(game);
              }

              game.transitioning = false;
}

export function revertLastScore(game) {
              let lastValue = game.lastScore.value;
              game.lastScore.player.score -= lastValue.points;
              game.lastScore.player.values.pop();
              game.lastScore = null;

            if (game.currentPhase == game.phases.ROUND) {
                if (game.currentRound == 2) {
                  game.currentRound = 1;
                } else if (game.currentRound == 3) {
                  game.currentPhase = game.phases.TRICK;
                }
            } else if (game.currentPhase == game.phases.TRICK) {
                game.currentPhase = game.phases.ROUND;
                game.currentRound = 2;
            } else if (game.currentPhase == game.phases.CHICAGO) {
                game.currentPhase = game.phases.ROUND;
                game.currentRound = 2;
              }
              game.buttonsDisabled = false;
}

export function addScore(game, valueIndex) {
              let currentValue = game.values[valueIndex];
              let player = game.players[game.currentPlayer];

              player.score += currentValue.points;
              player.values.push(currentValue);

              game.lastScore = {
                player: player,
                value: currentValue,
              };

              countCalledChicago(valueIndex, player)
              game.showScoring();
              nextPhase(game);

              game.buttonsDisabled = false;
              game.output = "";
}

function countCalledChicago(valueIndex, player) {
              let chicagoSuccess = 9;
              let chicagoFailure = 10;
              if (valueIndex === chicagoSuccess) {
                player.calledChicago.successes++;
              } else if (valueIndex === chicagoFailure) {
                player.calledChicago.failures++;
              }
}
