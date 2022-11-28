<template>
    <q-dialog ref="dialog" @hide="onDialogHide">
        <q-card class="q-dialog-plugin">
            <q-card-section class="text-h6">
                Level
                <q-input v-model="levelNumber" mask="##########" input-style="text-align: center; font-size: 2em" :rules="[(val) => parseInt(val).toString() === val && parseInt(val) < 4294967296]" />
            </q-card-section>
            <q-card-section class="text-h6"> Niveau </q-card-section>
            <q-card-section class="q-gutter-y-md">
                <q-btn v-for="difficulty in Difficulty" :key="difficulty.level" color="primary" outline size="lg" align="left" :label="difficulty.name" class="full-width" @click="() => onOKClick(difficulty)"
                    ><q-space /><q-icon v-for="x in difficulty.level + 1" :key="x" name="star" color="yellow"
                /></q-btn>
            </q-card-section>
            <q-card-section>
                <q-btn label="Cancel" class="full-width" color="negative" @click="onCancelClick" />
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script>
import { ref } from "vue";
import Difficulty from "src/data/difficulty.json";

/**
 * @param {Object} value
 * @param {Number} def
 * @returns {Number}
 */
function parseDef(value, def) {
    const result = parseInt(value);
    return isNaN(result) ? def : result;
}

export default {
    name: "NewLevelDialog",
    props: {},
    emits: ["ok", "hide"],
    setup() {
        return {
            Difficulty,
            levelNumber: ref(Math.floor(Math.random() * 4294967296)),
        };
    },
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

        onOKClick(difficulty) {
            const seed = parseDef(this.levelNumber, Math.floor(Math.random() * 4294967296));
            this.$emit("ok", { difficultyLevel: difficulty.level, seed });
            this.hide();
        },

        onCancelClick() {
            this.hide();
        },
    },
};
</script>
