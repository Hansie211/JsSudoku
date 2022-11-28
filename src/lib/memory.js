export default class Memory {
    /** @type {Array<Array<State>>} */
    data;

    /**
     * @param {Memory} memory
     * @returns {Object}
     */
    static serialize(memory) {
        return memory.data.map((state) => JSON.stringify(state));
    }

    /**
     * @param {Memory} result
     * @param {Object} data
     * @returns {Memory}
     */
    static deserialize(result, data) {
        result.clear();

        data.forEach((item) => {
            const state = JSON.parse(item);
            result.data.push(state);
        });

        return result;
    }

    static #deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
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
     * @param {Array<State>} states
     */
    store(states) {
        if (!Array.isArray(states)) states = [states];
        if (states.length === 0) return;

        const clonedStates = states.map(Memory.#deepClone);
        this.data.push(clonedStates);
    }

    /** @returns {Number} */
    get size() {
        return this.data.length;
    }

    constructor() {
        this.data = [];
    }
}
