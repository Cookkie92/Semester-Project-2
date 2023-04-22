import { registerUser } from "./authApi.js";

async function handleRegister() {
  const userNameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  try {
    const userName = userNameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const reponse = await registerUser(userName, email, password);

    console.log("Logged in successfully");
    const registerSucess = document.getElementById("register-sucess");
    if (reponse.name) {
      registerSucess.style.display = "block";
      location.href = "login.html";
    }

    // Redirect to another page or update the UI here
  } catch (error) {
    console.error("Error logging in:", error);

    // Display an error message or update the UI here
  }
}

document.getElementById("register-form").addEventListener("submit", (event) => {
  event.preventDefault();
  handleRegister();
});
