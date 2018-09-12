let myBudget;
let myView;

//Lav alle metoder inde i controlleren static. Jeg behøver ikke en controller instans, da den bare bruges som en container (at det giver overblik, og bedre syntax imo)
class Controller {
    //TEMP METODE
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
        //Gets info from fields
        let info = myView.getInfo();

        //Creates a model object
        let newObj = myBudget.addItem(info.type, info.desc, info.value);

        //Adds item to page
        myView.addListItem(newObj, info.type);

        //Updates budget
        Controller.updateBudget();

        //Updates percentages for expenses
        Controller.updatePercentages();
    }

    static updateBudget () {
        //Calculates the budget
        myBudget.calculateBudget();

        //Gets obj with info
        let budgetInfo = myBudget.getBudget();
        
        //Sends obj with info to view
        myView.displayBudget(budgetInfo);
    }

    static updatePercentages () {
        //Calculates percentages
        myBudget.calculatePercentages();

        //Gets percentages
        let percentArr = myBudget.getPercentages();

        //Send array with percentages to view
        myView.displayPercentages(percentArr);
    }

    static ctrlDeleteItem () {

    }

    static setupEventListeners () {
        //Gets DOM strings
        let DOM = myView.getDOMstrings();

        //Adds eventlistener to the apply button, next to input fields
        let buttonElement = document.querySelector(DOM.inputBtn);
        buttonElement.addEventListener('click', function () {
            Controller.ctrlAddItem();
        });
    }

    static initialize () {
        //Creates budget instance
        myBudget = new Budget();

        //Creates view instance
        myView = new View();

        //Calls to setup eventlisteners
        this.setupEventListeners();
        
        //Displays budget on page
        myView.displayBudget(
            {
                totalIncome: 0,
                totalExpense: 0,
                balance: 0,
                percentage: -1
            }
        );
    }
}

//
Controller.initialize();
Controller.createTestData();
//Temp - til at update budget, nu når jeg har testdata, så felterne ikke starter på 0
Controller.updateBudget();
Controller.updatePercentages();