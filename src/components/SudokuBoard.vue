<template>
    <div>
        <div class="text-h6">Sudoku #{{ puzzle.seed }}</div>
        <div id="board">
            <div v-for="(_, squareIndex) in boardSize" :key="squareIndex" class="square">
                <sudoku-cell
                    v-for="cell in getSquareCells(squareIndex)"
                    :key="cell.id"
                    :puzzle="puzzle"
                    :cell="cell"
                    :isRowSelected="selectedCell?.row.index === cell.row.index"
                    :isColumnSelected="selectedCell?.column.index === cell.column.index"
                    :isSquareSelected="selectedCell?.square.index === cell.square.index"
                    :isSelected="selectedCellId === cell.id"
                    :isValueSelected="cell.hasValue() && selectedValue === cell.value"
                    @click="() => onCellClick(cell.id)"
                    @update="(v, o) => $emit('cellUpdated', ...[cell.id, v, o])"
                    :size="size"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { StructureDefinitions } from "src/lib/sudoku/board";
import PuzzleBoard from "src/lib/reactiveSoduku";
import { defineComponent } from "vue";
import SudokuCell from "./SudokuCell.vue";

export default defineComponent({
    components: { SudokuCell },
    name: "SodukuBoard",
    props: {
        puzzle: {
            type: PuzzleBoard,
            required: true,
        },
        size: {
            type: String,
            default: "1.0em",
        },
    },
    emits: ["click", "cellUpdated"],
    data() {
        return {
            selectedCellId: null, //this.puzzle.cells[40].id,
        };
    },
    methods: {
        onCellClick(id) {
            this.selectedCellId = id;
            this.$emit("click", id);
        },
        getSquareCells(squareIndex) {
            return Array(StructureDefinitions.SIZE)
                .fill(null)
                .map((_, index) => {
                    const [x, y] = StructureDefinitions.squares[squareIndex].get(index);
                    return this.puzzle.getCell({ x, y });
                });
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
    },
});
</script>

<style scoped>
#board {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-column-gap: 5px;
    grid-row-gap: 5px;

    padding: 5px;

    background-color: black;
}

.square {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-column-gap: 1px;
    grid-row-gap: 1px;
}
</style>
