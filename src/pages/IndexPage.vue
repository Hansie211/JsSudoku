<template>
    <q-page id="page" v-if="puzzle">
        <div style="padding: 10px">
            <sudoku-board ref="sudoku" :puzzle="puzzle" :key="renderKey" size="4.8vw" @cellSelected="cellSelected" />
        </div>
        <div id="bottom-bar" class="flex column full-width">
            <div id="info-bar" class="flex row full-width q-px-sm">
                <timer ref="timer" :initialValue="initalTime" v-show="settings.showTime" class="text-caption flex-center" />
                <q-space />
                <div class="text-caption q-mr-sm flex flex-center"><q-icon v-for="x in puzzle.difficultyLevel + 1" :key="x" name="star" color="yellow" /></div>
                <div class="text-caption flex-center">Hints {{ hintCount }}</div>
            </div>
            <div id="action-bar" class="full-width">
                <div id="mode-bar" class="row q-pa-sm">
                    <q-btn
                        icon="settings"
                        round
                        flat
                        size="md"
                        @click="
                            () => {
                                showSettings = true;
                            }
                        "
                    />
                    <q-space />
                    <q-btn icon="undo" flat round size="md" @click="undo" />
                    <q-btn icon="lightbulb" flat round size="md" @click="hint" v-show="settings.showHints" />
                    <q-toggle v-model="noteMode" icon="edit" color="positive" />
                    <q-btn icon="backspace" flat round size="md" @click="clearCell" />
                </div>

                <number-bar :size="9" @click="placeNumber" :activeNumbers="activeNumbers" />
            </div>
        </div>
        <settings-dialog v-model="showSettings" :puzzle="puzzle" @resetGame="resetGame" @newLevel="newLevel" />
    </q-page>
</template>

<script>
import SudokuBoard from "src/components/SudokuBoard.vue";
import SettingsDialog from "src/components/SettingsDialog.vue";
import { StructureDefinitions } from "src/lib/sudoku/board";
import { getPuzzle } from "src/lib/sudoku/sudoku";
import { defineComponent, reactive, ref } from "vue";
import PuzzleBoard, { Cell } from "src/lib/reactiveSoduku";
import Timer from "src/components/Timer.vue";
import { useSettingsStore } from "src/stores/settings-store";
import NumberBar from "src/components/NumberBar.vue";
import Memory from "src/lib/memory";
import VictoryScreen from "src/components/VictoryScreen.vue";
import { SaveManager, Savestate } from "src/lib/savegame";

export default defineComponent({
    components: { SudokuBoard, SettingsDialog, Timer, NumberBar },
    name: "IndexPage",
    setup() {
        const settings = useSettingsStore();
        const saveManager = new SaveManager("game");

        return {
            settings,
            saveManager,
            renderKey: ref(0),
            /** @type {PuzzleBoard} */
            puzzle: reactive(null),
            initalTime: ref(0),
            hintCount: ref(0),
            /** @type {Memory} */
            memory: null,
        };
    },
    created() {
        this.saveManager.states.push(
            new Savestate(
                "puzzle",
                () => this.puzzle,
                (v) => (this.puzzle = v),
                () => {
                    const [solution, board, seed] = getPuzzle(20);
                    const puzzle = PuzzleBoard.fromBoard(board, solution, seed);
                    puzzle.difficultyLevel = 0;
                    return puzzle;
                },
                PuzzleBoard.serialize,
                PuzzleBoard.deserialize
            ),
            new Savestate(
                "time",
                () => this.initalTime,
                (v) => (this.initalTime = v),
                () => 0
            ),
            new Savestate(
                "hintCount",
                () => this.hintCount,
                (v) => (this.hintCount = v),
                () => 0
            ),
            new Savestate(
                "memory",
                () => this.memory,
                (v) => (this.memory = v),
                () => new Memory(),
                Memory.serialize,
                Memory.deserialize
            )
        );

        this.saveManager.load();
    },
    data() {
        return {
            noteMode: false,
            selectedCellId: null,
            showSettings: false,
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
        canEditSelectedCell() {
            if (!this.selectedCell) {
                this.showError("No cell selected.");
                return false;
            }

            if (this.selectedCell.isStatic) {
                this.showError("Cannot edit this cell.");
                return false;
            }

            return true;
        },

        saveGameState() {
            this.saveManager.save();
        },
        isVictory() {
            return this.puzzle.cells.reduce((state, cell, idx) => state && this.puzzle.solution[idx] === cell.value, true);
        },
        showVictory() {
            if (!this.isVictory()) return;

            const time = this.$refs.timer.getTime();

            const victories = this.$q.localStorage.getItem("victories")?.data ?? [];
            victories.push({
                level: this.puzzle.seed,
                time: time,
                hintCount: this.hintCount,
                difficultyLevel: this.puzzle.difficultyLevel,
            });
            this.$q.localStorage.set("victories", { data: victories });

            this.$q
                .dialog({
                    component: VictoryScreen,
                    componentProps: {
                        puzzle: this.puzzle,
                        time: this.$refs.timer.getTime(),
                        hintCount: this.hintCount,
                    },
                })
                .onOk(this.newLevel);
        },
        /**
         * @param {Number} cellId
         * @param {Number} value
         * @param {Boolean} isNote
         * @param {Boolean} isHint
         * @returns {Object}
         */
        createState(cellId, value, isNote, isHint) {
            return {
                cellId,
                value,
                isNote: isNote === true,
                isHint: isHint === true,
            };
        },

        initNewGame() {
            this.$refs.timer.reset();
            this.memory.clear();
            this.hintCount = 0;

            this.saveGameState();
        },
        resetGame() {
            this.puzzle.cells.forEach((cell) => {
                if (cell.isStatic) return;
                cell.value = 0;
                cell.notes.values.length = 0;
            });

            this.initNewGame();
        },
        newLevel(levelInfo) {
            const emptySquares = {
                0: 16,
                1: 32,
                2: 48,
                3: 64,
            };

            const squareCount = emptySquares[levelInfo.level.toString()];

            this.$q.loading.show({
                message: "Generating level...",
                delay: 1,
            });

            window.setTimeout(() => {
                const [solution, board, seed] = getPuzzle(squareCount, levelInfo.seed);
                this.puzzle = PuzzleBoard.fromBoard(board, solution, seed);
                this.puzzle.difficultyLevel = levelInfo.level;
                this.renderKey++;
                this.$q.loading.hide();

                this.initNewGame();
            }, 100);
        },

        placeNumber(num) {
            if (!this.canEditSelectedCell()) return;

            if (!this.noteMode) {
                const state = this.createState(this.selectedCellId, this.selectedCell.value, false, false);
                this.memory.store(state);

                if (this.selectedCell.value === num) {
                    this.selectedCell.value = 0;
                } else {
                    this.selectedCell.value = num;
                    this.showVictory();
                }

                this.saveGameState();
            } else {
                if (this.selectedCell.hasValue()) {
                    this.showError("Cell already filled selected.");
                } else {
                    const state = this.createState(this.selectedCellId, this.selectedCell.notes.values, true, false);
                    this.memory.store(state);

                    this.selectedCell.notes.swapValue(num);

                    this.saveGameState();
                }
            }
        },
        clearCell() {
            if (!this.canEditSelectedCell()) return;

            const clearNotes = !this.selectedCell.hasValue();
            if (clearNotes && !this.selectedCell.notes.values.length) return;

            switch (clearNotes) {
                case true: {
                    const state = this.createState(this.selectedCellId, this.selectedCell.notes.values, true, false);
                    this.memory.store(state);

                    this.selectedCell.notes.clear();
                    break;
                }
                case false: {
                    const state = this.createState(this.selectedCellId, this.selectedCell.value, false, false);
                    this.memory.store(state);

                    this.selectedCell.value = 0;
                }
            }

            this.saveGameState();
        },
        hint() {
            const nextOpenCell = this.puzzle.cells.find((cell) => !cell.value);
            if (!nextOpenCell) return;

            const soltionValue = this.puzzle.solution[PuzzleBoard.toIndex(nextOpenCell.position)];

            const state = this.createState(nextOpenCell.id, 0, false, true);
            this.memory.store(state);

            nextOpenCell.value = soltionValue;
            this.hintCount++;

            this.showVictory();

            this.saveGameState();
        },
        cellSelected(id) {
            this.selectedCellId = id;
        },
        undo() {
            if (!this.memory.size) return;

            const states = this.memory.rollBack();

            states.forEach((state) => {
                const cell = this.puzzle.findCellById(state.cellId);
                const value = state.value;
                switch (state.isNote) {
                    case false: {
                        cell.value = value;
                        break;
                    }
                    case true: {
                        cell.notes.set(value);
                        break;
                    }
                }

                if (state.isHint) this.hintCount--;
            });

            this.saveGameState();
        },
    },
    computed: {
        boardSize() {
            return StructureDefinitions.SIZE;
        },
        // selectedCellIndex() {
        //     return -1; //this.puzzle.cells.findIndex((x) => x.id === this.selectedCellId);
        // },
        /** @returns {Cell} */
        selectedCell() {
            return this.puzzle.findCellById(this.selectedCellId);
        },
        activeNumbers() {
            if (!this.selectedCell) return [];
            if (this.selectedCell.isStatic) return [];
            if (this.selectedCell.value) return [];

            return this.selectedCell.notes.values;
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

    height: 200px;
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
