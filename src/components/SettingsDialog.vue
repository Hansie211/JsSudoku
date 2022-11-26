<template>
    <q-dialog v-model="show">
        <q-card class="my-card">
            <q-card-section>
                <q-list style="font-size: 1.2em">
                    <q-item-label header>Options</q-item-label>
                    <q-item clickable v-ripple v-for="setting in settingsToggles" :key="setting.name" @click="() => (setting.prop.value = !setting.prop.value)">
                        <q-item-section> {{ setting.name }} </q-item-section>
                        <q-item-section side>
                            <q-toggle v-model="setting.prop.value" :icon="setting.icon" />
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-card-section>
            <q-card-section class="q-gutter-y-sm">
                <div class="text-subtitle2">Current level: {{ puzzle.seed }}</div>
                <q-btn label="Retry level" color="primary" class="full-width" @click="resetGame" />
                <q-btn label="New level" color="primary" class="full-width" @click="newGame" />
            </q-card-section>

            <q-separator />

            <q-card-actions align="right">
                <q-btn v-close-popup flat color="primary" label="Close" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
<script>
import PuzzleBoard from "src/lib/reactiveSoduku";
import { useSettingsStore } from "src/stores/settings-store";
import { computed, defineComponent } from "vue";
import NewLevelDialog from "./NewLevelDialog";

export default defineComponent({
    name: "SettingsDialog",
    props: {
        modelValue: {
            type: Boolean,
            required: true,
        },
        puzzle: {
            type: PuzzleBoard,
            required: true,
        },
    },
    emits: ["update:modelValue", "resetGame", "newLevel"],
    setup() {
        const settings = useSettingsStore();

        const settingsToggles = [
            {
                name: "Timer",
                icon: "timer",
                prop: computed({
                    get: () => settings.showTime,
                    set: (v) => (settings.showTime = v),
                }),
            },
            {
                name: "Highlight errors",
                icon: "error",
                prop: computed({
                    get: () => settings.showErrors,
                    set: (v) => (settings.showErrors = v),
                }),
            },
        ];

        return {
            settings,
            settingsToggles,
        };
    },
    methods: {
        resetGame() {
            this.$q
                .dialog({
                    title: "Warning",
                    message: "Are you sure? You cannot reverse this action.",
                    cancel: true,
                    persistent: true,
                    ok: {
                        label: "Continue",
                        color: "negative",
                    },
                })
                .onOk(() => {
                    this.$emit("resetGame");
                    this.show = false;
                });
        },
        newGame() {
            this.$q
                .dialog({
                    component: NewLevelDialog,
                    componentProps: {
                        text: "something",
                        // ...more..props...
                    },
                })
                .onOk((levelInfo) => {
                    this.$emit("newLevel", levelInfo);
                    this.show = false;
                });
        },
    },
    computed: {
        show: {
            get() {
                return this.modelValue;
            },
            set(newValue) {
                this.$emit("update:modelValue", newValue);
            },
        },
    },
});
</script>
