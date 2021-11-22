const inputTop = document.querySelector(".input-top__number");
const inputBot = document.querySelector(".input-bot__number");
const tipAmount = document.querySelector(".con-box__txt-top");
const totalAmount = document.querySelector(".con-box__txt-bot");
const btns = document.querySelectorAll(".list-btn");
const inputCustom = document.querySelector(".input-custom");
const reset = document.querySelector(".con-box__btn");
const inputText = document.querySelector(".input-text");

const btn = [...btns];

let btnValue = 0,
  bill = 0,
  people = 0,
  tip;

// Functions to calculate tip, bill , display values of total amount, tip amount

const calcTip = function (tip) {
  console.log(tip, bill, people);
  if (tip !== 0 && bill !== 0) return bill * (tip / 100);
  if (bill === 0) return tip;
  if (tip === 0) return "";
};

const calcBill = function () {
  if (bill === 0) return "";
  if (bill !== 0) return bill;
};

const displayVal = function (value) {
  tipVal = Number(calcTip(value));
  billVal = Number(calcBill());

  console.log(tipVal, billVal);

  tipAmount.textContent = (people === 0 ? tipVal : tipVal / people).toFixed(2);
  totalAmount.textContent = (
    people === 0 ? billVal + tipVal : billVal / people + tipVal / people
  ).toFixed(2);
};

// Event listener to get input values from user

let activeBtn = null;
inputText.classList.add("hidden");

btn.forEach((el, i, arr) => {
  el.addEventListener("click", function (e) {
    btnValue = Number.parseInt(el.textContent);

    inputCustom.value = "";

    displayVal(btnValue);

    e.currentTarget.classList.add("active-btn");
    if (activeBtn !== null && activeBtn !== e.currentTarget) {
      activeBtn.classList.remove("active-btn");
    }
    activeBtn = e.currentTarget;
  });
});

document.addEventListener("input", function () {
  const billInput = Number(inputTop.value);
  const tipInput = Number(inputBot.value);
  const customTipInput = Number(inputCustom.value);

  const customTip =
    Number.isFinite(customTipInput) && customTipInput > 0 ? customTipInput : "";
  bill = Number.isFinite(billInput) ? billInput : "";
  people = Number.isInteger(tipInput) ? tipInput : "";

  if (tipInput <= 0) {
    inputBot.classList.add("error-input");
    inputText.classList.remove("hidden");
  } else {
    inputBot.classList.remove("error-input");
    inputText.classList.add("hidden");
  }

  if (customTip !== "") {
    btn.forEach((el) => el.classList.remove("active-btn"));
    displayVal(customTip);
  } else if (customTip === "") {
    displayVal(btnValue);
  }
});

// Event listener for resetting the calculator

reset.addEventListener("click", function () {
  inputTop.value = "";
  inputBot.value = "";
  inputCustom.value = "";
  tipAmount.textContent = "$0.00";
  totalAmount.textContent = "$0.00";
  btn.forEach((el) => el.classList.remove("active-btn"));
  inputText.classList.add("hidden");
  inputBot.classList.remove("error-input");
});
