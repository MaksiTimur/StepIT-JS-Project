console.clear();
// #############

function Task(description, cost) {

    if (new.target === Task) {
        throw new Error('Task is an abstract class and cannot be instantiated directly');
    }
    if (cost < 0) throw new Error('Cost cannot be less than zero');

    const _id = Date.now().toString(36) + Math.random().toString(36).substr(2);
    const _description = description;
    const _cost = Number(cost);

    Object.defineProperties(this, {
        id: {
            get() {
                return _id;
            }
        },

        description: {
            get() {
                return _description;
            }
        },

        cost: {
            get() {
                return _cost;
            }
        }
    });
}

class IncomeTask extends Task {
    constructor(description, cost) {
        super(description, cost);
    }

    makeDone(budget) {
        budget.income += this.cost;
    }

    makeUnDone(budget) {
        budget.income -= this.cost;
    }
}

class ExpenseTask extends Task {
    constructor(description, cost) {
        super(description, cost);
    }

    makeDone(budget) {
        budget.expense += this.cost;
    }

    makeUnDone(budget) {
        budget.expense -= this.cost;
    }
}