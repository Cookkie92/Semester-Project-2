import { loginUser } from "./authApi.js";

async function handleLogin() {
  const emailInput = document.getElementById("inputEmail");
  const passwordInput = document.getElementById("inputPassword");

  try {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const loginData = await loginUser(email, password);
    localStorage.setItem("accessToken", loginData.accessToken);
    localStorage.setItem("ProfileData", JSON.stringify(loginData));

    console.log("Logged in successfully");
    // Redirect to another page or update the UI here
  } catch (error) {
    console.error("Error logging in:", error);
    // Display an error message or update the UI here
  }
}

document.getElementById("login-form").addEventListener("submit", (event) => {
  event.preventDefault();
  handleLogin();
});
