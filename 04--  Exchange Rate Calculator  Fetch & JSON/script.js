const currencyElOne = document.getElementById('currency-one');
const amountElOne = document.getElementById('amount-one');
const currencyElTwo = document.getElementById('currency-two');
const amountElTwo = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// Ftech exchange rates and update the DOM
function calculate() {
   const currency_one = currencyElOne.value;
   const currency_two = currencyElTwo.value;

   fetch(`https://v6.exchangerate-api.com/v6/05571b97af2fc7cf2f6ca10e/latest/${currency_one}`)
   .then(res => res.json())
   .then(data => {
    const rate = data.conversion_rates[currency_two];
    rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

    amountElTwo.value = (amountElOne.value * rate).toFixed(2)   });
}

currencyElOne.addEventListener('change', calculate);
amountElOne.addEventListener('input', calculate);
currencyElTwo.addEventListener('change', calculate);
amountElTwo.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const temp = currencyElOne.value;

    currencyElOne.value = currencyElTwo.value;
    currencyElTwo.value = temp;
    calculate();
});

calculate();