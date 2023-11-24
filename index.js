console.clear();
// #############

function Task(description, cost) {

    if (new.target === Task) {
        throw new Error('Task is an abstract class and cannot be instantiated directly');
    }
    if (cost < 0) throw new Error('Cost cannot be less than zero');

    const _id = "id" + Math.random().toString(16).slice(2);
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
    calculateDone(budget) {
        budget.income += this.cost;
    }

    calculateUnDone(budget) {
        budget.income -= this.cost;
    }
}

Object.setPrototypeOf(IncomeTask.prototype, Task.prototype);

class ExpenseTask extends Task {
    calculateDone(budget) {
        budget.expenses += this.cost;
    }

    calculateUnDone(budget) {
        budget.expenses -= this.cost;
    }
}

Object.setPrototypeOf(ExpenseTask.prototype, Task.prototype);

class TasksController {
    #tasks = [];
    #completedTasks = [];

    addTasks(...tasks) {
        for (const iterator of [...tasks]) {
            if (!this.#tasks.includes(iterator)) {
                this.#tasks.push(iterator);  
            } else {
                console.log(`Task ${iterator.id} already added! Skipped`);
            }
        }
    }

    completeTasks(...tasks) {
        this.#completedTasks.push(...tasks);
    }

    unCompleteTask(task) {
        const indexOfCompletedTask = this.#completedTasks.indexOf(task);

        if (indexOfCompletedTask !== -1) {
            this.#completedTasks.splice(indexOfCompletedTask, 1);
        }
    }

    deleteTask(task) {
        const indexOfTask = this.#tasks.indexOf(task);
        const indexOfCompletedTask = this.#completedTasks.indexOf(task);

        if (indexOfTask !== -1) {
            this.#tasks.splice(indexOfTask, 1);
        }

        if (indexOfCompletedTask !== -1) {
            this.#completedTasks.splice(indexOfCompletedTask, 1);
        }
    }

    getTasks() {
        return [...this.#tasks];
    }

    getCompletedTasks() {
        return [...this.#completedTasks];
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

                    if (costA > costB) return -1;
                    if (costA < costB) return 1;

                    return 0;
                });
        }
    }

    getFilteredTasks(filter) {
        let filteredTasks = this.#tasks;

        for (const filterType in filter) {
            const filterValue = filter[filterType];

            switch (filterType) {
                case 'isIncome':
                    if (filterValue) {
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
                        return element.description.includes(filterValue);
                    });

                    continue;

                case 'isCompleted':
                    if (filter[filterType]) {
                        return [...this.#completedTasks];
                    }

                    const notCompletedTasks = this.#tasks.filter(item => !this.#completedTasks.includes(item)).concat(this.#completedTasks.filter(item => !this.#tasks.includes(item)));
                    return [...notCompletedTasks];
            }
        }

        return [...filteredTasks];
    }
}

class BudgetController {
    #taskController = new TasksController();
    #budget;

    constructor(balance = 0) {
        this.#budget = {
            balance,
            income: 0,
            expenses: 0
        }
    }

    get balance() {
        return this.#budget.balance;
    }

    get income() {
        return this.#budget.income;
    }

    get expenses() {
        return this.#budget.expenses;
    }

    calculateBalance() {
        return this.balance + this.income - this.expenses;
    }

    getTasks() {
        return this.#taskController.getTasks();
    }

    addTasks(...tasks) {
        return this.#taskController.addTasks(...tasks);
    }

    getTasksSortedBy(sortType) {
        return this.#taskController.getTasksSortedBy(sortType);
    }

    getFilteredTasks(filter) {
        return this.#taskController.getFilteredTasks(filter);
    }

    deleteTask(task) {
        if (this.getTasks().indexOf(task) === -1) {
            console.log(`Task ${task.id} isn't recognized`);
            return;
        }

        if (this.#taskController.getCompletedTasks().indexOf(task) !== -1) {
            task.calculateUnDone(this.#budget);
        }

        this.#taskController.deleteTask(task);
    }

    doneTask(task) {
        if (this.getTasks().indexOf(task) === -1) {
            console.log(`Task ${task.id} isn't recognized`);
            return;
        }

        if (this.#taskController.getCompletedTasks().indexOf(task) !== -1) {
            console.log("Task is already done");
            return;
        }

        task.calculateDone(this.#budget);
        this.#taskController.completeTasks(task);
    }

    unDoneTask(task) {
        if (this.getTasks().indexOf(task) === -1) {
            console.log(`Task ${task.id} isn't recognized`);
            return;
        }
        
        if (this.#taskController.getCompletedTasks().indexOf(task) === -1) {
            console.log("Task isn't done before");
            return;
        }

        task.calculateUnDone(this.#budget);
        this.#taskController.unCompleteTask(task);
    }
}