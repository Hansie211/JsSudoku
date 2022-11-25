<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar>
                <q-toolbar-title> Sudoku </q-toolbar-title>
                <div>{{ settings.version }}</div>
            </q-toolbar>
        </q-header>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
import { useSettingsStore } from "src/stores/settings-store";
import { defineComponent } from "vue";

export default defineComponent({
    name: "MainLayout",
    setup() {
        const settings = useSettingsStore();
        return {
            settings,
        };
    },
});
</script>
