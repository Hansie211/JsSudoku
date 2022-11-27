// export class MemoryItem {
//     /** @type {Number} */
//     #cellId;
//     /** @type {Object} */
//     #value;
//     /** @type {Number} */
//     #mode;

//     /** @returns {Number} */
//     get cellId() {
//         return this.#cellId;
//     }
//     /** @returns {Object} */
//     get value() {
//         return this.#value;
//     }
//     /** @returns {Number} */
//     get mode() {
//         return this.#mode;
//     }

//     /**
//      * @param {Number} cellId
//      * @param {Object} value
//      * @param {Number} mode
//      */
//     constructor(cellId, value, mode) {
//         this.#cellId = cellId;
//         this.#value = value;
//         this.#mode = mode;
//     }
// }

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
     * @param {Object} data
     * @returns {Memory}
     */
    static deserialize(data) {
        const result = new Memory();

        data.forEach((item) => {
            const state = JSON.parse(item);
            result.data.push(state);
        });

        return result;
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
        this.data.push(states);
    }

    /** @returns {Number} */
    get size() {
        return this.data.length;
    }

    constructor() {
        this.data = [];
    }
}
