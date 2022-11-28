import Board, { StructureDefinitions } from "./board";
import IdSupplier from "./idSupplier";
import Notebook from "./notebook";
import { RNG, shuffleList } from "./RNG";

/**
 * @param {Number} emptySquares
 * @param {Number} seed
 * @returns {Promise<Array<Board>>}
 */
export function getPuzzleAsync(emptySquares, seed) {
    return new Promise((resolve, reject) => {
        try {
            resolve(getPuzzle(emptySquares, seed));
        } catch (error) {
            reject(error);
        }
    });
}

/**
 * @param {Number} emptySquares
 * @param {Number} seed
 * @returns {Array<Board>}
 */
export function getPuzzle(emptySquares, seed) {
    const rng = new RNG(seed);

    const skeleton = Board.randomSkeleton(rng);
    const solver = new Solver();

    const board = solver.getSolutions(skeleton, 1, rng)[0];
    if (!board) throw new Error("Error creating new solution");

    const allPositions = Array(StructureDefinitions.SIZE)
        .fill(null)
        .map((_, y) => [...Array(StructureDefinitions.SIZE).keys()].map((x) => [x, y]))
        .reduce((result, current) => result.concat(current), []);
    shuffleList(allPositions, rng);

    var squaresRemoved = 0;
    const puzzleBoard = board.duplicate();

    for (var i = 0; i < allPositions.length; i++) {
        const [x, y] = allPositions[i];

        const value = puzzleBoard.getCell(x, y);
        puzzleBoard.setCell(x, y, 0);

        const solutions = solver.getSolutions(puzzleBoard, 2, rng, true);
        if (solutions.length !== 1) {
            puzzleBoard.setCell(x, y, value); // core number
        } else {
            squaresRemoved++;
            if (squaresRemoved >= emptySquares) break;
        }
    }

    return [board, puzzleBoard, rng.seed];
}

export class SolutionError extends Error {
    constructor(message) {
        super(message);
        this.name = "SolutionError";
    }
}

export class Solver {
    /** @type {Board} */
    board;

    /** @param {Board} board */
    constructor(board) {
        this.id = IdSupplier.getId();
        this.board = board;
    }

    /**
     * @param {Notebook} notebook
     * @param {Number} x
     * @param {Number} y
     */
    #tryFillAndCascade(notebook, x, y) {
        if (notebook.board.getCell(x, y)) return false;

        const note = notebook.getNotesForCell(x, y);
        const options = Notebook.getOptionValues(note);
        if (options.length > 1) return false;
        if (options.length === 0) throw new SolutionError(`Cell ${x}, ${y} cannot be filled`);

        this.#cascadeFill(notebook, x, y, options[0]);
        return true;
    }

    /**
     * @param {Notebook} notebook
     * @param {Number} x
     * @param {Number} y
     * @param {Number} value
     */
    #cascadeFill(notebook, x, y, value) {
        notebook.board.setCell(x, y, value);
        const structures = [StructureDefinitions.getRow(x, y), StructureDefinitions.getColumn(x, y), StructureDefinitions.getSquare(x, y)];
        structures.forEach((structure) => {
            for (var position = 0; position < StructureDefinitions.SIZE; position++) {
                const [cellX, cellY] = structure.get(position);
                const note = notebook.getNotesForCell(cellX, cellY);
                note.set(value - 1, false);

                this.#tryFillAndCascade(notebook, cellX, cellY);
            }
        });
    }

    /**
     * @param {Notebook} notebook
     * @param {RNG} rng
     * @returns {Boolean}
     */
    #fillSingleOptions(notebook, rng) {
        var result = false;

        const positions = Array(StructureDefinitions.SIZE)
            .fill(null)
            .map((_, y) =>
                [...Array(StructureDefinitions.SIZE).keys()]
                    .filter((x) => {
                        return !notebook.board.getCell(x, y);
                    })
                    .map((x) => [x, y])
            )
            .reduce((result, current) => result.concat(current), []);

        shuffleList(positions, rng);

        positions.forEach(([x, y]) => {
            if (this.#tryFillAndCascade(notebook, x, y)) result = true;
        });

        return result;
    }

    /**
     * @param {Board} a
     * @param {Board} b
     * @returns {Boolean}
     */
    boardCompare(a, b) {
        const size = StructureDefinitions.CELL_COUNT;
        for (var i = 0; i < size; i++) {
            const cellA = a.cells.get(i) ?? 0;
            const cellB = b.cells.get(i) ?? 0;

            if (cellA !== cellB) false;
        }

        return true;
    }
    /**
     * @param {Notebook} a
     * @param {Notebook} b
     * @returns {Boolean}
     */
    notebookCompare(a, b) {
        const size = StructureDefinitions.CELL_COUNT;
        for (var i = 0; i < size; i++) {
            const optionsA = Notebook.getOptionValues(a.cellnotes[i]);
            const optionsB = Notebook.getOptionValues(b.cellnotes[i]);

            const same = optionsA.reduce((state, valueA, index) => {
                const valueB = optionsB[index];
                return state && valueA === valueB;
            }, true);

            if (!same) return false;
        }

        return true;
    }

    /**
     * @param {Board} inputBoard
     * @param {Number} maxCount
     * @param {RNG} rng
     * @param {Boolean} doNotGuess
     * @param {Notebook} inputNotebook
     * @param {Boolean} cloneInput
     * @param {Number} foundCount
     * @returns {Array<Board>}
     */
    getSolutions(inputBoard, maxCount, rng, doNotGuess, inputNotebook, cloneInput, foundCount) {
        cloneInput = cloneInput !== false;
        maxCount = maxCount ? maxCount : 1;
        rng = rng ?? new RNG();
        doNotGuess = doNotGuess === true;
        foundCount = foundCount ?? 0;

        const board = cloneInput ? inputBoard.clone() : inputBoard;
        const notebook = cloneInput && inputNotebook ? inputNotebook.clone(board) : Notebook.fromBoard(board);

        try {
            this.#fillSingleOptions(notebook, rng);
        } catch (error) {
            if (error instanceof SolutionError) {
                console.debug(error.message);
                return [];
            }

            throw error;
        }

        if (doNotGuess || board.isFinished()) return board.isValid() ? [board] : [];

        const [x, y] = notebook.getCellWithLeastOptions();
        const note = notebook.getNotesForCell(x, y);
        const options = Notebook.getOptionValues(note);

        /** @type {Array<Board>} */
        var foundSolutions = [];

        for (var i = 0; i < options.length; i++) {
            const option = options[i];

            const cloneBoard = board.clone();
            const cloneBook = notebook.clone(cloneBoard);

            this.#cascadeFill(cloneBook, x, y, option);

            const newSolutions = this.getSolutions(cloneBoard, maxCount, rng, doNotGuess, cloneBook, false, foundCount + foundSolutions.length);
            foundSolutions = foundSolutions.concat(newSolutions);

            if (foundSolutions.length + foundCount >= maxCount) return foundSolutions;
        }

        return foundSolutions;
    }
}
