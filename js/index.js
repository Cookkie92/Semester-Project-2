//login
import { baseUrl } from "./settings/api.js";

const form = document.querySelector("form");
const email = document.querySelector("#exampleInputEmail1");
const password = document.querySelector("#exampleInputPassword1");
// const message = document.querySelector(".message-container");

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  //   message.innerHTML = "";

  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  if (emailValue.length === 0 || passwordValue.length === 0) {
    console.log("nonono");
    displayMessage("warning", "invalid values", ".message-container");
  }

  doLogin(emailValue, passwordValue);
}

async function doLogin(email, password) {
  const url = baseUrl + "social/auth/login";
  const data = JSON.stringify({ email: email, password: password });

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

    if (json.user && json.jwt) {
      console.log(json);
      saveToken(json.jwt);
      saveUser(json.user);

      location.href = "account.html";
    }

    if (json.error) {
      displayMessage("warning", "Wrong email/Password", ".message-container");
    }
  } catch (error) {
    console.log(error);
  }
}

//Storage
const tokenKey = "token";
const userKey = "user";

export function saveToken(token) {
  saveToStorage(tokenKey, token);
}
export function getToken() {
  return retrieveStorage();
}
export function saveUser(user) {
  saveToStorage(userKey, user);
}

export function getUsername() {
  const user = retrieveStorage(userKey);

  if (user) {
    return user.username;
  }
  return null;
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function retrieveStorage(key) {
  const value = localStorage.getItem(key);

  if (!value) {
    return [];
  }

  return JSON.parse(value);
}
