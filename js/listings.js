import { getAllListings } from "./listingsApi.js";

const listings = await getAllListings();
const listingsTable = document.getElementById("listings-table");
const listingsTableBody = document.getElementById("listings-table-body");
const auctionDetailsSection = document.getElementById("auction-details");
const returnToListingsButton = document.getElementById(
  "return-to-listings-button"
);

// A function to display details about the selected auction
function showAuctionDetails(auctionDetails) {
  listingsTable.style.display = "none";
  auctionDetailsSection.style.display = "block";
  document.getElementById("description").value = auctionDetails.description;
  // document.getElementById('price').textContent = `Price: ${auctionDetails}`;
  document.getElementById("title").value = auctionDetails.title;
}

// A function to handle the submission of a bid
function submitBid(event) {
  event.preventDefault();
  const bidAmount = document.getElementById("bid-amount").value;
  // TODO: Handle the submission of the bid
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
