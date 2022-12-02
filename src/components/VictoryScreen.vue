<template>
    <q-dialog ref="dialog" @hide="onDialogHide" persistent>
        <q-card class="q-dialog-plugin q-pa-sm">
            <q-card-section class="text-h4"> Game completed! </q-card-section>
            <q-card-section class="q-gutter-y-md text-body1 q-my-lg">
                <div class="row items-center">
                    Difficulty: <span class="q-ml-sm"><difficulty-rating :level="victory.difficultyLevel" /></span>
                </div>
                <div class="row items-center">
                    Hints: <span class="q-ml-sm">{{ victory.hintCount }}</span>
                </div>
                <div class="row items-center">
                    Time: <span class="q-ml-sm">{{ displayTime }}</span>
                </div>
                <div class="row items-center">
                    Level: <span class="q-ml-sm">#{{ victory.level }}</span>
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
