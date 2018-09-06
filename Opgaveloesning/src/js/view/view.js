class View {
    constructor () {

    }

    getInfo () {
        let info = {
            type: document.getElementsByClassName('add__type')[0].value,
            desc: document.getElementsByClassName('add__description')[0].value,
            value: parseInt(document.getElementsByClassName('add__value')[0].value)
        };

        return info;
    }

    addListItem (obj, type) {
        let error = false;
        let html;
        let docElement;

        if (type === "income") {
            docElement = document.getElementsByClassName('income__list')[0];
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
            docElement = document.getElementsByClassName('expenses__list')[0];
            html = `
            <div class="item clearfix" id="expense-${obj.id}">
                <div class="item__description">${obj.desc}</div>
                <div class="right clearfix">
                    <div class="item__value">- ${obj.value}</div>
                    <div class="item__percentage">${obj.percentage}%</div>
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

    displayBudget () {

    }
}