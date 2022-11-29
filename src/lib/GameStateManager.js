import EventBus from "./eventbus";
import Memory from "./Memory";
import PuzzleBoard, { Cell } from "./reactiveSoduku";
import SaveManager, { Savestate } from "./SaveManager";
import Timer from "./Timer";
import Difficulty from "src/data/difficulty.json";
import { getPuzzle } from "./sudoku/sudoku";
import DefaultPuzzle from "src/data/default-puzzle.json";

export default class GameStateManager {
    /** @type {PuzzleBoard} */
    puzzle;

    /** @type {SaveManager} */
    saveManager;

    /** @type {Memory} */
    memory;

    /** @type {Timer} */
    timer;

    /** @type {Number} */
    hintCount;

    /** @type {EventBus} */
    eventBus;

    /**
     * @param {GameStateManager} stateManager
     */
    static __initSaveManager(stateManager) {
        stateManager.saveManager = new SaveManager("game");
        stateManager.saveManager.states.push(
            new Savestate(
                "puzzle",
                () => PuzzleBoard.serialize(stateManager.puzzle),
                (state) => PuzzleBoard.deserialize(stateManager.puzzle, state),
                () => {
                    PuzzleBoard.deserialize(stateManager.puzzle, DefaultPuzzle);
                }
            ),
            new Savestate(
                "time",
                () => stateManager.timer.time,
                (state) => stateManager.timer.set(state),
                () => stateManager.timer.set(0)
            ),
            new Savestate(
                "hintCount",
                () => stateManager.hintCount,
                (state) => (stateManager.hintCount = state),
                () => (stateManager.hintCount = 0)
            ),
            new Savestate(
                "memory",
                () => Memory.serialize(stateManager.memory),
                (state) => {
                    Memory.deserialize(stateManager.memory, state);
                },
                () => stateManager.memory.clear()
            )
        );
    }

    /**
     * @param {Number} cellId
     * @param {Object} value
     * @param {Boolean} isNote
     * @param {Boolean} isHint
     */
    __createMemoryState(cellId, value, { isNote, isHint } = {}) {
        return {
            cellId,
            value,
            isNote: isNote === true,
            isHint: isHint === true,
        };
    }

    /**
     * @param {Number} cellId
     * @param {Object} value
     * @param {Boolean} isNote
     * @param {Boolean} isHint
     */
    __saveMemoryState(cellId, value, { isNote, isHint } = {}) {
        const state = this.__createMemoryState(cellId, value, { isNote, isHint });
        this.memory.store(state);
    }

    __updateVictoryState() {
        const isVictory = this.puzzle.cells.reduce((state, cell, idx) => state && this.puzzle.solution[idx] === cell.value, true);
        if (!isVictory) return false;

        this.eventBus.dispatch("victory", {});
        return true;
    }

    /** @param {Cell} */
    __ensureCanEditCell(cell) {
        if (!cell) {
            this.__dispatchError("No cell selected.");
            return false;
        }

        if (cell.isStatic) {
            this.__dispatchError("Cannot edit this cell.");
            return false;
        }

        return true;
    }

    /**
     * @param {String} errorMessage
     */
    __dispatchError(errorMessage) {
        this.eventBus.dispatch("error", { message: errorMessage });
    }

    /**
     * @param {Number} cellId
     * @param {Number} value
     * @param {Boolean} isHint
     */
    placeNum(cellId, value, { isHint = false } = {}) {
        const cell = this.puzzle.findCellById(cellId);
        if (!this.__ensureCanEditCell(cell)) return;

        this.__saveMemoryState(cellId, cell.value, { isNote: false, isHint });

        if (cell.value === value) {
            cell.value = 0;
        } else {
            cell.value = value;
            if (this.__updateVictoryState()) return;
        }

        this.saveManager.save();
    }

    /**
     * @param {Number} cellId
     * @param {Number} value
     */
    placeNote(cellId, value) {
        const cell = this.puzzle.findCellById(cellId);
        if (!this.__ensureCanEditCell(cell)) return;
        if (cell.hasValue()) {
            this.__dispatchError("Cell already has a value.");
            return;
        }

        this.__saveMemoryState(cellId, cell.notes.values, { isNote: true, isHint: false });

        cell.notes.swapValue(value);

        this.saveManager.save();
    }

    /**
     * @param {Number} cellId
     */
    clearCell(cellId) {
        const cell = this.puzzle.findCellById(cellId);
        if (!this.__ensureCanEditCell(cell)) return;

        if (!cell.hasValue() && !cell.notes.values.length) return;

        if (cell.hasValue()) {
            this.__saveMemoryState(cellId, cell.value, { isNote: false, isHint: false });
            cell.value = 0;
        } else {
            this.__saveMemoryState(cellId, cell.notes.values, { isNote: true, isHint: false });
            cell.notes.clear();
        }

        this.saveManager.save();
    }

    undo() {
        if (!this.memory.size) return;

        const states = this.memory.rollBack();

        states.forEach((state) => {
            const cell = this.puzzle.findCellById(state.cellId);
            const value = state.value;
            switch (state.isNote) {
                case false: {
                    cell.value = value;
                    break;
                }
                case true: {
                    cell.notes.set(value);
                    break;
                }
            }

            if (state.isHint) this.hintCount--;
        });

        this.saveManager.save();
    }

    hint() {
        const nextOpenCell = this.puzzle.cells.find((cell) => !cell.hasValue());
        if (!nextOpenCell) return;

        const soltionValue = this.puzzle.solution[PuzzleBoard.toIndex({ position: nextOpenCell.position })];

        this.__saveMemoryState(nextOpenCell.id, 0, { isNote: false, isHint: true });

        nextOpenCell.value = soltionValue;
        this.hintCount++;

        if (this.__updateVictoryState()) return;

        this.saveManager.save();
    }

    resetGameState() {
        this.timer.set(0);
        this.memory.clear();
        this.hintCount = 0;
        this.timer.paused = false;

        this.saveManager.save();
    }

    resetLevel() {
        this.puzzle.cells.forEach((cell) => {
            if (cell.isStatic) return;
            cell.value = 0;
            cell.notes.clear();
        });

        this.resetGameState();
        this.saveManager.save();
    }

    /**
     * @param {Number} difficultyLevel
     * @param {Number} seed
     * @returns {Promise<void>}
     */
    async newLevel(difficultyLevel, seed) {
        const difficulty = Difficulty.find((item) => item.level === difficultyLevel) ?? Difficulty[0];

        const [solution, board, _seed] = await getPuzzle(difficulty.cells, seed);
        PuzzleBoard.fromBoard(this.puzzle, board, solution, _seed);
        this.puzzle.difficultyLevel = difficultyLevel;

        this.resetGameState();
        this.saveManager.save();
    }

    constructor() {
        this.eventBus = new EventBus();
        this.memory = new Memory();
        this.timer = new Timer();
        this.puzzle = new PuzzleBoard();
        this.hintCount = 0;

        GameStateManager.__initSaveManager(this);
    }
}
