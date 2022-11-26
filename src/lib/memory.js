export class MemoryItem {
    /** @type {Number} */
    #cellId;
    /** @type {Object} */
    #value;
    /** @type {Number} */
    #mode;

    /** @returns {Number} */
    get cellId() {
        return this.#cellId;
    }
    /** @returns {Object} */
    get value() {
        return this.#value;
    }
    /** @returns {Number} */
    get mode() {
        return this.#mode;
    }

    /**
     * @param {Number} cellId
     * @param {Object} value
     * @param {Number} mode
     */
    constructor(cellId, value, mode) {
        this.#cellId = cellId;
        this.#value = value;
        this.mode = mode;
    }
}

export default class Memory {
    /** @type {Array<MemoryItem>} */
    data;

    reset() {
        this.data.length = 0;
    }

    /**
     * @returns {MemoryItem}
     */
    rollBack() {
        if (this.data.length === 0) return null;
        return this.data.pop();
    }

    /**
     * @param {Number} cellId
     * @param {Object} value
     * @param {Number} mode
     */
    store(cellId, value, mode) {
        const item = new MemoryItem(cellId, value, mode);
        this.data.push(item);
    }

    /** @returns {Number} */
    get size() {
        return this.data.length;
    }

    constructor() {
        this.data = [];
    }
}
