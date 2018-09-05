//Skal dette også være som en class????

//Skal model/budget instansen laves her?
var myBudget = new Budget();


function ctrlAddItem () {
    let type = document.getElementsByClassName('add__type')[0].value;
    let desc = document.getElementsByClassName('add__description')[0].value;
    let value = document.getElementsByClassName('add__value')[0].value;

    myBudget.addItem(type, desc, value);
};