import { baseUrl } from "./settings/api.js";

async function getAllListings() {
  try {
    const response = await fetch(`${baseUrl}/auction/listings`, {
      method: "GET",
    });

    return await response.json();
  } catch (error) {
    console.error("Error fetching listings:", error);
    throw error;
  }
}

async function createListing(listingData, token) {
  try {
    const response = await fetch(`${baseUrl}/auction/listings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(listingData),
    });

    return await response.json();
  } catch (error) {
    console.error("Error creating listing:", error);
    throw error;
  }
}

async function updateListing(listingId, listingData, token) {
  try {
    const response = await fetch(`${baseUrl}/auction/listings/${listingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(listingData),
    });

    return await response.json();
  } catch (error) {
    console.error("Error updating listing:", error);
    throw error;
  }
}

async function getListing(listingId, listingData, token) {
  try {
    const response = await fetch(`${baseUrl}/auction/listings/${listingId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.error("Error updating listing:", error);
    throw error;
  }
}
async function deleteListing(listingId, listingData, token) {
  try {
    const response = await fetch(`${baseUrl}/auction/listings/${listingId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.error("Error updating listing:", error);
    throw error;
  }
}

export {
  getAllListings,
  createListing,
  updateListing,
  getListing,
  deleteListing,
};
