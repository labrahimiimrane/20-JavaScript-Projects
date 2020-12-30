const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const cPassword = document.getElementById("c-password");

//Show Error Message
function showError(input, message) {
  const formControl = input.parentElement;

  formControl.className = "input error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

//Show Success message
function showSuccess(input) {
  const formControl = input.parentElement;

  formControl.classList.add("success");
}

//Check Required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// Get Field Name
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check Input Lenght
function checkLenghth(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters `
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than  ${max} characters `
    );
  } else {
    showSuccess(input);
  }
}

// Check E-mail Is Valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "E-mail is not Valid");
  }
}

// Check Password Match
function checkPasswordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkRequired([username, email, password, cPassword]);
  checkLenghth(username, 3, 15);
  checkLenghth(password, 8, 25);
  checkEmail(email);
  checkPasswordMatch(password, cPassword);
});
