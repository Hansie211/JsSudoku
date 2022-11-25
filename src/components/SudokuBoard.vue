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
                    :isSelected="selectedCellId === cell.id"
                    :isSquareHighlighted="cell.square.index === selectedCell?.square.index"
                    :isCrossHighlighted="cell.row.index === selectedCell?.row.index || cell.column.index === selectedCell?.column.index"
                    @select="() => onSelectCell(cell.id)"
                    :size="size"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { StructureDefinitions } from "src/lib/sudoku/board";
import PuzzleBoard, { Position } from "src/lib/reactiveSoduku";
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
    emits: ["cellSelected"],
    data() {
        return {
            selectedCellId: null, //this.puzzle.cells[40].id,
        };
    },
    methods: {
        onSelectCell(id) {
            this.selectedCellId = id;
            this.$emit("cellSelected", id);
        },
        getSquareCells(squareIndex) {
            return Array(StructureDefinitions.SIZE)
                .fill(null)
                .map((_, index) => {
                    const [x, y] = StructureDefinitions.squares[squareIndex].get(index);
                    const position = new Position(x, y);
                    const cellIndex = PuzzleBoard.toIndex(position);
                    return this.puzzle.cells[cellIndex];
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
