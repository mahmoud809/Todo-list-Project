// Validation File

export const nameRegex = /^[A-Z]/;
export const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

export function validate(element, regex) {
  if (regex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.parentElement.nextElementSibling.classList.add("invisible");
    return true;
  }
  element.classList.add("is-invalid");
  element.classList.remove("is-valid");
  element.parentElement.nextElementSibling.classList.remove("invisible");
  return false;
}
