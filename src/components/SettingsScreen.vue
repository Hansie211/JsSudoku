<template>
    <q-dialog ref="dialog" @hide="onDialogHide">
        <q-card style="width: 80vw">
            <q-item-label class="q-pb-sm" header>Options</q-item-label>
            <q-card-section class="q-pt-none">
                <q-list style="font-size: 1.2em">
                    <q-item class="text-body1" clickable v-ripple v-for="setting in settingsToggles" :key="setting.name" @click="() => (setting.prop.value = !setting.prop.value)">
                        <q-item-section> {{ setting.name }} </q-item-section>
                        <q-item-section side>
                            <q-toggle color="primary" size="md" v-model="setting.prop.value" checked-icon="check" unchecked-icon="clear" />
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-card-section>
            <q-separator />
            <q-card-section>
                <div class="text-subtitle2">Current level: {{ currentLevel }}</div>
                <div class="text-subtitle2 full-width flex row">Difficulty: {{ difficulty.name }}&nbsp;(<difficulty-rating :level="difficulty.level" />)</div>
            </q-card-section>
            <q-separator />
            <q-card-section class="q-pb-none">
                <q-btn label="Wipe app data" outline color="negative" size="md" class="full-width q-my-md" @click="clearCache" />
            </q-card-section>

            <q-separator />

            <q-card-actions align="right">
                <q-btn v-close-popup flat color="primary" label="Close" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
<script>
import DifficultyLevels from "src/lib/difficulties";
import { useSettingsStore } from "src/stores/settings-store";
import { computed, defineComponent } from "vue";
import DifficultyRating from "./DifficultyRating.vue";
import NewLevelDialog from "./NewLevelDialog";
import VictoryHistoryScreen from "./VictoryHistoryScreen.vue";

export default defineComponent({
    components: { DifficultyRating },
    name: "SettingsScreen",
    props: {
        currentLevel: {
            type: Number,
            required: true,
        },
        difficultyLevel: {
            type: Number,
            required: true,
        },
    },
    setup(props) {
        const settings = useSettingsStore();

        const settingsToggles = [
            {
                name: "Display time",
                prop: computed({
                    get: () => settings.showTime,
                    set: (v) => (settings.showTime = v),
                }),
            },
            {
                name: "Highlight errors",
                prop: computed({
                    get: () => settings.showErrors,
                    set: (v) => (settings.showErrors = v),
                }),
            },
            {
                name: "Allow hints",
                prop: computed({
                    get: () => settings.showHints,
                    set: (v) => (settings.showHints = v),
                }),
            },
            {
                name: "Auto remove notes",
                prop: computed({
                    get: () => settings.autoRemoveNotes,
                    set: (v) => (settings.autoRemoveNotes = v),
                }),
            },
            {
                name: "Washout invalid moves",
                prop: computed({
                    get: () => settings.markImpossibleNumbers,
                    set: (v) => (settings.markImpossibleNumbers = v),
                }),
            },
            {
                name: "Numbers first mode",
                prop: computed({
                    get: () => settings.placeNumbersOnSelect,
                    set: (v) => (settings.placeNumbersOnSelect = v),
                }),
            },
        ];

        return {
            settings,
            settingsToggles,
            difficulty: DifficultyLevels[props.difficultyLevel],
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
            return new Promise((resolve) => {
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
                    .onCancel(() => resolve(false));
            });
        },

        async clearCache() {
            const confirm = await this.confirm("Are you sure? This will remove your current save game and the victory history. You cannot reverse this action.");
            if (!confirm) return;

            this.$q.localStorage.clear();
            location.reload();
        },
    },
});
</script>
