const transactionsList = document.getElementById('transaction-list');
let budgetId;


const backButton = document.getElementById('back-button');
backButton.addEventListener('click', (e) => {
    window.location.href="/";
});

async function loadTransactions(){
    try{
         const res = await fetch('/api/transactions/' + budgetId);
         const result = await res.json();
         render(result.data);
    } catch (error) {
        alert('Failed to load transactions: ' + error.message);
    }
}

async function loadTransactionTypes(){
    try{
        const res = await fetch('/api/constants');
        const result = await res.json();
        fillSelect("transaction-type", result);
    } catch (error) {
        alert('Failed to load constants: ' + error.message);
    }
}
async function loadBudget() {
    try {
        const res = await fetch('/api/budgets/' + budgetId);
        const result = await res.json();
        document.getElementById('budget-amount').textContent =
            'Restbeløb: ' + result.data.actualAmount;
    } catch (error) {
        alert('Failed to load budget: ' + error.message);
    }
}


async function init(){
    try{
        budgetId = getBudgetId();
        if(!budgetId){
            alert('No budget id found.');
        }
        await loadTransactions();
        await loadTransactionTypes();
        await loadBudget();
    } catch (error) {
        alert('Failed to load transactions: ' + error.message);
    }
}

function getBudgetId(){
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function fillSelect(selectId, values){
    const select = document.getElementById(selectId);
    select.innerHTML = "";

    values.forEach(value => {
        const option = document.createElement("option");
        if (typeof value === "object"){
            option.value = value.value;
            option.textContent = value.text;
        } else {
            option.value = value;
            option.textContent = value;
        }
        select.appendChild(option);
    });
}

function render(transactions){
    transactionsList.innerHTML = '';

    transactions.forEach(transaction => {
        const transactionLi = document.createElement('li');
        transactionLi.className = 'transaction-li';

        const description = document.createElement('p');
        description.className = 'description';
        description.textContent = 'Beskrivelse: ' + transaction.description;

        const date = document.createElement('p');
        date.className = 'date';
        date.textContent = new Date(transaction.date).toLocaleDateString('da-DK');

        const transactionType = document.createElement('p');
        transactionType.className = 'transaction-type';
        transactionType.textContent = 'Type: ' + transaction.type;

        const amount = document.createElement('p');
        amount.className = 'amount';
        amount.textContent = 'Amount: ' + transaction.amount;

        transactionLi.append(description, transactionType,date, amount);
        transactionsList.appendChild(transactionLi);
    });
}

const transactionForm = document.getElementById('transaction-form');
transactionForm.addEventListener('submit', async(event) => {
    event.preventDefault();
   const newTransaction = {
       description: document.getElementById('description').value,
       date: new Date(document.getElementById('date').value).toISOString(),
       type: document.getElementById('transaction-type').value,
       amount: Number(document.getElementById('amount').value),
       budget: budgetId,
   };
   try{
       const res = await fetch('/api/transactions/', {
           method: 'POST',
           body: JSON.stringify(newTransaction),
           headers: { 'Content-Type': 'application/json' },
       });
       if (!res.ok) {
           const errorData = await res.json();
           console.error(errorData);
           alert('Failed to create transaction.' + JSON.stringify(errorData));
       }
       transactionForm.reset();
       await loadTransactions();
       await loadBudget();
   } catch (error) {
       alert('Failed to create transaction.' + error.message);
   }
});
init();
/*
description: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    amount: { type: Number, required: true },
    budget: { type: Schema.Types.ObjectId, ref: "Budget",required: true },
 */