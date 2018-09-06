let myBudget;
let myView;

//Lav alle metoder inde i controlleren static. Jeg behøver ikke en controller instans, da den bare bruges som en container (at det giver overblik, og bedre syntax imo)
class Controller {
    constructor () {

    }

    static initialize () {
        //Creates budget instance
        myBudget = new Budget();

        //Creates view instance
        myView = new View();

        //Calls to setup eventlisteners
        this.setupEventListeners();
        
        console.log('Initialized!');
    }

    static setupEventListeners () {
        let buttonElement = document.getElementsByClassName('add__btn')[0];
        buttonElement.addEventListener('click', function () {
            Controller.ctrlAddItem();
        });

        console.log('EventListeners initialized!');
    }

    static createTestData () {
        let item1 = myBudget.addItem('income', 'inc1', 100);
        let item2 = myBudget.addItem('income', 'inc2', 200);
        let item3 = myBudget.addItem('income', 'inc3', 300);
        let item4 = myBudget.addItem('income', 'inc4', 400);
        myView.addListItem(item1, 'income')
        myView.addListItem(item2, 'income')
        myView.addListItem(item3, 'income')
        myView.addListItem(item4, 'income')
    
        let item5 = myBudget.addItem('expense', 'exp1', 10);
        let item6 = myBudget.addItem('expense', 'exp2', 20);
        let item7 = myBudget.addItem('expense', 'exp3', 30);
        let item8 = myBudget.addItem('expense', 'exp4', 40);
        myView.addListItem(item5, 'expense')
        myView.addListItem(item6, 'expense')
        myView.addListItem(item7, 'expense')
        myView.addListItem(item8, 'expense')
    
        console.log('Testdata created!');
    }

    static ctrlAddItem () {
        let info = myView.getInfo();

        let newObj = myBudget.addItem(info.type, info.desc, info.value);
        myView.addListItem(newObj, info.type);
    }

    static updateBudget () {
        //kalder myBudget.getBudget();
        //kalder view.displayBudget();
    }

    

    // static tempFunc () {
    //     console.log('Hurra!');
    // }
}

//
Controller.initialize();
Controller.createTestData();