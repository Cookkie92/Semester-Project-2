import { baseUrl } from "../../settings/api.js";
async function getAllProfiles() {
  try {
    const response = await fetch(`${baseUrl}/auction/profiles`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching profiles:", error);
    throw error;
  }
}

async function updateProfileAvatar(profileName, avatar, token) {
  /* Body below, string is bitarray
         {
            "avatar": "string"
        }
    */
  try {
    const response = await fetch(
      `${baseUrl}/auction/profiles/${profileName}/media`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ avatar }),
      }
    );

    return await response.json();
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}

async function getProfile(profileName, token, options = "") {
  //Options for profiles is /listings, /bids and /credits and is optional
  try {
    const response = await fetch(
      `${baseUrl}/auction/profiles/${profileName}${options}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return await response.json();
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}

export { getAllProfiles, updateProfileAvatar, getProfile };
