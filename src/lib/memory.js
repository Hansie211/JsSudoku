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
        this.#mode = mode;
    }
}

export default class Memory {
    /** @type {Array<MemoryItem>} */
    data;

    /**
     * @param {Memory} memory
     * @returns {Object}
     */
    static serialize(memory) {
        return memory.data.map((mem) => {
            return {
                cellId: mem.cellId,
                value: mem.value,
                mode: mem.mode,
            };
        });
    }

    /**
     * @param {Object} data
     * @returns {Memory}
     */
    static deserialize(data) {
        if (data === null) return null;
        try {
            const result = new Memory();

            data.forEach((item) => {
                result.store(item.cellId, item.value, item.mode);
            });

            return result;
        } catch (error) {
            console.warn("Cannot deserialize", data, error);
            return null;
        }
    }

    clear() {
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
