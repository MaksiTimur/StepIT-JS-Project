console.clear();
// #############

function Task(description, cost) {

    if (new.target) throw new Error('Forbidden to create an instance of this class');
    if (!new.target) throw new Error('Forbidden to create an instance of this class');

    const generateID = function() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    const _id = generateID(); // Каждый раз создаёт новый id
    const _description = description;
    const _cost = Number(cost);

    Object.defineProperty(this, 'id', {
        get() {
            return _id;
        }
    });

    Object.defineProperty(this, 'description', {
        get() {
            return _description;
        }
    });

    Object.defineProperty(this, 'cost', {
        get() {
            return _cost;
        }
    });
}

class IncomeTask extends Task {
    constructor (description, cost) {
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
    constructor () {

    }

    makeDone(budget) {
        budget.expense += this.cost;
    }

    makeUnDone(budget) {
        budget.expense -= this.cost;
    }
}

class TasksController {
    #tasks = [];

    constructor () {
        // Конструктор
    }

    addTasks(...tasks) {
        tasks.push(...tasks);
    }
    
    deleteTask(task) {
        const indexOfTask = _footbalPlayers.indexOf(task);

        if (indexOfTask !== -1) {
            tasks.splice(indexOfTask, 1);
        }  
    }

    getTasks() {
        return [...tasks]; 
    }

    getTasksSortedBy(filterType) {
        const filteredTasks = [];


    }

    getFilteredTasks() {
        
    }

    // Должен иметь механизм работы с уже сделанными задачами (BudgetController)
}