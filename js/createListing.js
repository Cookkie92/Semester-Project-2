import { getListing, createListing } from "./listingsApi.js";
import { getProfile } from "./profileApi.js";

let localProfileData = localStorage.getItem("ProfileData");
let profileData = JSON.parse(localProfileData);
const listingsTable = document.getElementById("listings-table");
const listingsTableBody = document.getElementById("listings-table-body");
const auctionDetailsSection = document.getElementById("auction-details");
const returnToListingsButton = document.getElementById(
  "return-to-listings-button"
);
const addListing = document.getElementById("add-listing");
const createListingBtn = document.getElementById("create-listing-btn");

// localStorage.setItem("ProfileData", JSON.stringify(profileData));
//createlistingtable
async function createMyListingTable() {
  const listings = await getProfile(
    profileData.name,
    profileData.accessToken,
    "/listings"
  );
  listingsTableBody.innerHTML = "";
  listings.forEach((listing) => {
    const row = document.createElement("tr");
    const titleCell = document.createElement("td");
    titleCell.textContent = listing.title;
    row.appendChild(titleCell);
    const descriptionCell = document.createElement("td");
    descriptionCell.textContent = listing.description;
    row.appendChild(descriptionCell);
    const priceCell = document.createElement("td");
    priceCell.textContent = listing.price;
    row.appendChild(priceCell);
    const auctionCell = document.createElement("td");
    const auctionButton = document.createElement("button");
    auctionButton.textContent = "View Auction";
    auctionButton.addEventListener("click", () => showAuctionDetails(listing));
    auctionCell.appendChild(auctionButton);
    row.appendChild(auctionCell);
    listingsTableBody.appendChild(row);
  });
}
//createlistings
async function postListing(event) {
  event.preventDefault();

  const listingData = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    endsAt: document.getElementById("ends-at").value,
  };
  await createListing(listingData, profileData.accessToken);
}

// A function to display details about the selected auction
async function showAuctionDetails(auctionDetails) {
  listingsTable.style.display = "none";
  auctionDetailsSection.style.display = "block";
  const listingId = auctionDetails.id;
  localStorage.setItem("listingId", listingId);
  const token = localStorage.getItem("accessToken");
  const listingDetails = await getListing(listingId, token);
  let highestBid = 0;

  if (listingDetails.bids && listingDetails.bids.length > 0) {
    highestBid = listingDetails.bids.reduce((prev, current) =>
      prev.amount > current.amount ? prev : current
    ).amount;
  }

  document.getElementById("description").value = listingDetails.description;

  document.getElementById("title").value = listingDetails.title;
  document.getElementById("ends-at").value = listingDetails.endsAt;
}

// A function to handle the submission of a bid

// Add an event listener to the "Return to Listings" button
returnToListingsButton.addEventListener("click", () => {
  listingsTable.style.display = "table";
  auctionDetailsSection.style.display = "none";
});
addListing.addEventListener("click", () => {
  listingsTable.style.display = "none";
  auctionDetailsSection.style.display = "block";
});

createListingBtn.addEventListener("click", async (event) => {
  listingsTable.style.display = "table";
  auctionDetailsSection.style.display = "none";
  await postListing(event);
  await createMyListingTable();
});
await createMyListingTable();
