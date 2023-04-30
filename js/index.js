function createNav() {
  document.body.insertAdjacentHTML(
    "afterbegin",
    `
  <header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="index.html">Bidbois</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        

        <div class="dropdown navbar-nav ms-auto" id="profile-menu"></div>
      </div>
    </div>
  </nav>
  </header>
    `
  );
}

function displayProfileMenu() {
  const profileMenu = document.getElementById("profile-menu");
  let localStorageProfileData = localStorage.getItem("ProfileData");
  if (localStorageProfileData === null) {
    profileMenu.innerHTML += `
      <ul class="navbar-nav ms-auto">
      <li class="nav-item">
        <a class="nav-link" href="login.html"
          ><i class="fas fa-user"></i> Login</a
        >
      </li>
    </ul>
      `;
  } else {
    profileMenu.innerHTML += `
    <a
    class="btn btn-secondary dropdown-toggle"
    href="#"
    role="button"
    id="accountDropdown"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    <i class="fas fa-user"></i> Profile
  </a>
  <ul
    class="dropdown-menu dropdown-menu-end"
    aria-labelledby="accountDropdown"
  >
  <li class="nav-item">
    <a class="dropdown-item" href="createlisting.html">My Auctions</a>
  </li>
    <li class="nav-item">
      <a class="dropdown-item" href="profile.html"> View Profile</a>
    </li>
    
    <li>
      <button class="dropdown-item" id="logOutBtn" type="button">Logout</button>
    </li>
  </ul>
    `;

    document.getElementById("logOutBtn").addEventListener("click", (event) => {
      event.preventDefault();
      localStorage.clear();
    });
  }
}

createNav();
displayProfileMenu();
