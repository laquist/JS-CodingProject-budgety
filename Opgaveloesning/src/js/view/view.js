class View {

    getInfo () {
        let info = {
            type: document.querySelector(DOMstrings.inputType).value,
            desc: document.querySelector(DOMstrings.inputDescription).value,
            value: parseInt(document.querySelector(DOMstrings.inputValue).value)
        };

        return info;
    }

    addListItem (obj, type) {
        let error = false;
        let html;
        let docElement;

        if (type === "income") {
            docElement = document.querySelector(DOMstrings.incomeContainer);
            html = `
            <div class="item clearfix" id="income-${obj.id}">
                <div class="item__description">${obj.desc}</div>
                <div class="right clearfix">
                    <div class="item__value">+ ${obj.value}</div>
                    <div class="item__delete">
                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                    </div>
                </div>
            </div>
            `;
        }
        else if (type === "expense") {
            docElement = document.querySelector(DOMstrings.expensesContainer);
            html = `
            <div class="item clearfix" id="expense-${obj.id}">
                <div class="item__description">${obj.desc}</div>
                <div class="right clearfix">
                    <div class="item__value">- ${obj.value}</div>
                    <div class="item__percentage">-1%</div>
                    <div class="item__delete">
                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                    </div>
                </div>
            </div>
            `;
        }
        else {
            console.log("Fejl i typen!");
            error = true;
        }
        
        if (error === false) {
            docElement.insertAdjacentHTML('beforeend', html);
        }
    }

    clearFields() {
        document.querySelector(DOMstrings.inputType).value = 'income';
        document.querySelector(DOMstrings.inputDescription).value = '';
        document.querySelector(DOMstrings.inputValue).value = '';
    }

    displayBudget (infoObj) {
        //Opdatere month?
        
        //Updates balance
        document.querySelector(DOMstrings.budgetLabel).textContent = infoObj.balance;
        
        //Updates Total income and Total expenses
        document.querySelector(DOMstrings.incomeLabel).textContent = infoObj.totalIncome;
        document.querySelector(DOMstrings.expensesLabel).textContent = infoObj.totalExpense;

        //Updates Expenses percent label
        document.querySelector(DOMstrings.percentageLabel).textContent = infoObj.percentage + '%';
    }

    formatNumber (number, type) {
        /*
        + or - before number
        exactly 2 decimal points
        comma separating the thousands
        2310.4567 -> + 2,310.46
        2000 -> + 2,000.00
        */
       
        let numberString = '';

        if (type === 'income') {
            numberString = '+ ' + numberString;
        }
        else if (type === 'expense') {
            numberString = '- ' + numberString;
        }

        return numberString;
    }

    displayPercentages (percentArr) {
        let percLabels = document.querySelectorAll(DOMstrings.expensesPercLabel);
        
        for (let i = 0; i < percLabels.length; i++) {
            percLabels[i].textContent = percentArr[i] + '%';
        }
    }

    deleteListItem () {

    }

    changedType() {

    }

    getDOMstrings () {
        return DOMstrings;
    }

    displayMonth() { 
        let months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];

        let date = new Date();
        let currentMonth = months[date.getMonth()];
        
        //Updates the html element with month string
        document.querySelector(DOMstrings.dateLabel).textContent = currentMonth;
    }
}

let DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container',
    expensesPercLabel: '.item__percentage',
    dateLabel: '.budget__title--month',
    itemDelete: '.item__delete--btn'
};