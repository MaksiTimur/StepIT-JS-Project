console.clear();
// #############

class Task {
    #id;
    #description;
    #cost;

    constructor (id, description, cost) {
        if (new.target) throw new Error('Cannot be invoked with "new"')

        this.#id = id;
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