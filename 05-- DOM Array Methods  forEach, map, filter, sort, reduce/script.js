const main = document.getElementById('main');
const addUserBtn = document.getElementById('add_user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show_millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate_wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();
// Fetch Random User And Add Money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    const user = data.results[0];
    const newUser ={
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }

    addData(newUser);
}

// Double Money 
function doubleMoney() {
    data = data.map(user => {
        return {...user, money: user.money * 2}
    });

    updateDom();
}

// Sort Money By Richest 
function sortByRichest(){
    data.sort((a, b) => b.money - a.money);

    updateDom();
}

// filter by Millionaires Only 
function showMillionaires(){
    data = data.filter(user => user.money > 1000000);

    updateDom();
}

// Calculate Wealth
function calculateWealth(){
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total wealth : <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);
}

// Add New Object To Data Array
function addData(obj) {
    data.push(obj);

    updateDom();
}

// Update Dom
function updateDom(providedData = data){

    //clear Main div
    main.innerHTML = '<h2><strong>Person</strong> wealth</h2>';

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });

}

// Formate Number as Number 
function formatMoney(number) {
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '$'; 

}

// Event Add Users 
addUserBtn.addEventListener('click', getRandomUser);

// EVENT Double Money
doubleBtn.addEventListener('click', doubleMoney);

// EVENT Sort 
sortBtn.addEventListener('click', sortByRichest);

// EVENT Show Millionaires
showMillionairesBtn.addEventListener('click', showMillionaires);

// EVENT Calculate Wealth
calculateWealthBtn.addEventListener('click', calculateWealth);