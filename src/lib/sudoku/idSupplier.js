export default class IdSupplier {
    static #lastId = 0;

    static getId() {
        return ++IdSupplier.#lastId;
    }
}
