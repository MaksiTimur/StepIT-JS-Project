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

Object.setPrototypeOf(IncomeTask.prototype, Task.prototype);

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

Object.setPrototypeOf(ExpenseTask.prototype, Task.prototype);

class TasksController {
    #tasks = [];
    #completedTasks = [];

    addTasks(...tasks) {
        this.#tasks.push(...tasks);
    }

    deleteTask(task) {
        const indexOfTask = this.#tasks.indexOf(task);

        if (indexOfTask !== -1) {
            this.#tasks.splice(indexOfTask, 1);
        }
    }

    getTasks() {
        return [...this.#tasks];
    }

    getTasksSortedBy(sortType) {
        switch (sortType) {
            case 'description':
                return [...this.#tasks].sort(function (a, b) {
                    const name1 = a.description;
                    const name2 = b.description;

                    const name1InLowerCase = name1.toLowerCase();
                    const name2InLowerCase = name2.toLowerCase();

                    if (name1InLowerCase > name2InLowerCase) return 1;
                    if (name1InLowerCase < name2InLowerCase) return -1;

                    if (name1 > name2) return 1;
                    if (name1 < name2) return -1;

                    return 0;
                });

            case 'status':
                const notCompletedTasks = this.#tasks.filter(item => !this.#completedTasks.includes(item)).concat(this.#completedTasks.filter(item => !this.#tasks.includes(item)));
                return [...this.#completedTasks].concat(notCompletedTasks);

            case 'cost':
                return [...this.#tasks].sort(function (a, b) {
                    const costA = a.cost;
                    const costB = b.cost;

                    if (costA > costB) return 1;
                    if (costA < costB) return -1;

                    return 0;
                });
        }
    }


    getFilteredTasks(filter) {
        let filteredTasks = this.#tasks;

        for (const filterType in filter) {
            switch (filterType) {
                case 'isIncome':
                    if (filter[filterType] === true) {
                        filteredTasks = filteredTasks.filter(function (element) {
                            return element.constructor.name === 'IncomeTask';
                        });
                    } else {
                        filteredTasks = filteredTasks.filter(function (element) {
                            return element.constructor.name === 'ExpenseTask';
                        });
                    }

                    continue;

                case 'description':
                    filteredTasks = filteredTasks.filter(function (element) {
                        return element.description.includes(filter[filterType]);
                    });

                    continue;

                case 'isCompleted':
                    return [...this.#completedTasks];
            }
        }

        return [...filteredTasks];
    }

    // Должен иметь механизм работы с уже сделанными задачами (BudgetController)
}