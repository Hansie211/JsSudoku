import { LocalStorage } from "quasar";

export class Savestate {
    /** @type {() => State} */
    getState;

    /** @type {(State) => void} */
    setState;

    /** @type {() => void} */
    setDefault;

    /** @type {String} */
    key;

    /**
     * @param {String} key
     * @param {() => State} getState
     * @param {(State) => void} setState
     * @param {() => void} setDefault
     */
    constructor(key, getState, setState, setDefault) {
        this.key = key;
        this.getState = getState;
        this.setState = setState;
        this.setDefault = setDefault;
    }
}

export default class SaveManager {
    /** @type {Array<Savestate} */
    states;

    /** @type {String} */
    storageKey;

    save() {
        const save = {};

        this.states.forEach((state) => {
            const key = state.key;
            const savedState = state.getState();
            save[key] = JSON.stringify(savedState);
        });

        LocalStorage.set(this.storageKey, save);
    }

    load() {
        const save = LocalStorage.getItem(this.storageKey) ?? {};
        this.states.forEach((state) => {
            const key = state.key;
            try {
                const savedState = JSON.parse(save[key]);
                state.setState(savedState);
            } catch (error) {
                if (state.setDefault !== undefined) {
                    state.setDefault();
                }
            }
        });
    }

    /**
     * @param {String} storageKey
     */
    constructor(storageKey) {
        this.storageKey = storageKey;
        this.states = [];

        this.save = this.save.bind(this);
        this.load = this.load.bind(this);
    }
}
