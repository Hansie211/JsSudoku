<template>
    <q-dialog ref="dialog" @hide="onDialogHide" persistent>
        <q-card class="q-dialog-plugin q-gutter-md">
            <q-card-section class="text-h2"> You Won! </q-card-section>
            <q-card-section class="q-gutter-y-md text-h6">
                <div class="text-h6 row items-center">
                    Difficulty: <span class="q-ml-sm"><q-icon v-for="x in puzzle.difficultyLevel + 1" :key="x" name="star" color="yellow" /></span>
                </div>
                <div class="text-h6 row items-center">
                    Hints: <span class="q-ml-sm">{{ hintCount }}</span>
                </div>
                <div class="text-h6 row items-center">
                    Time Taken: <span class="q-ml-sm">{{ displayTime }}</span>
                </div>
                <div class="text-h6 row items-center">
                    Level: <span class="q-ml-sm">#{{ puzzle.seed }}</span>
                </div>
            </q-card-section>
            <q-card-section>
                <q-btn label="Play Another" class="full-width" size="lg" color="primary" @click="nextLevel" />
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script>
import { ref } from "vue";
import PuzzleBoard from "src/lib/reactiveSoduku";
import NewLevelDialog from "./NewLevelDialog.vue";
export default {
    name: "VictoryScreen",
    props: {
        puzzle: {
            type: PuzzleBoard,
            required: true,
        },
        time: {
            type: Number,
            required: true,
        },
        hintCount: {
            type: Number,
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
            const s = this.time % 60;
            const m = Math.floor(this.time / 60);

            return m.toString().padStart(2, "0") + ":" + s.toString().padStart(2, "0");
        },
    },
};
</script>
