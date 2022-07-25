export default class Evt {
    #callbacks = new Map();
    on(event, callback) {
        const eventMap = this.#callbacks.get(event);
        if(!eventMap) this.#callbacks.set(event, new Map());

        this.#callbacks.get(event).set(callback);
    }
    
    off(event, callback) {
        const eventMap = this.#callbacks.get(event);
        if(!eventMap) return;

        eventMap.delete(callback);
    }

    dispatch(event, args) {
        const eventMap = this.#callbacks.get(event);
        if(!eventMap) return;

        eventMap.forEach((_, callback) => {
            callback.call(null, {
                ...args, 
                _off : () => this.off(event, callback),
                type : event
            });
        });
    }
    
    get() {
        return this.#callbacks;
    }

    merge(evt) {
        const mergeWith = evt.get();
        if(mergeWith.size < 1) return;

        mergeWith.forEach((events, event) => {
            events.forEach((_, callback) => {
                this.on(event, callback);
            });
        });
    }
}