//ToDo:
//addItem må IKKE kunne tage imod en value som er en string. Det ødelægger calculateTotal, fordi så plusser den et tal + string.
//Generelt fix input validering
//Try Catch'es i hele opgaven. Undersøg lige kort, og se om det er for indviklet.
//Tror ikke at model skal ikke console.log nogensinde. Den har intet med view/console at gøre. Den skal vel returne en string med fejl f.eks.
//Fix diverse responses, om tingene sker successfully, og ellers returner at der var en fejl.
//Lav en DOMStrings samling, med de class names jeg skal bruge? I stedet for document.getElementByClassname - hver gang
//Procent skal kun vise 2 decimaler. Den må ikke kunne vise 8-9 decimaler..
//Skriv comments i hele coden!
//Udfyld DOMstrings i view.js, og brug den til at gemme class navne, i stedet for getElementByClassName hver gang

class Budget {

    addItem (type, desc, value) {
        let item;
        let ID;

        //Ser hvor mange der er i allItems[type]. Og hvis der så f.eks. er 3, så siger vi -1, fordi deres plads i array'et vil være 0, 1, 2. Og så siger vi +1 for at have den nye plads vi skal bruge.
        if (data.allItems[type].length != 0) {
            ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
        }
        else {
            ID = 1;
        }

        //
        if (type === 'income') {
            item = new Income(ID, desc, value);
            data.allItems.income.push(item);

            return item;
        }
        else if (type === 'expense') {
            this.calculateBudget();

            item = new Expense(ID, desc, value);
            data.allItems.expense.push(item);
            
            return item;
        }
        else {
            console.log('Fejl i typen!');
        }
    }

    calculateBudget () {
        //Calculates total income and expenses
        this.calculateTotal('income');
        this.calculateTotal('expense');

        //Calculates and sets the budget balance
        data.balance = data.totals.income - data.totals.expense;

        //Calculates and sets the percent used of total income, by total expenses
        data.percentage = Math.round(data.totals.expense / (data.totals.income / 100));
    }

    calculateTotal (type) {
        let total = 0;

        if (type === 'income') {
            data.allItems.income.forEach(function (element) {
                total += element.value;
            });

            data.totals.income = total;
        }
        else if (type === 'expense') {
            data.allItems.expense.forEach(function (element) {
                total += element.value;
            });

            data.totals.expense = total;
        }
        else {
            console.log('Fejl i typen!');
        }
    }

    getBudget () {
        return {
            totalIncome: data.totals.income,
            totalExpense: data.totals.expense,
            balance: data.balance,
            percentage: data.percentage
        };
    }

    calculatePercentages () {
        data.allItems.expense.forEach(function (element) {
            element.calculatePercentage();
        });
    }

    getPercentages () {
        //Husk at 'get' metoder ikke skal calculate, men bare returne. Seperation of Concerns.

    }

    deleteItem(type, id) {

    }
};


class Expense {
    constructor (id, desc, value) {
        this.id = id;
        this.desc = desc;
        this.value = value;
    }

    calculatePercentage () {
        this.percentage = Math.round(this.value / (data.totals.income / 100));
    }
};


class Income {
    constructor (id, desc, value) {
        this.id = id;
        this.desc = desc;
        this.value = value;
    }
};

//Object til at gemme budgettets data
let data = {
    allItems: {
        income: [],
        expense: []
    },
    totals: {
        income: 0,
        expense: 0
    },
    balance: 0,
    percentage: -1
};