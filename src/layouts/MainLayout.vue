<template>
    <q-layout view="lHr lpR lFr">
        <q-header elevated class="bg-primary text-white">
            <q-toolbar>
                <q-btn dense flat round icon="menu" @click="leftDrawerOpen = !leftDrawerOpen" />

                <q-toolbar-title> JsSudoku </q-toolbar-title>
                <div>{{ settings.version }}</div>
            </q-toolbar>
        </q-header>

        <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="mobile" bordered>
            <q-scroll-area class="fit">
                <q-list>
                    <q-item clickable v-ripple @click="leftDrawerOpen = !leftDrawerOpen">
                        <q-item-section avatar>
                            <q-icon name="close" />
                        </q-item-section>
                        <q-item-section> Close </q-item-section>
                    </q-item>

                    <q-separator />
                    <q-item />

                    <q-item>
                        <q-item-section>
                            <div class="flex row full-width">Level #<q-space />{{ gameState.puzzle.seed }}</div>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <div class="flex row full-width">Difficulty<q-space /><difficulty-rating :level="gameState.puzzle.difficultyLevel" /></div>
                        </q-item-section>
                    </q-item>

                    <q-separator />
                    <q-item />

                    <template v-for="(menuItem, index) in menuList" :key="index">
                        <q-item clickable v-ripple @click="menuItem.action">
                            <q-item-section avatar>
                                <q-icon :name="menuItem.icon" />
                            </q-item-section>
                            <q-item-section>
                                {{ menuItem.label }}
                            </q-item-section>
                        </q-item>
                        <q-separator :key="'sep-' + index" v-if="menuItem.separator" />
                        <q-item v-if="menuItem.separator" :key="'empty-slot-' + index"></q-item>
                    </template>
                </q-list>
            </q-scroll-area>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
import { useQuasar } from "quasar";
import DifficultyRating from "src/components/DifficultyRating.vue";
import NewLevelDialog from "src/components/NewLevelDialog.vue";
import SettingsScreenVue from "src/components/SettingsScreen.vue";
import VictoryHistoryScreen from "src/components/VictoryHistoryScreen.vue";
import { getGameState } from "src/stores/game-store";
import { useSettingsStore } from "src/stores/settings-store";
import { defineComponent, ref } from "vue";

export default defineComponent({
    components: { DifficultyRating },
    name: "MainLayout",
    setup() {
        const settings = useSettingsStore();
        const gameState = getGameState();
        const leftDrawerOpen = ref(false);

        const $q = useQuasar();

        const userConfirm = (message) => {
            return new Promise((resolve) => {
                $q.dialog({
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
        };

        const menuList = [
            {
                label: "Settings",
                icon: "o_settings",
                action: () => {
                    leftDrawerOpen.value = false;
                    gameState.timer.paused = true;
                    $q.dialog({
                        component: SettingsScreenVue,
                        componentProps: {
                            currentLevel: gameState.puzzle.seed,
                            difficultyLevel: gameState.puzzle.difficultyLevel,
                        },
                    }).onDismiss(() => {
                        gameState.timer.paused = false;
                    });
                },
            },
            {
                label: "New level",
                icon: "o_design_services",
                action: async () => {
                    leftDrawerOpen.value = false;
                    $q.dialog({ component: NewLevelDialog }).onOk(async (levelInfo) => {
                        const seed = levelInfo.seed;
                        const difficultyLevel = levelInfo.difficultyLevel;

                        $q.loading.show({ message: "Generating level...", delay: 1 });

                        await gameState.newLevel(difficultyLevel, seed);

                        $q.loading.hide();

                        // await this.generateLevel(action.data.difficultyLevel, action.data.seed);
                    });
                },
            },
            {
                label: "Retry level",
                icon: "o_restart_alt",
                action: async () => {
                    leftDrawerOpen.value = false;
                    const confirm = await userConfirm("Are you sure? You cannot reverse this action.");
                    if (!confirm) return;

                    gameState.resetLevel();
                },
            },
            {
                label: "Victories",
                icon: "o_local_activity",
                action: () => {
                    leftDrawerOpen.value = false;
                    $q.dialog({
                        component: VictoryHistoryScreen,
                        componentProps: {
                            victories: ($q.localStorage.getItem("victories")?.data ?? []).reverse(),
                        },
                    });
                },
            },
        ];

        return {
            settings,
            leftDrawerOpen,
            menuList,
            gameState,
        };
    },
});
</script>
