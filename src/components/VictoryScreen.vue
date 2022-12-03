<template>
    <q-dialog ref="dialog" @hide="onDialogHide" persistent>
        <q-card class="q-dialog-plugin q-pa-sm">
            <q-card-section class="text-h4"> Game completed! </q-card-section>
            <q-card-section id="scoreboard" class="text-body1 q-my-lg">
                <div class="score-item">
                    <div class="caption text-subtitle2 flex row items-center">Difficulty <q-icon class="icon" name="o_psychology" /></div>
                    <div class="value">
                        <difficulty-rating :level="victory.difficultyLevel" />
                    </div>
                </div>
                <div class="score-item">
                    <div class="caption text-subtitle2 flex row items-center">Hints <q-icon class="icon" name="o_tips_and_updates" /></div>
                    <div class="value text-body1">
                        {{ victory.hintCount }}
                    </div>
                </div>
                <div class="score-item">
                    <div class="caption text-subtitle2 flex row items-center">Time <q-icon class="icon" name="o_timer" /></div>
                    <div class="value text-body1">
                        {{ displayTime }}
                    </div>
                </div>
                <div class="score-item">
                    <div class="caption text-subtitle2 flex row items-center">Level <q-icon class="icon" name="o_tour" /></div>
                    <div class="value text-body1">#{{ victory.level }}</div>
                </div>
            </q-card-section>
            <q-card-section>
                <q-btn label="Play Another" class="full-width" size="lg" color="primary" @click="nextLevel" />
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script>
import NewLevelDialog from "./NewLevelDialog.vue";
import DifficultyRating from "./DifficultyRating.vue";
import { Victory } from "src/stores/victory-store";
import { defineComponent } from "vue";

export default defineComponent({
    name: "VictoryScreen",
    components: { DifficultyRating },
    props: {
        victory: {
            type: Victory,
            required: true,
        },
    },
    emits: ["ok", "hide"],
    methods: {
        show() {
            this.$refs.dialog.show();
        },
        hide() {
            this.$refs.dialog.hide();
        },
        onDialogHide() {
            this.$emit("hide");
        },

        nextLevel() {
            this.$q
                .dialog({
                    component: NewLevelDialog,
                })
                .onOk((levelInfo) => {
                    this.$emit("ok", levelInfo);
                    this.hide();
                });
        },
    },
    computed: {
        displayTime() {
            const s = this.victory.time % 60;
            const m = Math.floor(this.victory.time / 60);

            return m.toString().padStart(2, "0") + ":" + s.toString().padStart(2, "0");
        },
    },
});
</script>
<style scoped>
#scoreboard {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 20px;
}

.caption {
    gap: 5px;
}
</style>
