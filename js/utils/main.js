export function logOut() {
  localStorage.removeItem("loggedUser");
  window.location.href = "./sign-in.html";
}

