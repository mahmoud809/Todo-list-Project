
import {emailRegex, nameRegex, passwordRegex,validate,} from "./utils/validation.js";
    
// HTML ELEMENTS
const firstNameInput = document.getElementById("firstNameInput");
const lastNameInput = document.getElementById("lastNameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");

const registerBtn = document.getElementById("registerBtn");
const loginSuccessModal = document.querySelector(".login-success");

// App variable
const usersArr = JSON.parse(localStorage.getItem("users")) || [];

// Functions
function signup() {
if (
    validate(firstNameInput, nameRegex) &&
    validate(lastNameInput, nameRegex) &&
    validate(emailInput, emailRegex) &&
    validate(passwordInput, passwordRegex)
) {
    const isExist = usersArr.find(function (user) {
    return user.email === emailInput.value;
    });

    if (isExist) {
    alert("Email already Exist");
    return;
    }

    let user = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
    };

    usersArr.push(user);
    localStorage.setItem("users", JSON.stringify(usersArr));
    loginSuccessModal.classList.replace("d-none", "d-flex");
    clearInputs();
} else {
    alert("Invalid Data..!!❌");
}
}

function clearInputs(){
    firstNameInput.value = "",
    lastNameInput.value = "",
    emailInput.value = "",
    passwordInput.value = ""
}

// Events
registerBtn.addEventListener("click", signup);

firstNameInput.addEventListener("input", function () {
validate(firstNameInput, nameRegex);
});

lastNameInput.addEventListener("input", function () {
validate(lastNameInput, nameRegex);
});

emailInput.addEventListener("input", function () {
validate(emailInput, emailRegex);
});

passwordInput.addEventListener("input", function () {
validate(passwordInput, passwordRegex);
});
