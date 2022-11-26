import { ref } from "vue";
import Board, { Column, Square, StructureDefinitions } from "./sudoku/board";

export class Position {
    /** @type {Number} */
    _x;
    /** @type {Number} */
    _y;

    /** @returns {Number} */
    get x() {
        return this._x;
    }

    /** @returns {Number} */
    get y() {
        return this._y;
    }

    /**
     * @param {Number} x
     * @param {Number} y
     */
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }
}

export class Notes {
    /** @type {Cell} */
    cell;

    /** @type {ref<Array<Number>>} */
    values;

    /**
     * @param {Number} num
     * @returns {Boolean}
     */
    hasValue(num) {
        return this.values.value.includes(num);
    }

    /**
     * @param {Number} num
     */
    addValue(num) {
        if (this.hasValue(num)) return;
        this.values.value.push(num);
    }

    /**
     * @param {Number} num
     */
    removeValue(num) {
        const index = this.values.value.indexOf(num);
        if (index < 0) return;
        this.values.value.splice(index, 1);
    }

    /**
     * @param {Number} num
     */
    swapValue(num) {
        if (this.hasValue(num)) {
            this.removeValue(num);
        } else {
            this.addValue(num);
        }
    }

    /**
     * @param {Cell} cell
     */
    constructor(cell) {
        this.values = ref([]);
        this.cell = cell;

        this.hasValue = this.hasValue.bind(this);
        this.addValue = this.addValue.bind(this);
        this.removeValue = this.removeValue.bind(this);
        this.swapValue = this.swapValue.bind(this);
    }
}

export class Cell {
    /**
     * @param {Cell} cell
     */
    static #setPositions(cell) {
        cell._row = StructureDefinitions.rows[cell.position.y];
        cell._column = StructureDefinitions.columns[cell.position.x];

        cell._square = StructureDefinitions.squares[Math.floor(cell.position.x / StructureDefinitions.BASE_NUMBER) + Math.floor(cell.position.y / StructureDefinitions.BASE_NUMBER) * StructureDefinitions.BASE_NUMBER];
    }

    /** @type {ref<Number>} */
    value;

    /** @type {Position} */
    _position;

    /** @type {Boolean} */
    _isStatic;

    /** @type {Row} */
    _row;

    /** @type {Column} */
    _column;

    /** @type {Square} */
    _square;

    /** @type {Notes} */
    notes;

    /** @returns {Position} */
    get position() {
        return this._position;
    }

    /** @returns {Boolean} */
    get isStatic() {
        return this._isStatic;
    }

    /** @returns {Row} */
    get row() {
        return this._row;
    }

    /** @returns {Column} */
    get column() {
        return this._column;
    }

    /** @returns {Square} */
    get square() {
        return this._square;
    }

    // /** @returns {PuzzleBoard} */
    // get puzzle() {
    //     return this._puzzle;
    // }

    /** @returns {Number} */
    get id() {
        return this.position.x + this.position.y * StructureDefinitions.SIZE + 1;
    }

    /** @returns {Boolean} */
    hasValue() {
        return this.value.value > 0;
    }

    /**
     * @param {Position} position
     * @param {Number} initialValue
     */
    constructor(position, initialValue) {
        this._position = position;
        this.value = ref(initialValue);
        this.notes = new Notes(this);

        this._isStatic = this.hasValue();

        this.hasValue = this.hasValue.bind(this);

        Cell.#setPositions(this);
    }
}

export default class PuzzleBoard {
    /** @type {Array<Cell>} */
    cells;

    /** @type {Array<Number} */
    solution;

    /** @type {Number} */
    hintCount;

    /**
     * @param {PuzzleBoard} puzzle
     * @returns {String}
     */
    static serialize(puzzle) {
        const obj = {
            cells: puzzle.cells.map((cell) => {
                return {
                    value: cell.value.value,
                    x: cell.position.x,
                    y: cell.position.y,
                    notes: cell.notes.values.value,
                    static: cell.isStatic,
                };
            }),
            solution: puzzle.solution,
            hintCount: puzzle.hintCount.value,
        };

        return JSON.stringify(obj);
    }

    /**
     * @param {String} puzzle
     * @returns {PuzzleBoard}
     */
    static deserialize(str) {
        const obj = JSON.parse(str);
        const result = Object.create(PuzzleBoard.prototype, {
            cells: obj.cells.map((info) => {
                const pos = new Position(info.x, info.y);
                const cell = new Cell(pos, info.static ? info.value : 0);
                if (!info.static) cell.value.value = info.value;

                cell.notes.values.value = info.notes;

                return cell;
            }),

            solution: obj.solution,
            hintCount: ref(obj.hintCount),
        });

        return result;
    }

    /**
     * @param {Position} position
     * @returns {Number}
     */
    static toIndex(position) {
        return position.x + position.y * StructureDefinitions.SIZE;
    }

    /**
     * @param {Position} position
     * @returns {Cell}
     */
    getCell(position) {
        const index = PuzzleBoard.toIndex(position);
        return this.cells[index];
    }

    /**
     * @param {Position} position
     * @returns {Number}
     */
    getSolutionValue(position) {
        const index = PuzzleBoard.toIndex(position);
        return this.solution[index];
    }

    /**
     * @param {Number} id
     * @returns {Cell}
     */
    findCellById(id) {
        if (!id) return undefined;
        return this.cells.find((cell) => cell.id === id);
    }

    /**
     * @param {Board} board
     * @param {Board} solution
     * @param {Number} seed
     */
    constructor(board, solution, seed) {
        this.cells = [];
        this.solution = [];
        this.seed = seed;
        this.hintCount = ref(0);

        for (var x = 0; x < StructureDefinitions.SIZE; x++) {
            for (var y = 0; y < StructureDefinitions.SIZE; y++) {
                const solutionValue = solution.getCell(x, y);
                const boardValue = board.getCell(x, y);

                const position = new Position(x, y);
                const index = PuzzleBoard.toIndex(position);

                this.solution[index] = solutionValue;

                const cell = new Cell(position, boardValue);
                this.cells[index] = cell;
            }
        }
    }
}
