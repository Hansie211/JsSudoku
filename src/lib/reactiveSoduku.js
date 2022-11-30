import Board, { Column, Row, Square, StructureDefinitions } from "./sudoku/board";

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
    /** @type {Array<Number>} */
    values;

    /**
     * @param {Number} num
     * @returns {Boolean}
     */
    hasValue(num) {
        return this.values.includes(num);
    }

    /**
     * @param {Number} num
     */
    addValue(num) {
        if (this.hasValue(num)) return;
        this.values.push(num);
    }

    /**
     * @param {Number} num
     */
    removeValue(num) {
        const index = this.values.indexOf(num);
        if (index < 0) return;
        this.values.splice(index, 1);
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

    clear() {
        this.values.length = 0;
    }

    count() {
        return this.values.length;
    }

    /**
     * @param {Array<Number>} values
     */
    set(values) {
        this.values.length = 0;
        values.forEach((v) => this.values.push(v));
    }

    constructor() {
        this.values = [];
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

    /** @type {Number} */
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
        return this.value > 0;
    }

    /**
     * @param {Position} position
     * @param {Number} initialValue
     */
    constructor(position, initialValue) {
        this._position = position;
        this.value = initialValue;
        this.notes = new Notes();

        this._isStatic = this.hasValue();

        Cell.#setPositions(this);
    }
}

export default class PuzzleBoard {
    /** @type {Array<Cell>} */
    cells;

    /** @type {Array<Number} */
    solution;

    /** @type {Number} */
    difficultyLevel;

    /**
     * @param {PuzzleBoard} puzzle
     * @returns {Object}
     */
    static serialize(puzzle) {
        const obj = {
            cells: puzzle.cells.map((cell) => {
                return {
                    value: cell.value,
                    x: cell.position.x,
                    y: cell.position.y,
                    notes: cell.notes.values,
                    static: cell.isStatic,
                };
            }),
            seed: puzzle.seed,
            solution: puzzle.solution,
            difficultyLevel: puzzle.difficultyLevel,
        };

        return obj;
    }

    /**
     * @param {PuzzleBoard} result
     * @param {Object} obj
     * @returns {PuzzleBoard}
     */
    static deserialize(result, obj) {
        if (obj === null) throw new Error();

        result.cells.length = 0;
        result.solution.length = 0;

        result.cells = obj.cells.map((info) => {
            const pos = new Position(info.x, info.y);
            const cell = new Cell(pos, info.static ? info.value : 0);
            if (!info.static) cell.value = info.value;

            info.notes.forEach((n) => cell.notes.addValue(n));

            return cell;
        });
        result.seed = obj.seed;
        result.solution = obj.solution;
        result.difficultyLevel = obj.difficultyLevel;

        return result;
    }

    /**
     * @param {Position} position
     * @param {Array<Number} xy
     * @param {Number} x
     * @param {Number} y
     * @returns {Number}
     */
    static toIndex({ position = undefined, xy = undefined, x = 0, y = 0 } = {}) {
        const _x = position !== undefined ? position.x : xy !== undefined ? xy[0] : x;
        const _y = position !== undefined ? position.y : xy !== undefined ? xy[1] : y;

        return _x + _y * StructureDefinitions.SIZE;
    }

    /**
     * @param {PuzzleBoard} puzzle
     * @param {Cell} cell
     * @returns {Array<Cell>}
     */
    static getSurroundingCells(puzzle, cell) {
        const structs = [cell.row, cell.column, cell.square];
        return structs
            .map((struct) =>
                Array(StructureDefinitions.SIZE)
                    .fill(null)
                    .map((_, idx) => puzzle.getCell({ xy: struct.get(idx) }))
            )
            .reduce((arr, curr) => arr.concat(curr), [])
            .filter((item, index, arr) => item.id !== cell.id && arr.findIndex((i) => i.id === item.id) === index);
    }

    /**
     * @param {PuzzleBoard} puzzle
     * @param {Cell} cell
     * @returns {Array<Number>}
     */
    static getSurroundingValues(puzzle, cell) {
        return PuzzleBoard.getSurroundingCells(puzzle, cell)
            .map((cell) => cell.value)
            .filter((item, index, arr) => item > 0 && arr.indexOf(item) === index);
    }

    /**
     * @param {Position} position
     * @param {Array<Number} xy
     * @param {Number} x
     * @param {Number} y
     * @returns {Cell}
     */
    getCell({ position = undefined, xy = undefined, x = 0, y = 0 } = {}) {
        const index = PuzzleBoard.toIndex({ position, xy, x, y });
        return this.cells[index];
    }

    /**
     * @param {Position} position
     * @param {Array<Number} xy
     * @param {Number} x
     * @param {Number} y
     * @returns {Number}
     */
    getSolutionValue({ position = undefined, xy = undefined, x = 0, y = 0 } = {}) {
        const index = PuzzleBoard.toIndex({ position, xy, x, y });
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
    static fromBoard(result, board, solution, seed) {
        result.cells.length = 0;
        result.solution.length = 0;
        result.seed = seed;

        for (var x = 0; x < StructureDefinitions.SIZE; x++) {
            for (var y = 0; y < StructureDefinitions.SIZE; y++) {
                const solutionValue = solution.getCell(x, y);
                const boardValue = board.getCell(x, y);

                const position = new Position(x, y);
                const index = PuzzleBoard.toIndex({ position });

                result.solution[index] = solutionValue;

                const cell = new Cell(position, boardValue);
                result.cells[index] = cell;
            }
        }

        return result;
    }

    constructor() {
        this.cells = [];
        this.solution = [];
    }
}
