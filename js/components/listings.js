import {
  getAllListings,
  getListing,
  postListingBid,
} from "./utils/listingsApi.js";
import { getProfile } from "./utils/profileApi.js";
let profileData = JSON.parse(localStorage.getItem("ProfileData"));
const listings = await getAllListings();
const listingsTable = document.getElementById("listings-table");
const listingsTableBody = document.getElementById("listings-table-body");
const auctionDetailsSection = document.getElementById("auction-details");
const returnToListingsButton = document.getElementById(
  "return-to-listings-button"
);

async function showAuctionDetails(auctionDetails) {
  listingsTable.style.display = "none";
  auctionDetailsSection.style.display = "block";
  const listingId = auctionDetails.id;
  localStorage.setItem("listingId", listingId);
  const listingDetails = await getListing(listingId);
  let highestBid = 0;

  if (listingDetails.bids && listingDetails.bids.length > 0) {
    highestBid = listingDetails.bids.reduce((prev, current) =>
      prev.amount > current.amount ? prev : current
    ).amount;
  }

  document.getElementById("listing-media").src = listingDetails.media;
  document.getElementById("description").value = listingDetails.description;
  document.getElementById("seller").value = listingDetails.seller.name;
  document.getElementById("avatar").src = listingDetails.seller.avatar;
  document.getElementById("price").value = highestBid;
  document.getElementById("title").value = listingDetails.title;
  document.getElementById("ends-at").value = listingDetails.endsAt;
}

// A function to handle the submission of a bid
async function submitBid(event) {
  event.preventDefault();

  const listingId = localStorage.getItem("listingId");
  const bidAmount = parseInt(document.getElementById("bid").value);
  await postListingBid(listingId, bidAmount, profileData.accessToken);
  const listingDetails = await getListing(listingId, profileData.accessToken);

  let highestBid = 0;

  if (listingDetails.bids && listingDetails.bids.length > 0) {
    highestBid = listingDetails.bids.reduce((prev, current) =>
      prev.amount > current.amount ? prev : current
    ).amount;
  }

  document.getElementById("price").value = highestBid;
 
  profileData.credits = (
    await getProfile(profileData.name, profileData.accessToken, "/credits")
  ).credits;

  localStorage.setItem("ProfileData", JSON.stringify(profileData));
}

// Loop through the listings array and add each one to the site
listings.forEach((listing) => {
  if(listing.media !== ""){
    const row = document.createElement("div");
    row.className = "listings-card";
    const mediaCell = document.createElement("img");
    mediaCell.src = listing.media;
    row.appendChild(mediaCell);
    mediaCell.className = "listing-img";
    const titleCell = document.createElement("h4");
    titleCell.textContent = listing.title;
    row.appendChild(titleCell);
    const priceCell = document.createElement("p");
    priceCell.textContent = listing.price;
    row.appendChild(priceCell);
    const auctionCell = document.createElement("p");
    const auctionButton = document.createElement("button");
    auctionButton.className = "btn btn-primary";
    auctionButton.textContent = "View Auction";
    auctionButton.addEventListener("click", () => showAuctionDetails(listing));
    auctionCell.appendChild(auctionButton);
    row.appendChild(auctionCell);
    listingsTableBody.appendChild(row);

}
});



// Add an event listener to the bid submission form
const placeBidButton = document.getElementById("place-bid-button");
placeBidButton.addEventListener("click", submitBid);

// Add an event listener to the "Return to Listings" button
returnToListingsButton.addEventListener("click", () => {
  listingsTable.style.display = "block";
  auctionDetailsSection.style.display = "none";
});
