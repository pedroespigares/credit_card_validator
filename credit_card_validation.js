function writeNumbers(numbers, digitsToWrite) {
  for (let i = 0; i < numbers.value.length; i++) {
    digitsToWrite[i].innerHTML = numbers.value[i];
  }
  document.getElementById("numbers").classList.add("focus");
}

function writeOwner(owner, ownerToWrite) {
  ownerToWrite.innerHTML = owner.value;
  document.getElementById("owner").classList.add("focus");
}

function writeMonth(month, monthToWrite) {
  monthToWrite.innerHTML = month.value;
  document.getElementById("date").classList.add("focus");
}

function writeYear(year, yearToWrite) {
  yearToWrite.innerHTML = year.value;
  document.getElementById("date").classList.add("focus");
}

function writeCVV(cvv, cvvToWrite) {
  cvvToWrite.innerHTML = cvv.value;
}

window.onload = () => {
  // Número de la tarjeta
  let cardNumber = document.getElementById("cardNumber");
  let creditNumbers = document.getElementsByClassName("creditNumber");
  cardNumber.addEventListener("keyup", () => {
    writeNumbers(cardNumber, creditNumbers);
  });
  cardNumber.addEventListener("blur", () => {
    document.getElementById("numbers").classList.remove("focus");
  });

  // Propietario de la tarjeta
  let owner = document.getElementById("cardOwner");
  let ownerName = document.getElementById("ownerName");
  owner.addEventListener("keyup", () => {
    ownerName.innerHTML = "";
    writeOwner(owner, ownerName);
  });
  owner.addEventListener("blur", () => {
    document.getElementById("owner").classList.remove("focus");
  });

  // Mes de expiración
  let month = document.getElementById("months");
  let cardMonth = document.getElementById("month");
  month.addEventListener("click", () => {
    writeMonth(month, cardMonth);
  });
  month.addEventListener("blur", () => {
    document.getElementById("date").classList.remove("focus");
  });

  // Año de expiración
  let year = document.getElementById("years");
  let cardYear = document.getElementById("year");
  year.addEventListener("click", () => {
    writeYear(year, cardYear);
  });
  year.addEventListener("blur", () => {
    document.getElementById("date").classList.remove("focus");
  });

  // Fecha de expiración

  // CVV
  let frontCreditCard = document.querySelector(".frontCreditCard");
  let backCreditCard = document.querySelector(".backCreditCard");
  let cvv = document.getElementById("cvv");
  let cardCVV = document.getElementById("cardCVV");

  cvv.addEventListener("focus", () => {
    frontCreditCard.classList.remove("rotateToRight");
    frontCreditCard.classList.add("rotateToLeft");
    setTimeout(() => {
      backCreditCard.classList.remove("rotateToLeft");
      backCreditCard.classList.add("rotateToRight");
    }, 500);
  });

  cvv.addEventListener("keyup", () => {
    writeCVV(cvv, cardCVV);
  });

  cvv.addEventListener("focusout", () => {
    backCreditCard.classList.remove("rotateToRight");
    backCreditCard.classList.add("rotateToLeft");
    setTimeout(() => {
      frontCreditCard.classList.remove("rotateToLeft");
      frontCreditCard.classList.add("rotateToRight");
    }, 500);
  });

  let submitButton = document.querySelector("button");

  submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    let expirationDate = new Date(year.value, month.value);
    let actualDate = new Date();

    let passedDate = expirationDate < actualDate;

    let cardExpression = new RegExp("^[0-9]{16}$");
    let cardNumberValue = cardNumber.value;
    console.log(cardNumberValue);
    let cardResult = cardExpression.test(cardNumberValue);

    let validMessage = document.getElementById("valid");

    if (!cardResult) {
      cardNumber.style.borderColor = "red";
      validMessage.innerHTML = "Credit Card not valid!";
      validMessage.style.backgroundColor = "lightcoral";
      validMessage.style.padding = "10px";
    } else if (passedDate || year.value === "MM" || month.value === "MM") {
      year.style.borderColor = "red";
      month.style.borderColor = "red";
      validMessage.innerHTML = "Credit Card not valid!";
      validMessage.style.backgroundColor = "lightcoral";
      validMessage.style.padding = "10px";
    } else {
      validMessage.innerHTML = "Valid Credit Card!";
      validMessage.style.backgroundColor = "lightgreen";
      validMessage.style.padding = "10px";
      cardNumber.style.borderColor = "lightgray";
      year.style.borderColor = "lightgray";
      month.style.borderColor = "lightgray";
    }
  });
};
