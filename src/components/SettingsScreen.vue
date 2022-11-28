<template>
    <q-dialog ref="dialog">
        <q-card style="width: 80vw">
            <q-card-section>
                <q-list style="font-size: 1.2em">
                    <q-item-label header>Options</q-item-label>
                    <q-item class="text-body1" clickable v-ripple v-for="setting in settingsToggles" :key="setting.name" @click="() => (setting.prop.value = !setting.prop.value)">
                        <q-item-section> {{ setting.name }} </q-item-section>
                        <q-item-section side>
                            <q-toggle v-model="setting.prop.value" :icon="setting.icon" />
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-card-section>
            <q-card-section class="q-gutter-y-md">
                <div class="text-subtitle2">Current level: {{ currentLevel }}</div>
                <q-btn label="Clear data" flat color="negative" class="full-width" @click="clearCache" />
                <q-btn label="Retry level" flat color="negative" class="full-width" @click="onResetGame" />
                <q-btn label="New level" flat color="primary" class="full-width" @click="onNewGame" />
                <q-btn label="History" flat color="primary" class="full-width" @click="showHistory" />
            </q-card-section>

            <q-separator />

            <q-card-actions align="right">
                <q-btn v-close-popup flat color="primary" label="Close" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
<script>
import { useSettingsStore } from "src/stores/settings-store";
import { computed, defineComponent } from "vue";
import NewLevelDialog from "./NewLevelDialog";
import VictoryHistoryScreen from "./VictoryHistoryScreen.vue";

export default defineComponent({
    name: "SettingsScreen",
    props: {
        currentLevel: {
            type: Number,
            required: true,
        },
    },
    setup() {
        const settings = useSettingsStore();

        const settingsToggles = [
            {
                name: "Display time",
                icon: "o_timer",
                prop: computed({
                    get: () => settings.showTime,
                    set: (v) => (settings.showTime = v),
                }),
            },
            {
                name: "Highlight errors",
                icon: "o_fact_check",
                prop: computed({
                    get: () => settings.showErrors,
                    set: (v) => (settings.showErrors = v),
                }),
            },
            {
                name: "Allow hints",
                icon: "o_tips_and_updates",
                prop: computed({
                    get: () => settings.showHints,
                    set: (v) => (settings.showHints = v),
                }),
            },
        ];

        return {
            settings,
            settingsToggles,
        };
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

        onDialogCancel() {
            this.hide();
        },
        onDialogOK(action) {
            this.$emit("ok", action);
            this.hide();
        },

        confirm(message) {
            return new Promise((resolve, reject) => {
                this.$q
                    .dialog({
                        title: "Warning",
                        message: message,
                        cancel: true,
                        persistent: true,
                        ok: {
                            label: "Continue",
                            color: "negative",
                        },
                    })
                    .onOk(() => resolve(true))
                    .onCancel(() => reject(false));
            });
        },

        async onResetGame() {
            const confirm = await this.confirm("Are you sure? You cannot reverse this action.");
            if (!confirm) return;

            this.onDialogOK({ name: "reset-level", data: {} });
        },

        async clearCache() {
            const confirm = await this.confirm("Are you sure? This will remove your current save game and the victory history. You cannot reverse this action.");
            if (!confirm) return;

            this.$q.localStorage.clear();
            location.reload();
        },
        onNewGame() {
            this.$q.dialog({ component: NewLevelDialog }).onOk((levelInfo) => {
                this.onDialogOK({
                    name: "new-level",
                    data: {
                        seed: levelInfo.seed,
                        difficultyLevel: levelInfo.difficultyLevel,
                    },
                });
            });
        },
        showHistory() {
            this.$q.dialog({
                component: VictoryHistoryScreen,
                componentProps: {
                    victories: (this.$q.localStorage.getItem("victories")?.data ?? []).reverse(),
                },
            });
        },
    },
});
</script>
