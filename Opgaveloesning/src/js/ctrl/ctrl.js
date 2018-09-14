let myBudget;
let myView;

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

        //Checks if the properties have 'truthy values' (not null, empty string, etc.)
        if (info.type && info.desc && info.value) {
            //Creates a model object
            let newObj = myBudget.addItem(info.type, info.desc, info.value);

            //Adds item to page
            myView.addListItem(newObj, info.type);

            //Clears input fields
            myView.clearFields();

            //Updates budget
            Controller.updateBudget();

            //Updates percentages for expenses
            Controller.updatePercentages();
        }

        
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

    static ctrlDeleteItem (type, id) {
        //Deletes the item in model list of items
        myBudget.deleteItem(type, id);

        //Deletes the html element
        myView.deleteListItem(type, id);

        //Updates budget
        Controller.updateBudget();

        //Updates percentages
        Controller.updatePercentages();
    }

    static setupEventListeners () {
        //Gets DOM strings
        let DOM = myView.getDOMstrings();

        //Adds eventlistener to the apply button, next to input fields
        document.querySelector(DOM.inputBtn).addEventListener('click', function () {
            Controller.ctrlAddItem();
        });

        //Adds eventlistener to the delete buttons for all elements
        document.querySelector(DOM.container).addEventListener('click', function () {
            let id;
            let targetIDsplit;

            //Find out if the 5th parent element is income__list or expenses__list
            let parentElement = event.target.parentElement.parentElement.parentElement.parentElement.parentElement;

            //Finds the 4th parent elements ID (example: income-1)
            let targetIDstring = event.target.parentElement.parentElement.parentElement.parentElement.id;

            if (parentElement.classList.contains('income__list')) {
                //Converts the html id="" tag, to id number
                targetIDsplit = targetIDstring.split('-');
                id = parseInt(targetIDsplit[1]);

                //
                Controller.ctrlDeleteItem('income', id);
            }
            else if (parentElement.classList.contains('expenses__list')) {
                //Converts the html id="" tag, to id number
                targetIDsplit = targetIDstring.split('-');
                id = parseInt(targetIDsplit[1]);

                //
                Controller.ctrlDeleteItem('expense', id);
            }
        });

        //Adds eventlistener to toggle red colors in input fields, when type is changed
        document.querySelector(DOM.inputType).addEventListener('change', function () {
            myView.changedType();
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

        //Displays month
        myView.displayMonth();
    }
}

//
Controller.initialize();
Controller.createTestData();
//Temp - til at update budget, nu når jeg har testdata, så felterne ikke starter på 0
Controller.updateBudget();
Controller.updatePercentages();