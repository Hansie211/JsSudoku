import { _ } from "core-js";
import Board, { BoardStructure, StructureDefinitions } from "./board";
import IdSupplier from "./idSupplier";
import List from "./snapshots";

export default class Notebook {
    /** @type {Array<List<Boolean>>} */
    cellnotes;

    /**
     * @param {Board} board
     * @param {Number} x
     * @param {Number} y
     * @returns {List<Boolean>}
     */
    static #initCellNote(board, x, y) {
        /** @type {List<Boolean>} */
        const options = new List();
        if (board.getCell(x, y)) return options;

        for (var i = 0; i < StructureDefinitions.SIZE; i++) {
            const structs = [StructureDefinitions.getRow(x, y), StructureDefinitions.getColumn(x, y), StructureDefinitions.getSquare(x, y)];

            const num = i + 1;
            const canPlace = structs.reduce((canPlace, struct) => canPlace && !BoardStructure.includesValue(board, struct, num), true);

            options.set(i, canPlace);
        }

        return options;
    }

    /**
     * @param {List<Boolean>} notes
     * @returns {Number}
     */
    static getOptionCount(notes) {
        var sum = 0;
        for (var i = 0; i < StructureDefinitions.SIZE; i++) if (notes.get(i)) sum++;

        return sum;
    }

    /**
     * @param {List<Boolean>} notes
     * @returns {Array<Number>}
     */
    static getOptionValues(notes) {
        const result = [];
        for (var i = 0; i < StructureDefinitions.SIZE; i++) if (notes.get(i)) result.push(i + 1);

        return result;
    }

    /**
     * @returns {Array<Number>}
     */
    getCellWithLeastOptions() {
        var lowest = StructureDefinitions.SIZE + 1;
        var result = null;

        for (var y = 0; y < StructureDefinitions.SIZE; y++) {
            for (var x = 0; x < StructureDefinitions.SIZE; x++) {
                if (this.board.getCell(x, y)) continue;

                const notes = this.getNotesForCell(x, y);
                const count = Notebook.getOptionCount(notes);

                if (count === 2) return [x, y];
                if (count < lowest) {
                    result = [x, y];
                    lowest = count;
                }
            }
        }

        return result;
    }

    /**
     * @param {Number} x
     * @param {Number} y
     * @returns {List<Boolean>}
     */
    getNotesForCell(x, y) {
        return this.cellnotes[x + y * StructureDefinitions.SIZE];
    }

    setup() {
        for (var y = 0; y < StructureDefinitions.SIZE; y++) {
            for (var x = 0; x < StructureDefinitions.SIZE; x++) {
                this.cellnotes.push(Notebook.#initCellNote(this.board, x, y));
            }
        }
    }

    /**
     * @param {Board} board
     * @returns {Notebook}
     */
    clone(board) {
        const result = new Notebook(board);
        result.cellnotes = this.cellnotes.map((note) => note.clone());

        return result;
    }

    /**
     * @param {Board} board
     * @returns {Notebook}
     */
    static fromBoard(board) {
        const result = new Notebook(board);
        result.setup();

        return result;
    }

    /**
     * @param {Board} board
     */
    constructor(board) {
        this.id = IdSupplier.getId();
        this.cellnotes = [];
        this.board = board;
    }
}
