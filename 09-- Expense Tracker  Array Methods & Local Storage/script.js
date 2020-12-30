const balance = document.getElementById("balance"),
  moneyPlus = document.getElementById("money-plus"),
  moneyMinus = document.getElementById("money-minus"),
  list = document.getElementById("list"),
  form = document.getElementById("form"),
  text = document.getElementById("text"),
  amount = document.getElementById("amount");

// const dummyTransaction = [
//   { id: 1, text: "Flower", amount: -20 },
//   { id: 2, text: "Salary", amount: 300 },
//   { id: 3, text: "Book", amount: -10 },
//   { id: 4, text: "Camera", amount: 150 },
// ];
const localStorageTransaction = JSON.parse(localStorage.getItem("transaction"));

let transaction =
  localStorage.getItem("transaction") !== null ? localStorageTransaction : [];

// Add Transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add Text and Amount");
  } else {
    const transactionAdd = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };

    transaction.push(transactionAdd);
    addTransactionDOM(transactionAdd);
    updateValues();

    updateLocalStorage();
    text.value = "";
    amount.value = "";
  }
}

// Generate Random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

//Add Transaction To DOM list
function addTransactionDOM(transaction) {
  //Get Sign
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");

  //Add Class Based On value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">X</button>`;

  list.appendChild(item);
}

// Update The Balance , Income and expence
function updateValues() {
  const amounts = transaction.map((trans) => trans.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `${total}$`;
  moneyPlus.innerText = `${income}$`;
  moneyMinus.innerText = `${expense}$`;
}

// Remove transaction By ID
function removeTransaction(id) {
  transaction = transaction.filter((trans) => trans.id !== id);

  updateLocalStorage();

  init();
}

// Update Local Storage Transaction
function updateLocalStorage() {
  localStorage.setItem("transaction", JSON.stringify(transaction));
}

//Init App
function init() {
  list.innerHTML = "";

  transaction.forEach(addTransactionDOM);
  updateValues();
}
init();

form.addEventListener("submit", addTransaction);
