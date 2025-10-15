export const RevertScore = {
props: ["currentPhase", "phases", "lastScore", "disabled", "transitioning"],
template: `<div class="btnWrapper">
                      <button @click="$emit('revert-last-score')" :disabled="!lastScore || (disabled || transitioning)" class="startBtn">
                        Revert
                      </button>
                     </div>`
        }