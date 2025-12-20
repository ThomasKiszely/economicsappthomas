const budgetList = document.getElementById('budget-list');


async function loadBudgets() {
    try{
        const res = await fetch('/api/budgets');
        const result = await res.json();
        render(result.data);
    } catch (error) {
        alert(`Couldn't load budgets: ${error}`);
    }
}

function render(budgets) {
    budgetList.innerHTML = '';

    budgets.forEach((budget) => {
        const budgetLi = document.createElement('li');
        budgetLi.className = 'budget-li';

        const budgetName = document.createElement('p');
        budgetName.className = 'budget-name';
        budgetName.textContent = 'Budget: ' + budget.name;

        const startDate = document.createElement('p');
        startDate.className = 'start-date';
        const startD = new Date(budget.startDate).toLocaleDateString('da-DK');
        startDate.textContent = 'Start date: ' + startD;

        const endDate = document.createElement('p');
        endDate.className = 'end-date';
        const endD = new Date(budget.endDate).toLocaleDateString('en-DK');
        endDate.textContent = 'End date: ' + endD;

        const startAmount = document.createElement('p');
        startAmount.className = 'start-amount';
        startAmount.textContent = 'Start amount: ' + budget.startAmount;

        const actualAmount = document.createElement('p');
        actualAmount.className = 'actual-amount';
        actualAmount.textContent = 'actual amount: ' + budget.actualAmount;

        const transButton = document.createElement('button');
        transButton.className = 'trans-button';
        transButton.textContent = 'Get transactions';
        transButton.addEventListener('click', () => {
            window.location.href = '/transactions.html?id=' + budget._id;
        });

        budgetLi.append(budgetName, startAmount, actualAmount, startDate, endDate, transButton);

        budgetList.appendChild(budgetLi);
    });
}

loadBudgets();
/*
  name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    startAmount: { type: Number, required: true },
    endAmount: { type: Number, required: true },
});
 */