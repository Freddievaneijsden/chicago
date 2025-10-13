export const RevertScore = {
props: ["currentPhase", "phases", "lastScore"],
template: `<div class="btnWrapper">
                      <button @click="$emit('revert-last-score')" :disabled="!lastScore" class="startBtn">
                        Revert
                      </button>
                     </div>`
        }