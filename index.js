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

function IncomeTask() { // TODO: Добавить наследование от Task
    if (!new.target) throw new Error('Cannot be invoked without "new"')

    this.makeDone() = function(budget) {
        budget.income += this.cost;
    }

    this.makeUnDone() = function(budget) {
        budget.income -= this.cost;
    }
}
// Object.setPrototypeOf(IncomeTask, Task);

function ExpenseTask() { // TODO: Добавить наследование от Task
    if (!new.target) throw new Error('Cannot be invoked without "new"')

    this.makeDone() = function(budget) {
        budget.expense += this.cost;
    }

    this.makeUnDone() = function(budget) {
        budget.expense -= this.cost;
    }
}
// Object.setPrototypeOf(ExpenseTask, Task);