<template>
    <q-dialog v-model="show">
        <q-card class="my-card">
            <q-card-section>
                <q-list style="font-size: 1.5em">
                    <q-item-label header>Options</q-item-label>
                    <q-item clickable v-ripple v-for="setting in settingsToggles" :key="setting.name" @click="() => (setting.prop.value = !setting.prop.value)">
                        <q-item-section> {{ setting.name }} </q-item-section>
                        <q-item-section side>
                            <q-toggle v-model="setting.prop.value" :icon="setting.icon" />
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-card-section>
            <q-card-section>
                <q-btn label="Retry level" color="primary" class="full-width" @click="resetGame" />
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

export default defineComponent({
    name: "SettingsDialog",
    props: {
        modelValue: {
            type: Boolean,
            required: true,
        },
    },
    emits: ["update:modelValue", "resetGame"],
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
