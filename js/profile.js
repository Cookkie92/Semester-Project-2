// import { getProfile } from "./profilesApi.js";

async function populateAccountValues() {
  try {
    let localProfileData = localStorage.getItem("ProfileData");
    let profileData = JSON.parse(localProfileData);

    const userName = document.getElementById("username");
    const email = document.getElementById("email");
    const credits = document.getElementById("credits");
    const avatar = document.getElementById("avatar");

    userName.value = profileData.name;
    email.value = profileData.email;
    credits.value = profileData.credits;
    avatar.value = profileData.avatar;
  } catch (error) {
    console.error("Error fetching listings:", error);
    // Display an error message or update the UI here
  }
}

populateAccountValues();
