<template>
    <div
        class="cell"
        :class="{ static: cell.isStatic, selected: isSelected, 'square-highlight': !isSelected && isSquareHighlighted, 'cross-highlight': !isSelected && isCrossHighlighted, error: settings.showErrors && isError }"
        @click="
            () => {
                if (!isSelected) $emit('select', x, y);
            }
        "
    >
        <template v-if="cell.value !== 0">
            <template v-if="cell.isStatic">
                {{ cell.value }}
            </template>
            <template v-else>
                <span>{{ cell.value }}</span>
            </template>
        </template>
        <template v-else>
            <div id="notes">
                <div v-for="(set, index) in notes" :key="index" class="note">
                    {{ set ? index + 1 : "" }}
                </div>
            </div>
        </template>
    </div>
</template>
<script>
import { StructureDefinitions } from "src/lib/sudoku/board";
import PuzzleBoard, { Cell } from "src/lib/reactiveSoduku";
import { defineComponent } from "vue";
import { useSettingsStore } from "src/stores/settings-store";

export default defineComponent({
    name: "SudokuCell",
    emits: ["select"],
    props: {
        puzzle: {
            type: PuzzleBoard,
            required: true,
        },
        cell: {
            type: Cell,
            required: true,
        },
        isSelected: {
            type: Boolean,
            default: false,
        },
        isSquareHighlighted: {
            type: Boolean,
            default: false,
        },
        isCrossHighlighted: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String,
            default: "1.0em",
        },
    },
    setup() {
        const settings = useSettingsStore();
        return {
            settings,
        };
    },
    computed: {
        boardSize() {
            return StructureDefinitions.SIZE;
        },
        isError() {
            return this.cell.value > 0 && this.cell.value !== this.puzzle.getSolutionValue(this.cell.position);
        },
        notes() {
            return Array(this.boardSize)
                .fill(null)
                .map((_, index) => this.cell.notes.hasValue(index + 1));
        },
    },
    watch: {},
});
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Brush+Script&display=swap");
.cell {
    height: 2.1em;
    width: 2.1em;
    font-size: v-bind(size);
    font-weight: v-bind(weight);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;

    cursor: pointer;

    border: 0.1em solid transparent;

    position: relative;

    font-family: "Nanum Brush Script", cursive;
}

.cell:not(.static) > span {
    font-weight: 100;
    font-size: 2.5em;
    color: #020b4a;
}

.cell.static {
    font-weight: 750;
    font-family: unset;
}

.error > span {
    color: var(--q-negative) !important;
}

#notes {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 1px;
    font-size: 0.65em;
    line-height: 1em;
    font-style: italic;
}

#notes > div {
    text-align: center;
}

.cell:hover {
    border-color: #444;
}

.selected {
    background-color: #999;
}

.square-highlight,
.cross-highlight {
    background-color: #ddd;
}

.square-highlight.cross-highlight {
    background-color: #bbb;
}
</style>
