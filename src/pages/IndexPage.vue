<template>
    <q-page id="page">
        <div style="padding: 10px">
            <sudoku-board ref="sudoku" :puzzle="puzzle" :key="renderKey" size="4.8vw" @cellSelected="cellSelected" />
        </div>
        <div id="bottom-bar" class="flex column full-width">
            <timer v-show="settings.showTime" class="q-pl-sm" />
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
import { getPuzzle, getPuzzleAsync } from "src/lib/sudoku/sudoku";
import { defineComponent, ref } from "vue";
import PuzzleBoard from "src/lib/reactiveSoduku";
import Timer from "src/components/Timer.vue";
import { useSettingsStore } from "src/stores/settings-store";
import NumberBar from "src/components/NumberBar.vue";

export default defineComponent({
    components: { SudokuBoard, SettingsDialog, Timer, NumberBar },
    name: "IndexPage",
    setup() {
        const settings = useSettingsStore();
        const [solution, board, seed] = getPuzzle(20);
        const puzzle = new PuzzleBoard(board, solution, seed);

        return {
            settings,
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
        resetGame() {
            this.puzzle.cells.forEach((cell) => {
                if (cell.isStatic) return;
                cell.value.value = 0;
                cell.notes.values.value.length = 0;
            });
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
            this.$nextTick(() => {
                window.setTimeout(() => {
                    const [solution, board, seed] = getPuzzle(squareCount, levelInfo.seed);
                    this.puzzle = new PuzzleBoard(board, solution, seed);
                    this.renderKey++;
                    this.$q.loading.hide();
                }, 100);
            });
        },
        canEditSelectedCell() {
            if (!this.selectedCell) {
                this.$q.notify({
                    message: "No cell selected.",
                    group: false,
                    type: "negative",
                    timeout: 1000,
                    actions: [{ icon: "close", color: "white" }],
                });
                return false;
            }

            if (this.selectedCell.isStatic) {
                this.$q.notify({
                    message: "Cannot edit this cell.",
                    group: false,
                    type: "negative",
                    timeout: 1000,
                    actions: [{ icon: "close", color: "white" }],
                });
                return false;
            }

            return true;
        },
        placeNumber(num) {
            if (!this.canEditSelectedCell()) return;

            if (!this.noteMode) {
                if (this.selectedCell.value.value === num) {
                    this.selectedCell.value.value = 0;
                } else {
                    this.selectedCell.value.value = num;
                }
            } else {
                if (this.selectedCell.hasValue()) {
                    this.$q.notify({
                        message: "Cell already filled selected.",
                        group: false,
                        type: "negative",
                        timeout: 1000,
                        actions: [{ icon: "close", color: "white" }],
                    });
                } else {
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
