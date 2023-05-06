import { getProfile, updateProfileAvatar } from "./utils/profileApi.js";
const userName = document.getElementById("username");
const email = document.getElementById("email");
const credits = document.getElementById("credits");
const avatar = document.getElementById("avatar");
const avatarPreview = document.getElementById("avatar-preview");

let localStorageProfileData = localStorage.getItem("ProfileData");
let localProfileData = JSON.parse(localStorageProfileData);

async function populateAccountValues(profileData) {
  userName.value = profileData.name;
  email.value = profileData.email;
  credits.value = profileData.credits;

  if (profileData.avatar != null && profileData.avatar != "") {
    avatarPreview.src = profileData.avatar;
  }
}

async function getProfileData() {
  const profileData = await getProfile(
    localProfileData.name,
    localProfileData.accessToken
  );
  populateAccountValues(profileData);
}

async function saveAvatar() {
  await updateProfileAvatar(
    localProfileData.name,
    avatarPreview.src,
    localProfileData.accessToken
  );
}
avatar.addEventListener("blur", () => {
  if (avatar.value !== "") {
    avatarPreview.src = avatar.value;
  }
});

document
     .getElementById("account-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    await saveAvatar();
  });
await getProfileData();
