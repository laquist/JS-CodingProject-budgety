//ToDo:
//addItem må IKKE kunne tage imod en value som er en string. Det ødelægger calculateTotal, fordi så plusser den et tal + string.
//Generelt fix input validering
//Try Catch'es i hele opgaven. Undersøg lige kort, og se om det er for indviklet.
//Tror ikke at model skal ikke console.log nogensinde. Den har intet med view/console at gøre. Den skal vel returne en string med fejl f.eks.
//Fix diverse responses, om tingene sker successfully, og ellers returner at der var en fejl.
//Lav en DOMStrings samling, med de class names jeg skal bruge? I stedet for document.getElementByClassname - hver gang
//Procent skal kun vise 2 decimaler. Den må ikke kunne vise 8-9 decimaler..



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

        //
        if (type === 'income') {
            item = new Income(ID, desc, value);
            allItems.income.push(item);

            return item;
        }
        else if (type === 'expense') {
            item = new Expense(ID, desc, value, Expense.calcPercentage(value, this.calculateTotal('income')));
            allItems.expense.push(item);
            
            return item;
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

        //return et object med totalIncome, totalExpenses, balance?
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

    getBudget () {
        //kalder calculateBudget
    }
};


class Expense {
    constructor (id, desc, value, percentage) {
        this.id = id;
        this.desc = desc;
        this.value = value;
        this.percentage = percentage;
    }

    static calcPercentage (value, totalIncome) {       
        return value / (totalIncome / 100);
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