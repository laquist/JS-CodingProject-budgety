//ToDo:
//addItem må IKKE kunne tage imod en value som er en string. Det ødelægger calculateTotal, fordi så plusser den et tal + string.
//Generelt fix input validering
//Try Catch'es i hele opgaven. Undersøg lige kort, og se om det er for indviklet.

class Budget {
    constructor () {

    }


    //Adds to Expense or Income
    addItem (type, desc, value) {
        let item;
        let ID;

        //Ser hvor mange der er i allItems[type]. Og hvis der så f.eks. er 3, så siger vi -1, fordi deres plads i array'et vil være 0, 1, 2. Og så siger vi +1 for at have den nye plads vi skal bruge.
        if (allItems[type].length != 0) {
            ID = allItems[type][allItems[type].length - 1].id + 1;
        }
        else {
            ID = 1;
        }


        if (type === 'income') {
            item = new Income(ID, desc, value);
            allItems.income.push(item);
        }
        else if (type === 'expense') {
            item = new Expense(ID, desc, value);
            allItems.expense.push(item);
        }
        else {
            console.log('Fejl i typen!');
        }
    }

    // deleteItem(type, id) {

    // }

    calculateBudget () {
        let totalIncome = this.calculateTotal('income');
        let totalExpenses = this.calculateTotal('expense');

        let balance = totalIncome - totalExpenses;
        console.log('Balance: ' + balance);
    }

    calculateTotal (type) {
        let total = 0;

        if (type === 'income') {
            allItems.income.forEach(function (element) {
                total += element.value;
            });

            return total;
        }
        else if (type === 'expense') {
            allItems.expense.forEach(function (element) {
                total += element.value;
            });

            return total;
        }
        else {
            console.log('Fejl i typen!');
        }
    }
};


class Expense {
    constructor (id, desc, value) {
        this.id = id;
        this.desc = desc;
        this.value = value;
    }
};


class Income {
    constructor (id, desc, value) {
        this.id = id;
        this.desc = desc;
        this.value = value;
    }
};


//Hvor skal dette object med arrays gemmes? Her?
let allItems = {
    income: [],
    expense: []
};