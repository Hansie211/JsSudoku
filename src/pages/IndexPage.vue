<template>
    <q-page id="page">
        <div style="padding: 10px">
            <sudoku-board ref="sudoku" :puzzle="puzzle" :key="renderKey" size="4.8vw" @cellSelected="cellSelected" />
        </div>
        <div id="bottom-bar" class="flex column full-width">
            <timer ref="timer" v-show="settings.showTime" class="q-pl-sm" />
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
                    <q-btn icon="lightbulb" flat round size="md" @click="clearCell" v-show="settings.showHints" />
                    <q-toggle v-model="noteMode" icon="edit" color="positive" />
                    <q-btn icon="backspace" flat round size="md" @click="clearCell" />
                </div>

                <number-bar :size="9" @click="placeNumber" :activeNumbers="activeNumbers" />
                <!-- <q-icon :color="!selectedCell?.isStatic && !selectedCell?.value.value && selectedCell?.notes.hasValue(value) ? '' : 'transparent'" name="close" class="number-icon q-pa-none q-ma-none" padding="none" size="sm" /> -->
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
import { defineComponent, ref } from "vue";
import PuzzleBoard from "src/lib/reactiveSoduku";
import Timer from "src/components/Timer.vue";
import { useSettingsStore } from "src/stores/settings-store";
import NumberBar from "src/components/NumberBar.vue";
import Memory from "src/lib/memory";

export default defineComponent({
    components: { SudokuBoard, SettingsDialog, Timer, NumberBar },
    name: "IndexPage",
    setup() {
        const settings = useSettingsStore();
        const [solution, board, seed] = getPuzzle(20);
        const puzzle = new PuzzleBoard(board, solution, seed);

        const memory = new Memory();

        return {
            settings,
            memory,
            puzzle,
            noteMode: ref(false),
            renderKey: ref(0),
        };
    },
    data() {
        return {
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

        initNewGame() {
            this.$refs.timer.reset();
            this.memory.clear();
        },
        resetGame() {
            this.puzzle.cells.forEach((cell) => {
                if (cell.isStatic) return;
                cell.value.value = 0;
                cell.notes.values.value.length = 0;
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
                this.puzzle = new PuzzleBoard(board, solution, seed);
                this.renderKey++;
                this.$q.loading.hide();

                this.initNewGame();
            }, 100);
        },

        placeNumber(num) {
            if (!this.canEditSelectedCell()) return;

            if (!this.noteMode) {
                this.memory.store(this.selectedCell.id, this.selectedCell.value, 0);

                if (this.selectedCell.value.value === num) {
                    this.selectedCell.value.value = 0;
                } else {
                    this.selectedCell.value.value = num;
                }
            } else {
                if (this.selectedCell.hasValue()) {
                    this.showError("Cell already filled selected.");
                } else {
                    const hasValue = this.selectedCell.notes.hasValue(num);
                    this.memory.store(this.selectedCell.id, { num: this.selectedCell.value, set: hasValue }, 1);
                    this.selectedCell.notes.swapValue(num);
                }
            }
        },
        clearCell() {
            if (!this.canEditSelectedCell()) return;
            this.selectedCell.value.value = 0;
        },

        cellSelected(id) {
            this.selectedCellId = id;
        },
        undo() {
            if (!this.memory.size) return;

            const move = this.memory.rollBack();
            const cell = this.puzzle.cells.find((cell) => cell.id === move.cellId);

            if (move.mode === 0) {
                cell.value.value = move.value;
            } else {
                const action = move.value.set ? cell.notes.addValue : cell.notes.removeValue;
                action(move.value.num);
            }
        },
    },
    computed: {
        boardSize() {
            return StructureDefinitions.SIZE;
        },
        selectedCellIndex() {
            return this.puzzle.cells.findIndex((x) => x.id === this.selectedCellId);
        },
        selectedCell() {
            return this.selectedCellIndex > -1 ? this.puzzle.cells[this.selectedCellIndex] : null;
        },
        activeNumbers() {
            if (!this.selectedCell) return [];
            if (this.selectedCell.isStatic) return [];
            if (this.selectedCell.value.value) return [];

            return this.selectedCell.notes.values.value;
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
