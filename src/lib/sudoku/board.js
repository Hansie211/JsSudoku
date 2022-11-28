import IdSupplier from "./idSupplier";
import { RNG, shuffleList } from "./RNG";
import List from "./snapshots";

export class BoardStructure {
    /** @type {Number} */
    index;

    /**
     * @param {Board} board
     * @param {BoardStructure} struct
     * @param {Number} index
     * @returns {Number}
     */
    static getValue(board, struct, index) {
        const [x, y] = struct.get(index);
        return board.getCell(x, y);
    }

    /**
     * @param {Board} board
     * @param {BoardStructure} struct
     * @param {Number} index
     * @param {Number} value
     */
    static setValue(board, struct, index, value) {
        const [x, y] = struct.get(index);
        board.setCell(x, y, value);
    }

    /**
     * @param {Board} board
     * @param {BoardStructure} struct
     * @returns {Boolean}
     */
    static isValid(board, struct) {
        const numbers = [];
        for (var i = 0; i < StructureDefinitions.SIZE; i++) {
            const value = BoardStructure.getValue(board, struct, i);
            if (!value) return false;

            const index = value - 1;
            if (numbers[index] !== undefined) return false;
            numbers[index] = true;
        }

        return true;
    }

    /**
     * @param {Board} board
     * @param {BoardStructure} struct
     * @param {Number} value
     * @returns {Boolean}
     */
    static includesValue(board, struct, value) {
        for (var i = 0; i < StructureDefinitions.SIZE; i++) {
            const boardValue = BoardStructure.getValue(board, struct, i);
            if (boardValue === value) return true;
        }

        return false;
    }

    /**
     * @param {Number} position
     * @returns {Array<Number>}
     */
    get(position) {}

    /**
     * @param {Number} index
     */
    constructor(index) {
        this.id = IdSupplier.getId();
        this.index = index;
    }
}

export class Column extends BoardStructure {
    type = "col";

    /**
     * @param {Number} position
     * @returns {Array<Number>}
     */
    get(position) {
        const x = this.index;
        const y = position;

        return [x, y];
    }
}

export class Row extends BoardStructure {
    type = "row";
    /**
     * @param {Number} position
     * @returns {Array<Number>}
     */
    get(position) {
        const x = position;
        const y = this.index;

        return [x, y];
    }
}

export class Square extends BoardStructure {
    type = "square";
    /** @type {Number} */
    #squareX;
    /** @type {Number} */
    #squareY;

    /**
     * @param {Number} position
     * @returns {Array<Number>}
     */
    get(position) {
        const innerX = position % StructureDefinitions.BASE_NUMBER;
        const innerY = Math.floor(position / StructureDefinitions.BASE_NUMBER);

        const x = this.#squareX + innerX;
        const y = this.#squareY + innerY;

        return [x, y];
    }

    /**
     * @param {Number} index
     */
    constructor(index) {
        super(index);

        this.#squareX = (this.index % StructureDefinitions.BASE_NUMBER) * StructureDefinitions.BASE_NUMBER;
        this.#squareY = Math.floor(this.index / StructureDefinitions.BASE_NUMBER) * StructureDefinitions.BASE_NUMBER;
    }
}

export class StructureDefinitions {
    /** @returns  {Number} */
    static get CELL_COUNT() {
        return StructureDefinitions.SIZE * StructureDefinitions.SIZE;
    }

    /** @returns  {Number} */
    static get SIZE() {
        return StructureDefinitions.BASE_NUMBER * StructureDefinitions.BASE_NUMBER;
    }

    /** @returns  {Number} */
    static get BASE_NUMBER() {
        return 3;
    }

    /** @type {Array<Row>} */
    static #rows = Array(StructureDefinitions.SIZE)
        .fill(null)
        .map((_, index) => new Row(index));
    /** @type {Array<Column>} */
    static #columns = Array(StructureDefinitions.SIZE)
        .fill(null)
        .map((_, index) => new Column(index));
    /** @type {Array<Square>} */
    static #squares = Array(StructureDefinitions.SIZE)
        .fill(null)
        .map((_, index) => new Square(index));

    /** @returns {Array<Row>} */
    static get rows() {
        return this.#rows;
    }

    /** @returns {Array<Column>} */
    static get columns() {
        return this.#columns;
    }

    /** @returns {Array<Square>} */
    static get squares() {
        return this.#squares;
    }

    /**
     * @param {Number} x
     * @param {Number} y
     * @returns {Row}
     */
    static getRow(x, y) {
        return StructureDefinitions.rows[y];
    }

    /**
     * @param {Number} x
     * @param {Number} y
     * @returns {Column}
     */
    static getColumn(x, y) {
        return StructureDefinitions.columns[x];
    }

    /**
     * @param {Number} x
     * @param {Number} y
     * @returns {Square}
     */
    static getSquare(x, y) {
        const squareX = Math.floor(x / StructureDefinitions.BASE_NUMBER);
        const squareY = Math.floor(y / StructureDefinitions.BASE_NUMBER);

        const index = squareX + squareY * StructureDefinitions.BASE_NUMBER;
        return StructureDefinitions.squares[index];
    }
}

export default class Board {
    /**
     * @param {RNG} rng
     * @returns {Board}
     */
    static randomSkeleton(rng) {
        const board = new Board();

        const squares = [0, 4, 8];
        for (var i = 0; i < squares.length; i++) {
            const square = StructureDefinitions.squares[squares[i]];

            const numbers = [...Array(StructureDefinitions.SIZE).keys()];
            shuffleList(numbers, rng);

            for (var x = 0; x < StructureDefinitions.SIZE; x++) BoardStructure.setValue(board, square, x, numbers[x]);
        }

        return board;
    }

    /** @type {List<Number>} */
    cells;

    /**
     * @param {Number} x
     * @param {Number} y
     * @returns {Number}
     */
    getCell(x, y) {
        return this.cells.get(x * StructureDefinitions.SIZE + y) ?? 0;
    }

    /**
     * @param {Number} x
     * @param {Number} y
     * @param {Number} value
     */
    setCell(x, y, value) {
        return this.cells.set(x * StructureDefinitions.SIZE + y, value);
    }

    /** @returns {Board} */
    clone() {
        const result = new Board();
        result.cells = this.cells.clone();

        return result;
    }

    /** @returns {Board} */
    duplicate() {
        const result = new Board();
        for (var i = 0; i < StructureDefinitions.CELL_COUNT; i++) {
            const value = this.cells.get(i);
            result.cells.set(i, value);
        }

        return result;
    }

    /** @param {Board} board */
    import(board) {
        this.cells = board.cells;
    }

    /** @returns {Boolean} */
    isFinished() {
        for (var i = 0; i < StructureDefinitions.CELL_COUNT; i++) {
            if (!this.cells.get(i)) return false;
        }
        return true;
    }

    /** @returns {Boolean} */
    isValid() {
        for (var i = 0; i < StructureDefinitions.SIZE; i++) {
            const structs = [StructureDefinitions.rows[i], StructureDefinitions.columns[i], StructureDefinitions.squares[i]];
            const allValid = structs.reduce((valid, current) => valid && BoardStructure.isValid(this, current), true);
            if (!allValid) return false;
        }
        return true;
    }

    print() {
        for (var y = 0; y < StructureDefinitions.SIZE; y++) {
            const row = StructureDefinitions.rows[y];
            var s = y + ": ";
            for (var x = 0; x < StructureDefinitions.SIZE; x++) {
                const value = this.getCell(x, y).toString();
                s += value;
            }
            console.log(s);
        }
        console.log("\n\n");
    }

    constructor() {
        this.id = IdSupplier.getId();
        this.cells = new List(StructureDefinitions.CELL_COUNT);
    }
}
