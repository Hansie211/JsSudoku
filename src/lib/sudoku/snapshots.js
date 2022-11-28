import IdSupplier from "./idSupplier";

/**
 * @template T
 */
export default class List {
    /** @type {List<T>} */
    parent;

    /** @type {Array<T>} */
    data;

    /** @type {Number} */
    size;

    /**
     * @param {Number} index
     * @returns {T}
     */
    get(index) {
        if (this.data[index] !== undefined) return this.data[index];
        if (!this.parent) return undefined;

        return this.parent.get(index);
    }

    /**
     * @param {Number} index
     * @param {T} value
     * @returns {void}
     */
    set(index, value) {
        if (value === undefined) throw new Error("UNDEF?");
        this.data[index] = value;
    }

    /** @returns {List<T>} */
    clone() {
        const result = new List(this.size);
        result.parent = this;
        return result;
    }

    /**
     * @param {Number} size
     */
    constructor(size) {
        this.id = IdSupplier.getId();

        this.parent = null;
        this.data = [];
        this.size = size;
    }
}
