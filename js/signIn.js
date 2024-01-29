import { emailRegex, passwordRegex, validate } from "./utils/validation.js";

// HTML ELEMENT
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const loginBtn = document.querySelector(".btn-sign-in");
const tryBtn = document.querySelector(".btn-try");
const loginFailedModal = document.querySelector(".login-failed");

// APP VARIABLES
const usersArr = JSON.parse(localStorage.getItem("users")) || [];

// FUNCTIONS
function login() {
  if (
    validate(emailInput, emailRegex) &&
    validate(passwordInput, passwordRegex)
  ) {
    const user = usersArr.find(function (user) {
      return (
        user.email === emailInput.value && user.password === passwordInput.value
      );
    });

    if (user) {
      localStorage.setItem("loggedUser", true);
      location.href = "./index.html";
      return;
    }

    loginFailedModal.classList.replace("d-none", "d-flex");
  }
}
// EVENTS
loginBtn.addEventListener("click", login);
tryBtn.addEventListener("click", function () {
  loginFailedModal.classList.replace("d-flex", "d-none");
  emailInput.classList.remove("is-valid");
  emailInput.value = "";
  passwordInput.classList.remove("is-valid");
  passwordInput.value = "";
});

emailInput.addEventListener("input", function () {
  validate(emailInput, emailRegex);
});

passwordInput.addEventListener("input", function () {
  validate(passwordInput, passwordRegex);
});
