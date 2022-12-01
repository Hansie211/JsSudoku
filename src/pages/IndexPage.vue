<template>
    <q-page id="page" v-if="gameState.puzzle">
        <div class="q-pt-lg">
            <sudoku-board ref="sudoku" :puzzle="gameState.puzzle" :selectedValue="encircledValue" size="4.7vw" @click="cellClick" @cellUpdated="cellUpdated" />
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
                    <q-space />
                    <q-btn icon="undo" flat round size="md" @click="undo" />
                    <q-btn icon="tips_and_updates" flat round size="md" @click="hint" v-show="settings.showHints" />
                    <q-toggle v-model="noteMode" icon="edit" color="positive" />
                    <q-btn icon="backspace" flat round size="md" @click="clearCell" />
                </div>

                <number-bar :size="9" @click="onTapNumber" :activeNumbers="activeNumbers" :inactiveNumbers="selectCellMode ? inactiveNumbers : []" :completedNumbers="completedNumbers" :selectedNumber="selectNumberMode ? selectedValue : 0" />
            </div>
        </div>
    </q-page>
</template>

<script>
import SudokuBoard from "src/components/SudokuBoard.vue";
import { StructureDefinitions } from "src/lib/sudoku/board";
import { defineComponent } from "vue";
import PuzzleBoard, { Cell } from "src/lib/reactiveSoduku";
import { useSettingsStore } from "src/stores/settings-store";
import { getGameState } from "src/stores/game-store";
import NumberBar from "src/components/NumberBar";
import VictoryScreen from "src/components/VictoryScreen";
import GameStateManager from "src/lib/GameStateManager";
import DifficultyRating from "src/components/DifficultyRating.vue";
import DifficultieLevels from "src/lib/difficulties";

export default defineComponent({
    components: { SudokuBoard, NumberBar, DifficultyRating },
    name: "IndexPage",
    setup() {
        const settings = useSettingsStore();

        return {
            settings,
            /** @type {GameStateManager} */
            gameState: getGameState(),
        };
    },
    created() {
        this.gameState.eventBus.on("victory", (_) => {
            this.showVictory();
        });

        this.gameState.eventBus.on("error", (event) => {
            this.showError(event.message);
        });
    },
    data() {
        return {
            noteMode: false,
            selectedCellId: null,
            numCount: Array(StructureDefinitions.SIZE).fill(0),
            selectedValue: 0,
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

        onTapNumber(num) {
            if (this.selectCellMode) this.placeNumber(num);
            if (this.selectNumberMode) {
                this.selectedValue = this.selectedValue !== num ? num : 0;
            }
        },
        placeNumber(num) {
            if (this.noteMode) this.gameState.placeNote(this.selectedCellId, num);
            else {
                this.gameState.placeNum(this.selectedCellId, num);
            }
        },

        clearCell() {
            this.gameState.clearCell(this.selectedCellId);
        },
        hint() {
            this.gameState.hint();
        },
        cellClick(id) {
            this.selectedCellId = id;

            if (this.selectNumberMode) {
                if (this.selectedValue && !this.selectedCell.isStatic) {
                    this.placeNumber(this.selectedValue);
                }
            }
        },
        cellUpdated(_id, nval, oval) {
            if (nval) this.numCount[nval - 1]++;
            if (oval) this.numCount[oval - 1]--;
        },
        undo() {
            this.gameState.undo();
        },

        initializeSelectCellMode() {
            this.selectedValue = this.selectedCell?.value ?? 0;
        },
        initializeSelectNumberMode() {
            this.selectedValue = 1;
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
            if (!this.settings.markImpossibleNumbers) return [];
            if (!this.selectedCell) return [];

            if (this.selectedCell.isStatic)
                return Array(this.boardSize)
                    .fill(null)
                    .map((_, idx) => idx + 1);

            return PuzzleBoard.getSurroundingValues(this.gameState.puzzle, this.selectedCell);
        },
        puzzleTime() {
            const time = this.gameState.timer.time;
            const s = 0 + (time % 60);
            const m = 0 + Math.floor(time / 60);

            return m.toString().padStart(2, "0") + ":" + s.toString().padStart(2, "0");
        },
        completedNumbers() {
            return this.numCount.map((v, idx) => (v >= StructureDefinitions.SIZE ? idx + 1 : null)).filter((v) => v !== null);
        },
        gameDifficulty() {
            return DifficultieLevels[this.gameState.puzzle?.difficultyLevel ?? 0] ?? DifficultieLevels[0];
        },
        selectCellMode() {
            return !this.settings.placeNumbersOnSelect;
        },
        selectNumberMode() {
            return !this.selectCellMode;
        },
        encircledValue() {
            if (this.selectCellMode) return this.selectedValue;
            if (this.selectedValue) return this.selectedValue;
            return this.selectedCell?.value ?? 0;
        },
    },
    watch: {
        "selectedCell.value"() {
            if (this.selectCellMode) this.selectedValue = this.selectedCell.value;
        },
        selectCellMode: {
            handler(nval) {
                if (nval === true) this.initializeSelectCellMode();
            },
            immediate: true,
        },
        selectNumberMode: {
            handler(nval) {
                if (nval === true) this.initializeSelectNumberMode();
            },
            immediate: true,
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
