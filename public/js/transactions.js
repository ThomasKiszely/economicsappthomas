const transactionsList = document.getElementById('transaction-list');
let budgetId;

async function loadTransactions(){
    try{
         const res = await fetch('/api/transactions/' + budgetId);
         const result = await res.json();
         render(result.data);
    } catch (error) {
        alert('Failed to load transactions: ' + error.message);
    }
}

async function init(){
    try{
        budgetId = getBudgetId();
        if(!budgetId){
            alert('No budget id found.');
        }
        await loadTransactions();
    } catch (error) {
        alert('Failed to load transactions: ' + error.message);
    }
}

function getBudgetId(){
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
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

        const amount = document.createElement('p');
        amount.className = 'amount';
        amount.textContent = 'Amount: ' + transaction.amount;

        transactionLi.append(description, date, amount);
        transactionsList.appendChild(transactionLi);
    });
}

const transactionForm = document.getElementById('transaction-form');
transactionForm.addEventListener('submit', async(event) => {
    event.preventDefault();
   const newTransaction = {
       description: document.getElementById('description').value,
       date: new Date(document.getElementById('date').value).toISOString(),
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