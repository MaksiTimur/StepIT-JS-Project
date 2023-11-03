console.clear();
// #############

class Task {
    #id;
    #description;
    #cost;

    constructor (description, cost) {
        if (new.target) throw new Error('Cannot be invoked with "new"')

        this.#id = function() {
            return Date.now().toString(36) + Math.random().toString(36).substr(2);
        };
        this.#description = description;
        this.#cost = Number(cost);
    }

    get id() {
        return this.#id;
    }

    get description() {
        return this.#description;
    }

    get cost() {
        return Number(this.#cost);
    }
}