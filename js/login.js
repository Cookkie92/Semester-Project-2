import { loginUser } from "./authApi.js";

const profileMenu = document.getElementById("profile-menu");

async function handleLogin() {
  const emailInput = document.getElementById("inputEmail");
  const passwordInput = document.getElementById("inputPassword");

  try {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const loginData = await loginUser(email, password);
    // localStorage.setItem("accessToken", loginData.accessToken);
    localStorage.setItem("ProfileData", JSON.stringify(loginData));

    console.log("Logged in successfully");
    // Redirect to another page or update the UI here
  } catch (error) {
    console.error("Error logging in:", error);
    // Display an error message or update the UI here
  }
}

function displayProfileMenu() {
  let localStorageProfileData = localStorage.getItem("ProfileData");
  if (localStorageProfileData === null) {
    profileMenu.innerHTML += `
    <ul class="navbar-nav ms-auto">
    <li class="nav-item">
      <a class="nav-link" href="login.html"
        ><i class="fas fa-user"></i> Login</a
      >
    </li>
  </ul>
    `;
  }
}

document.getElementById("login-form").addEventListener("submit", (event) => {
  event.preventDefault();
  handleLogin();
});
displayProfileMenu();
