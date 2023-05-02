import {
  getAllListings,
  getListing,
  postListingBid,
} from "./utils/listingsApi.js";
import { getProfile } from "./utils/profileApi.js";

const listings = await getAllListings();
const listingsTable = document.getElementById("listings-table");
const listingsTableBody = document.getElementById("listings-table-body");
const auctionDetailsSection = document.getElementById("auction-details");
const returnToListingsButton = document.getElementById(
  "return-to-listings-button"
);

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

  document.getElementById("listing-media").src = listingDetails.media;
  document.getElementById("description").value = listingDetails.description;
  document.getElementById("seller").value = listingDetails.seller.name;
  document.getElementById("price").value = highestBid;
  document.getElementById("title").value = listingDetails.title;
  document.getElementById("ends-at").value = listingDetails.endsAt;
}

// A function to handle the submission of a bid
async function submitBid(event) {
  event.preventDefault();
  const token = localStorage.getItem("accessToken");
  const listingId = localStorage.getItem("listingId");
  const bidAmount = parseInt(document.getElementById("bid").value);
  await postListingBid(listingId, bidAmount, token);
  const listingDetails = await getListing(listingId, token);

  let highestBid = 0;

  if (listingDetails.bids && listingDetails.bids.length > 0) {
    highestBid = listingDetails.bids.reduce((prev, current) =>
      prev.amount > current.amount ? prev : current
    ).amount;
  }

  document.getElementById("price").value = highestBid;
  let localProfileData = localStorage.getItem("ProfileData");
  let profileData = JSON.parse(localProfileData);

  profileData.credits = (
    await getProfile(profileData.name, token, "/credits")
  ).credits;

  localStorage.setItem("ProfileData", JSON.stringify(profileData));
}

// Loop through the listings array and add each one to the table
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
  auctionButton.className = "btn btn-info";
  auctionButton.textContent = "View Auction";
  auctionButton.addEventListener("click", () => showAuctionDetails(listing));
  auctionCell.appendChild(auctionButton);
  row.appendChild(auctionCell);
  listingsTableBody.appendChild(row);
});

// Add an event listener to the bid submission form
const placeBidButton = document.getElementById("place-bid-button");
placeBidButton.addEventListener("click", submitBid);

// Add an event listener to the "Return to Listings" button
returnToListingsButton.addEventListener("click", () => {
  listingsTable.style.display = "table";
  auctionDetailsSection.style.display = "none";
});
