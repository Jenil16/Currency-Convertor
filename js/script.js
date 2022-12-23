const dropList = document.querySelectorAll(".select select");
const getButton =  document.querySelector("form button");

const toCurrency = document.querySelector(".to select");
const fromCurrency = document.querySelector(".from select");

const amount = document.querySelector(".amount .amount-input");


for(let i=0;i<dropList.length;i++){
    for(currency_code in country_code){
        // console.log(currency_code)
        let selected;
        if(i==0){
            selected = currency_code == "USD" ? "selected" : "";
        }else if(i==1){
            selected = currency_code == "INR" ? "selected" : "";
        }
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e => {
        loadFlag(e.target);
    });
}

function loadFlag(element){
    console.log(element.value);
    for(code in country_code){
        if(code == element.value){
            code = element.value;
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://wise.com/public-resources/assets/flags/rectangle/${code.toLowerCase()}.png`;
        }
    }
}

getButton.addEventListener("click", e => {
    e.preventDefault();
    getExchangeRate();
});

function getExchangeRate(){
    
    amountVal = amount.value;

    if(amountVal == "0" || amountVal == ""){
        amount.value = "1";
        amountVal = 1;
    }
    let url = `https://v6.exchangerate-api.com/v6/3e85f2d2baba474dafb64b8b/latest/${fromCurrency.value}`;
    fetch(url).then(response => response.json()).then(result => {
        console.log(result);
        resultconvert = result.conversion_rates[`${toCurrency.value}`];
        console.log(resultconvert);
        finalresult = resultconvert*amountVal;
        document.querySelector(".exchange-rate").textContent = `${amountVal} ${fromCurrency.value} = ${finalresult} ${toCurrency.value}`;
        
    })
}

// reverse

function reverse(){
    temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;

    loadFlag(fromCurrency);
    loadFlag(toCurrency);

    getExchangeRate();

}