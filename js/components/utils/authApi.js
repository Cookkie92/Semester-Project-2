import { baseUrl } from "../../settings/api.js";

async function loginUser(email, password) {
  try {
    const response = await fetch(`${baseUrl}/auction/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

async function registerUser(name, email, password) {
  try {
    const response = await fetch(`${baseUrl}/auction/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
}

export { loginUser, registerUser };
