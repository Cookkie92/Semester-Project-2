import { loginUser } from "./utils/authApi.js";

async function handleLogin() {
  const emailInput = document.getElementById("inputEmail");
  const passwordInput = document.getElementById("inputPassword");

  try {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const loginData = await loginUser(email, password);
    localStorage.setItem("ProfileData", JSON.stringify(loginData));

    console.log("Logged in successfully");
   
  } catch (error) {
    console.error("Error logging in:", error);
   
  }
}

document
  .getElementById("login-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    await handleLogin();
    window.location.assign("index.html");
  });
displayProfileMenu();
