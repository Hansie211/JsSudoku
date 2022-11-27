import { LocalStorage } from "quasar";

/** @template {T} */
export class Savestate {
    /** @type {() => {T}} */
    getValue;

    /** @type {({T}) => ()} */
    setValue;

    /** @type {(T) => {Object}} */
    serialize;

    /** @type {({Object}) => {T}} */
    deserialize;

    /** @type {() => {T}} */
    defaultValueFactory;

    /** @type {String} */
    key;

    /**
     * @param {String} key
     * @param {() => {T}} getter
     * @param {(T) => {}} setter
     * @param {() => {T}} defaultValueFactory
     * @param {(T) => {Object}} serialize
     * @param {({Object}) => {T}} deserialize
     */
    constructor(key, getter, setter, defaultValueFactory, serialize, deserialize) {
        this.key = key;
        this.getValue = getter;
        this.setValue = setter;
        this.defaultValueFactory = defaultValueFactory;

        if (!serialize) serialize = (o) => o;
        if (!deserialize) deserialize = (o) => o;

        this.serialize = serialize;
        this.deserialize = deserialize;
    }
}

export class SaveManager {
    /** @type {Array<Savestate} */
    states;

    /** @type {String} */
    storageKey;

    save() {
        const save = {};
        this.states.forEach((state) => {
            const key = state.key;
            const value = state.getValue();
            save[key] = state.serialize(value);
        });

        LocalStorage.set(this.storageKey, save);
    }

    load() {
        const save = LocalStorage.getItem(this.storageKey) ?? {};
        this.states.forEach((state) => {
            const key = state.key;
            const serialized = save[key];
            try {
                if (serialized === undefined || serialized === null) throw new Error();
                const value = state.deserialize(serialized);
                state.setValue(value);
            } catch (error) {
                const value = state.defaultValueFactory();
                state.setValue(value);
            }
        });
    }

    /**
     * @param {String} storageKey
     */
    constructor(storageKey) {
        this.storageKey = storageKey;
        this.states = [];
    }
}
