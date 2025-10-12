export const StartButton = {
props: ["players", "disabled", "transitioning"],
template: `
    <div class="btnWrapper">
        <button v-if="players.length > 1" 
        @click="$emit('start-game')" 
        class="startBtn" 
        :disabled="disabled || transitioning">
        Start
        </button>
    </div>`
}