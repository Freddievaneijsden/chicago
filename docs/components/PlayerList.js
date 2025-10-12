export const PlayerList = {
  props: ["players", "currentPlayer", "changeScore"],
  template: `
    <div>
      <p v-for="(player, index) in players" :key="index" 
         :class="{current: index === currentPlayer}" 
         @click="$emit('select-player', index)" class="player-row">
        <span class="chip-wrapper">
          <img src="images/poker-chip-svgrepo-com.svg" alt="Dealer" v-if="player.dealer" class="chip"/>
        </span>
        <span class="player-info">
          <span class="player-info">{{player.name}}</span>
          <span class="score" :class="{highlightScore: changeScore && index === currentPlayer}">{{player.score}}</span>
        </span>
      </p>
    </div>
  `
};
