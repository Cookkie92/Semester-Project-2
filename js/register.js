/* <form>
        <div class="mb-3">
          <label for="username" class="form-label">Username:</label>
          <input
            type="text"
            class="form-control"
            id="username"
            placeholder="Enter username"
          />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email:</label>
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="Enter email"
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password:</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Enter password"
          />
        </div>
        <div class="mb-3">
          <label for="confirm-password" class="form-label"
            >Confirm Password:</label
          >
          <input
            type="password"
            class="form-control"
            id="confirm-password"
            placeholder="Confirm password"
          />
        </div>confirm-password
        <button type="submit" class="btn btn-primary">Submit</button>
      </form> */
import { baseUrl } from "./settings/api";
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
  doLogin(usernameValue, emailValue, passwordValue);
}
async function doLogin(username, email, password) {
  const url = baseUrl + "social/auth/register";
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
