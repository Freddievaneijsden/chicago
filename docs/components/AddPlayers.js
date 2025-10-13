export const AddPlayers = {
props: ["players"],
template: `<div class="inputWrapper">
                  <input
                    v-model.trim="playerName"
                    placeholder="Add player"
                    @keyup.enter="addPlayer"
                    @input="playerName = $event.target.value"
                    maxlength="15"
                  />
                  <button v-if="playerName.length > 0" @click="addPlayer">Ok</button>
                  </div>
                  <div class="outputWrapper">
                  <p class="output">{{output}}</p>
                   </div>
                    `,
          data() {
            return {
              playerName: "",
              output: "",
            };
          },
          methods: {
            addPlayer() {
              let name = this.playerName.trim();
              if (name === "") {
                this.output = "Name must be at least one letter!";
              } else if (this.players.length > 3) {
                this.output = "Maximum number of players!";
              } else {
                this.output = "";
                this.players.push({
                  name: name,
                  values: [],
                  score: 0,
                  dealer: false,
                  calledChicago: {
                    successes: 0,
                    failures: 0,
                  },
                });
                this.playerName = "";
              }
            },
          }
    }