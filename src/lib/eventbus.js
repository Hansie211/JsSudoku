export default class EventBus {
    events;

    /**
     * @param {String} name
     * @param {({Object}) => {}} callback
     */
    on(name, callback) {
        if (!this.events[name]) {
            this.events[name] = [];
        }

        this.events[name].push(callback);
    }

    /**
     * @param {String} name
     * @param {() => {}} callback
     */
    off(name, callback) {
        if (!this.events[name]) {
            return;
        }

        this.events[name] = this.events[name].filter((listener) => listener !== callback);
    }

    /**
     * @param {String} name
     * @param {Object} data
     */
    dispatch(name, data) {
        if (!this.events[name]) {
            return;
        }

        this.events[name].forEach((listener) => listener(data));
    }

    constructor() {
        this.events = {};
    }
}

export const ApplicationEventBus = new EventBus();
