const types = [];
for (let ev in window) {
    if (/^on/.test(ev)) types[types.length] = ev.slice(2);
}
export default class Evt {
    static types = types;
    #callbacks = new Map();
    on(event, callback) {
        const eventMap = this.#callbacks.get(event);
        if (!eventMap) this.#callbacks.set(event, new Map());

        this.#callbacks.get(event).set(callback, callback);
    }

    once(event, callback) {
        this.on(event, e => {
            callback(e);
            e.off();
        });
    }

    off(event, callback) {
        const eventMap = this.#callbacks.get(event);
        if (!eventMap) return;

        eventMap.delete(callback);
    }

    dispatch(event, args) {
        const eventMap = this.#callbacks.get(event);
        if (!eventMap) return;

        eventMap.forEach((_, callback) => {
            callback.call(null, {
                ...args,
                _off: () => this.off(event, callback),
                type: event
            });
        });
    }

    has(event) {
        const evt = this.#callbacks.get(event);
        if(!evt) return false;
        return evt.size > 0;
    }

    get() {
        return this.#callbacks;
    }

    merge(evt) {
        const mergeWith = evt.get();
        if (mergeWith.size < 1) return;

        mergeWith.forEach((events, event) => {
            events.forEach((_, callback) => {
                this.on(event, callback);
            });
        });
    }

    
}