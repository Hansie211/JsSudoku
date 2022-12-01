<template>
    <div class="cell" :class="classObject">
        <div id="tap-selector" @click="() => $emit('click')"></div>
        <template v-if="cell.hasValue()">
            <div id="circle"></div>
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
    emits: ["click", "update"],
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
        isSquareSelected: {
            type: Boolean,
            default: false,
        },
        isRowSelected: {
            type: Boolean,
            default: false,
        },
        isColumnSelected: {
            type: Boolean,
            default: false,
        },
        isValueSelected: {
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
        classObject() {
            return {
                static: this.cell.isStatic,
                selected: this.isSelected,
                "row-selected": this.isRowSelected,
                "column-selected": this.isColumnSelected,
                "square-selected": this.isSquareSelected,
                "value-selected": this.isValueSelected,
                error: this.settings.showErrors && this.isError,
            };
        },
        boardSize() {
            return StructureDefinitions.SIZE;
        },
        isError() {
            return this.cell.hasValue() && this.cell.value !== this.puzzle.getSolutionValue({ position: this.cell.position });
        },
        notes() {
            return Array(this.boardSize)
                .fill(null)
                .map((_, index) => this.cell.notes.hasValue(index + 1));
        },
    },
    watch: {
        "cell.value": {
            handler(value, oldValue) {
                this.$emit("update", ...[value, oldValue]);
            },
            immediate: true,
        },
    },
});
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Brush+Script&display=swap");

@font-face {
    font-family: "Nanum Brush Script";
    font-style: normal;
    font-weight: 400;
    src: url("~assets/fonts/NanumBrushScript-Regular.ttf");
    src: local(""), url("~assets/fonts/NanumBrushScript-Regular.woff2") format("woff2"), url("~assets/fonts/NanumBrushScript-Regular.woff2") format("woff"), url("~assets/fonts/NanumBrushScript-Regular.ttf") format("truetype");
}

.cell {
    --area-selected: #ddd;
    --overlap-selected: #bbb;
    --cell-selected: #999;
}

.cell {
    position: relative;

    height: 2.1em;
    width: 2.1em;
    font-size: v-bind(size);

    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.cell:not(.static) > span {
    font-weight: 100;
    font-size: 2.5em;
    color: #020b4a;
    font-family: "Nanum Brush Script", cursive;
}

.cell.static {
    font-weight: 750;
    font-family: unset;
}
.value-selected:not(.selected) > #circle {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid black;
    border-radius: 100%;
    margin: 0.1em;
    opacity: 0.3;
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
    font-size: 0.6em;
    line-height: 1em;
}

#notes > div {
    text-align: center;
}

.selected {
    background-color: var(--cell-selected) !important;
}

.square-selected,
.row-selected,
.column-selected {
    background-color: var(--area-selected);
}

.square-selected.row-selected,
.square-selected.column-selected {
    background-color: var(--overlap-selected);
}

#tap-selector {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;

    margin: 5%;
    cursor: pointer;
}
</style>
