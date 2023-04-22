import { baseUrl } from "./settings/api.js";

async function getAllListings() {
  try {
    const response = await fetch(
      `${baseUrl}/auction/listings?sortOrder=desc&_active=true&_seller=false&_bids=false`,
      {
        method: "GET",
      }
    );

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

async function getListing(listingId, token) {
  try {
    const response = await fetch(
      `${baseUrl}/auction/listings/${listingId}?_seller=true&_bids=true`,
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
    console.error("Error updating listing:", error);
    throw error;
  }
}
async function deleteListing(listingId, token) {
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

async function postListingBid(listingId, amount, token) {
  try {
    const response = await fetch(
      `${baseUrl}/auction/listings/${listingId}/bids`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount }),
      }
    );

    return await response.json();
  } catch (error) {
    console.error("Error Creating listing:", error);
    throw error;
  }
}

export {
  getAllListings,
  createListing,
  updateListing,
  getListing,
  deleteListing,
  postListingBid,
};
