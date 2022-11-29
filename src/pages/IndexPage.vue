<template>
    <q-page id="page" v-if="gameState.puzzle">
        <div>
            <sudoku-board ref="sudoku" :puzzle="gameState.puzzle" :key="renderKey" size="4.7vw" @cellSelected="cellSelected" />
        </div>
        <div id="bottom-bar" class="flex column full-width">
            <div id="info-bar" class="flex row full-width q-px-sm">
                <div v-show="settings.showTime">{{ puzzleTime }}</div>
                <q-space />
                <div class="text-caption q-mr-sm flex flex-center"><difficulty-rating :level="gameDifficulty.level" /></div>
                <div class="text-caption flex-center">Hints {{ gameState.hintCount }}</div>
            </div>
            <div id="action-bar" class="full-width">
                <div id="mode-bar" class="row q-pa-sm">
                    <q-btn icon="settings" round flat size="md" @click="showSettings" />
                    <q-space />
                    <q-btn icon="undo" flat round size="md" @click="undo" />
                    <q-btn icon="tips_and_updates" flat round size="md" @click="hint" v-show="settings.showHints" />
                    <q-toggle v-model="noteMode" icon="edit" color="positive" />
                    <q-btn icon="backspace" flat round size="md" @click="clearCell" />
                </div>

                <number-bar :size="9" @click="placeNumber" :activeNumbers="activeNumbers" :inactiveNumbers="inactiveNumbers" />
            </div>
        </div>
    </q-page>
</template>

<script>
import SudokuBoard from "src/components/SudokuBoard.vue";
import SettingsScreen from "src/components/SettingsScreen";
import { BoardStructure, StructureDefinitions } from "src/lib/sudoku/board";
import { defineComponent, reactive, ref, toRef } from "vue";
import PuzzleBoard, { Cell } from "src/lib/reactiveSoduku";
import { useSettingsStore } from "src/stores/settings-store";
import NumberBar from "src/components/NumberBar";
import VictoryScreen from "src/components/VictoryScreen";
import GameStateManager from "src/lib/GameStateManager";
import DifficultyRating from "src/components/DifficultyRating.vue";
import Difficulty from "src/data/difficulty.json";

export default defineComponent({
    components: { SudokuBoard, NumberBar, DifficultyRating },
    name: "IndexPage",
    setup() {
        const settings = useSettingsStore();
        const gameState = reactive(new GameStateManager());

        return {
            settings,
            /** @type {GameStateManager} */
            gameState,
            renderKey: ref(0),
        };
    },
    created() {
        this.gameState.saveManager.load();

        this.gameState.eventBus.on("victory", (event) => {
            this.showVictory();
        });

        this.gameState.eventBus.on("error", (event) => {
            this.showError(event.message);
        });

        this.gameState.timer.start();
    },
    data() {
        return {
            noteMode: false,
            selectedCellId: null,
        };
    },
    methods: {
        showError(text) {
            this.$q.notify({
                message: text,
                group: false,
                type: "negative",
                timeout: 1000,
                actions: [{ icon: "close", color: "white" }],
            });
        },
        showVictory() {
            const time = this.gameState.timer.time;

            const victories = this.$q.localStorage.getItem("victories")?.data ?? [];
            victories.push({
                level: this.gameState.puzzle.seed,
                time: time,
                hintCount: this.gameState.hintCount,
                difficultyLevel: this.gameState.puzzle.difficultyLevel,
            });
            this.$q.localStorage.set("victories", { data: victories });

            this.$q
                .dialog({
                    component: VictoryScreen,
                    componentProps: {
                        puzzle: this.gameState.puzzle,
                        time: time,
                        hintCount: this.gameState.hintCount,
                    },
                })
                .onOk(async (info) => {
                    await this.generateLevel(info.difficultyLevel, info.seed);
                });
        },
        async generateLevel(difficultyLevel, seed) {
            this.$q.loading.show({ message: "Generating level...", delay: 1 });

            await this.gameState.newLevel(difficultyLevel, seed);

            this.$q.loading.hide();
        },
        showSettings() {
            this.gameState.timer.paused = true;
            this.$q
                .dialog({
                    component: SettingsScreen,
                    componentProps: {
                        currentLevel: this.gameState.puzzle.seed,
                        difficulty: this.gameDifficulty,
                    },
                })
                .onOk(async (action) => {
                    switch (action.name) {
                        case "new-level":
                            await this.generateLevel(action.data.difficultyLevel, action.data.seed);
                            break;
                        case "reset-level":
                            this.gameState.resetLevel();
                            break;
                    }
                })
                .onDismiss(() => {
                    this.gameState.timer.paused = false;
                });
        },

        placeNumber(num) {
            if (this.noteMode) this.gameState.placeNote(this.selectedCellId, num);
            else this.gameState.placeNum(this.selectedCellId, num);
        },

        clearCell() {
            this.gameState.clearCell(this.selectedCellId);
        },
        hint() {
            this.gameState.hint();
        },
        cellSelected(id) {
            this.selectedCellId = id;
        },
        undo() {
            this.gameState.undo();
        },
    },
    computed: {
        boardSize() {
            return StructureDefinitions.SIZE;
        },
        /** @returns {Cell} */
        selectedCell() {
            return this.gameState.puzzle.findCellById(this.selectedCellId);
        },
        activeNumbers() {
            if (!this.selectedCell) return [];
            if (this.selectedCell.isStatic) return [];
            if (this.selectedCell.value) return [];

            return this.selectedCell.notes.values;
        },
        inactiveNumbers() {
            if (!this.selectedCell) return [];
            if (!this.settings.markImpossibleNumbers) return [];

            if (this.selectedCell.isStatic)
                return Array(this.boardSize)
                    .fill(null)
                    .map((_, idx) => idx + 1);

            const getVal = (x, y) => this.gameState.puzzle.getCell({ x, y }).value;

            const strucs = [this.selectedCell.row, this.selectedCell.column, this.selectedCell.square];
            const values = strucs
                .map((struct) =>
                    Array(this.boardSize)
                        .fill(null)
                        .map((_, idx) => getVal(...struct.get(idx)))
                        .filter((v) => v > 0)
                )
                .reduce((arr, curr) => arr.concat(curr), [])
                .filter((item, index, arr) => arr.indexOf(item) === index);

            return values;
        },
        puzzleTime() {
            const time = this.gameState.timer.time;
            const s = 0 + (time % 60);
            const m = 0 + Math.floor(time / 60);

            return m.toString().padStart(2, "0") + ":" + s.toString().padStart(2, "0");
        },
        gameDifficulty() {
            return Difficulty.find((x) => x.level === this.gameState.puzzle?.difficultyLevel) || Difficulty[0];
        },
    },
});
</script>
<style scoped>
#page {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

#action-bar {
    background-color: var(--q-accent);

    height: 230px;
    flex-grow: 0;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;

    color: white;
}

#mode-bar {
    flex-grow: 0;
    flex-shrink: 0;
}
</style>
