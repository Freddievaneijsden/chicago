export const ResultList = {
props: ["players"], 
template: `<div>
            <ul class="results-list">
              <li v-for="player in players" :key="player.name">
                <strong>{{ player.name }}</strong>
                <div>Score: <span>{{ player.score }}</span></div>
                <div>
                  Chicago → ✅ {{ player.calledChicago.successes }} | ❌ {{
                  player.calledChicago.failures }}
                </div>
                <br />
              </li>
            </ul>
          </div>`
        }