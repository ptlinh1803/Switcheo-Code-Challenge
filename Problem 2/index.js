const fromCur = document.querySelector(".from select");
const toCur = document.querySelector(".to select");
const getBtn = document.querySelector("form button");
const exIcon = document.querySelector("form .reverse");
const amount = document.querySelector("form input");
const exRateTxt = document.querySelector("form .result");
const amountInput = document.getElementById("amount-input");
const warningMessage = document.querySelector(".warning-message");

// Add an input event listener for real-time input validation
amountInput.addEventListener("input", () => {
    if (!isValidAmount(amountInput.value)) {
        warningMessage.style.display = "block";
    } else {
        warningMessage.style.display = "none";
    }
});

// Function to validate the input as a valid number
function isValidAmount(value) {
    for (let i = 0; i < value.length; i++) {
        const char = value.charAt(i);
        if (char < '0' || char > '9') {
          return false;
        }
      }
    return true;
}

// Event listener for currency dropdowns (select)

[fromCur, toCur].forEach((select, i) => {
    for (let i = 0; i < Coin_List.length; i++) {
        const coin = Coin_List[i].currency;
        const selected = "";
        select.insertAdjacentHTML("beforeend", `<option value="${coin}" ${selected}>${coin}</option>`);
    }
    select.addEventListener("change", () => {
        const coin = select.value;
        const imgTag = select.parentElement.querySelector("img");
        imgTag.src = `tokens/${coin}.svg`;
    });
});



// Create a dictionary to map currency names to prices
const currencyPrices = {};
Coin_List.forEach(coin => {
    currencyPrices[coin.currency] = coin.price;
});


// Function to get exchange rate from the given json file
async function getExchangeRate() {
    const amountVal = amount.value || 1;
    exRateTxt.innerText = "Getting exchange rate...";

    // Get the price of the selected currencies
    const fromCurrency = fromCur.value;
    const fromCurrencyPrice = currencyPrices[fromCurrency];
    const toCurrency = toCur.value;
    const toCurrencyPrice = currencyPrices[toCurrency];

    try {
        //const response = await fetch(`https://v6.exchangerate-api.com/v6/[YOUR_KEY]]/latest/${fromCur.value}`);
        //const result = await response.json();
        const exchangeRate = fromCurrencyPrice / toCurrencyPrice;
        const totalExRate = (amountVal * exchangeRate).toFixed(5);

        exRateTxt.innerText = `${amountVal} ${fromCur.value} = ${totalExRate} ${toCur.value}`;
    } catch (error) {
        exRateTxt.innerText = "Something went wrong...";
    }
}

// Event listeners for button and exchange icon click

window.addEventListener("load", getExchangeRate);
getBtn.addEventListener("click", (e) => {
    e.preventDefault();
    getExchangeRate();
});

exIcon.addEventListener("click", () => {
    [fromCur.value, toCur.value] = [toCur.value, fromCur.value];
    [fromCur, toCur].forEach((select) => {
        const coin = select.value;
        const imgTag = select.parentElement.querySelector("img");
        imgTag.src = `tokens/${coin}.svg`;
    });
    getExchangeRate();
});