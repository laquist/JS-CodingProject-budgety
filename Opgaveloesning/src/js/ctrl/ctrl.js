let myBudget;

//Lav alle metoder inde i controlleren static. Jeg behøver ikke en controller instans, da den bare bruges som en container (at det giver overblik, og bedre syntax imo)
class Controller {
    constructor () {

    }

    static initialize () {
        //Creates budget instances
        myBudget = new Budget();
        console.log('Initialized!');

        //Calls to setup eventlisteners
        this.setupEventListeners();
    }

    static setupEventListeners () {
        let buttonElement = document.getElementsByClassName('add__btn')[0];
        buttonElement.addEventListener('click', function () {
            Controller.ctrlAddItem();
        });

        console.log('EventListeners initialized!');
    }

    static createTestData () {
        myBudget.addItem('income', 'inc1', 100);
        myBudget.addItem('income', 'inc2', 200);
        myBudget.addItem('income', 'inc3', 300);
        myBudget.addItem('income', 'inc4', 400);
    
        myBudget.addItem('expense', 'exp1', 10);
        myBudget.addItem('expense', 'exp2', 20);
        myBudget.addItem('expense', 'exp3', 30);
        myBudget.addItem('expense', 'exp4', 40);
    
        console.log('Testdata created!');
    }

    static ctrlAddItem () {
        let type = document.getElementsByClassName('add__type')[0].value;
        let desc = document.getElementsByClassName('add__description')[0].value;
        let value = parseInt(document.getElementsByClassName('add__value')[0].value);
    
        myBudget.addItem(type, desc, value);
        this.tempFunc();
    }

    static updateBudget () {
    
    }

    

    static tempFunc () {
        console.log('Hurra!');
    }
}

//
Controller.initialize();
Controller.createTestData();