import { registerUser } from "./utils/authApi.js";

async function handleRegister() {
  const userNameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  try {
    const userName = userNameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const reponse = await registerUser(userName, email, password);

    
    const registerSucess = document.getElementById("register-sucess");
    if (reponse !== null) {
      registerSucess.style.display = "block";
      location.href = "login.html";
    }

   
  } catch (error) {
    console.error("Error register:", error);

    
  }
}

document.getElementById("register-form").addEventListener("submit", (event) => {
  event.preventDefault();
  handleRegister();
});
