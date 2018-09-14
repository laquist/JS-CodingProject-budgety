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

        let formatedValue = myView.formatNumber(obj.value);

        if (type === "income") {
            docElement = document.querySelector(DOMstrings.incomeContainer);
            html = `
            <div class="item clearfix" id="income-${obj.id}">
                <div class="item__description">${obj.desc}</div>
                <div class="right clearfix">
                    <div class="item__value">+ ${formatedValue}</div>
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
                    <div class="item__value">- ${formatedValue}</div>
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

    clearFields () {
        const inputBtnClassList = document.querySelector(DOMstrings.inputBtn).classList;
        
        document.querySelector(DOMstrings.inputType).value = 'income';
        document.querySelector(DOMstrings.inputDescription).value = '';
        document.querySelector(DOMstrings.inputValue).value = '';


        //
        if (inputBtnClassList.contains('red')) {
            inputBtnClassList.toggle('red');
        }
    }

    displayBudget (infoObj) {      
        //Updates balance
        document.querySelector(DOMstrings.budgetLabel).textContent = myView.formatNumber(infoObj.balance, 'balance');
        
        //Updates Total income and Total expenses
        document.querySelector(DOMstrings.incomeLabel).textContent = myView.formatNumber(infoObj.totalIncome, 'income');
        document.querySelector(DOMstrings.expensesLabel).textContent = myView.formatNumber(infoObj.totalExpense, 'expense');

        //Updates Expenses percent label
        //infoObj.percentage (truthy value) would return false if the number is 0, so thats why i check if its zero, to still run the code
        if (infoObj.percentage === 0 || infoObj.percentage) {
            if (infoObj.percentage === Infinity) {
                //Dont know if '0%' as placeholder is the best, but its just to avoid it being 'Infinity%'
                document.querySelector(DOMstrings.percentageLabel).textContent = '0%'; 
            }
            else {
                //Adds the number and a percent sign as textContent
                document.querySelector(DOMstrings.percentageLabel).textContent = infoObj.percentage + '%';
            }
        }
    }

    formatNumber (number, type) {
        /*
        + or - before number
        exactly 2 decimal points
        comma separating the thousands
        2310.4567 -> + 2,310.46
        2000 -> + 2,000.00
        */
       
        //Gives the comma and dot format
        let numberString = number.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2});;

        //Adds plus or minus to the string
        if (type === 'income') {
            numberString = '+ ' + numberString;
        }
        else if (type === 'expense') {
            numberString = '- ' + numberString;
        }
        else if (type === 'balance') {
            if (number < 0) {
                //Removes the minus sign, that already is in the raw data (data.balance), because it has no space between the sign and the number
                //Adds minus and a space in front of the number
                numberString = '- ' + numberString.split('-')[1];
            }
            else {
                numberString = '+ ' + numberString;
            }
        }

        return numberString;
    }

    displayPercentages (percentArr) {
        let percLabels = document.querySelectorAll(DOMstrings.expensesPercLabel);
        
        for (let i = 0; i < percLabels.length; i++) {
            percLabels[i].textContent = percentArr[i] + '%';
        }
    }

    deleteListItem (type, id) {
        let parentElement;
        let childToDelete;

        //Sets parentElement
        if (type === 'income') {
            parentElement = document.querySelector(DOMstrings.incomeContainer);
        }
        else if (type === 'expense') {
            parentElement = document.querySelector(DOMstrings.expensesContainer);
        }

        //Sets the element to delete
        childToDelete = document.querySelector('#' + type + '-' + id);

        //Deletes element
        parentElement.removeChild(childToDelete);
    }

    changedType () {
        let fields = document.querySelectorAll(
            DOMstrings.inputType + ',' + 
            DOMstrings.inputDescription + ',' + 
            DOMstrings.inputValue);

        fields.forEach(function (element) {
            element.classList.toggle('red-focus');
        });

        document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
    }

    getDOMstrings () {
        return DOMstrings;
    }

    displayMonth () { 
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