<template>
    <q-dialog ref="dialog" @hide="onDialogHide">
        <q-card class="q-dialog-plugin">
            <q-card-section class="text-h6">
                Level
                <q-input v-model="levelNumber" mask="##########" input-style="text-align: center; font-size: 2em" :rules="[(val) => parseInt(val).toString() === val && parseInt(val) < 4294967296]" />
            </q-card-section>
            <q-card-section class="text-h6"> Niveau </q-card-section>
            <q-card-section class="q-gutter-y-md">
                <q-btn v-for="level in difficultyLevels" :key="level.level" color="primary" outline size="lg" align="left" :label="level.name" class="full-width" @click="() => onOKClick(level.level)"><q-space /><q-icon v-for="x in level.level + 1" :key="x" name="star" color="yellow" /></q-btn>
            </q-card-section>
            <q-card-section>
                <q-btn label="Cancel" class="full-width" color="negative" @click="onCancelClick" />
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script>
import { ref } from "vue";
export default {
    name: "NewLevelDialog",
    props: {},
    emits: ["ok", "hide"],
    setup() {
        return {
            difficultyLevels: [
                {
                    name: "Easy",
                    level: 0,
                },
                {
                    name: "Medium",
                    level: 1,
                },
                {
                    name: "Hard",
                    level: 2,
                },
                {
                    name: "Extra Hard",
                    level: 3,
                },
            ],
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

        onOKClick(level) {
            if (this.levelNumber === "") this.levelNumber = Math.floor(Math.random() * 4294967296);
            this.$emit("ok", { level, seed: this.levelNumber });
            this.hide();
        },

        onCancelClick() {
            this.hide();
        },
    },
};
</script>
