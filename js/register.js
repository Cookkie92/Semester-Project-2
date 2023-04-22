import { baseUrl } from "./settings/api.js";
const form = document.querySelector("form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const username = document.querySelector("#username");
const confirmPassword = document.querySelector("#confirm-password");
form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();
  const usernameValue = username.value.trim();
  if (
    emailValue.length === 0 ||
    passwordValue.length === 0 ||
    passwordValue != confirmPasswordValue
  ) {
    console.log("nonono");
    displayMessage("warning", "invalid values", ".message-container");
  }
  console.log(event);
  doRegister(usernameValue, emailValue, passwordValue);
}
async function doRegister(username, email, password) {
  const url = baseUrl + "/auction/auth/register";
  const data = JSON.stringify({
    name: username,
    email: email,
    password: password,
  });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.error) {
      displayMessage("warning", "Wrong email/Password", ".message-container");
    }
  } catch (error) {
    console.log(error);
  }
}
