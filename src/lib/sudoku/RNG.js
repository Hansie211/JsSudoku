/**
 * @param {Number} seed
 * @returns {() => {Number}}
 */
function getMulberry32Random(seed) {
    return function () {
        var t = (seed += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

export class RNG {
    /** @type {Number} */
    #seed;

    /** @type {() => {Number}} */
    #produceNext;

    /** @returns {Number} */
    get seed() {
        return this.#seed;
    }

    /**
     * @returns {Number}
     */
    next() {
        return this.#produceNext();
    }

    /**
     * @param {Number} seed
     * @param {(Number) => {() => Number}} RNGProvider
     */
    constructor(seed, RNGProvider) {
        this.#seed = seed === undefined ? Math.floor(Math.random() * 4294967296) : seed;
        this.#produceNext = RNGProvider ? RNGProvider(this.#seed) : getMulberry32Random(this.#seed);
    }
}

/**
 * @param {Array} array
 * @param {Number} indexA
 * @param {Number} indexB
 */

function swap(array, indexA, indexB) {
    const temp = array[indexA];
    array[indexA] = array[indexB];
    array[indexB] = temp;
}

/**
 * @param {Array} array
 * @param {RNG} rng
 */
export function shuffleList(array, rng) {
    for (var i = 0; i < array.length; i++) {
        const j = Math.floor(rng.next() * array.length);
        swap(array, i, j);
    }
}
