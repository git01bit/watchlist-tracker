const creationWatchlistContainer = document.getElementById(
  "creation-watchlist-container"
);
const watchlistDetailsContainer = document.getElementById(
  "watchlist-details-container"
);
const titleInput = document.getElementById("titleInput");
const episodeCountInput = document.getElementById("episodeCountInput");
const createWatchlistBtn = document.getElementById("create-watchlist-btn");
const deleteWatchlistBtn = document.getElementById("delete-watchlist-btn");
const h1Title = document.getElementById("title");
const episodeStatusBtn = document.querySelectorAll(".episode button");

let title = "";
let episodeCount = 0;
let episodeStatus = [];

// Set up event listeners for user interactions
window.addEventListener("DOMContentLoaded", loadFromLocalStorage);
createWatchlistBtn.addEventListener("click", createNewWatchlist);
watchlistDetailsContainer.addEventListener("click", updateEpisodeStatus);
deleteWatchlistBtn.addEventListener("click", deleteExistingWatchlist);
window.addEventListener("beforeunload", saveToLocalStorage);

// Create a new watchlist and update the UI
function createNewWatchlist() {
  title = titleInput.value;
  episodeCount = episodeCountInput.value;

  h1Title.textContent = title;

  for (let i = 1; i <= episodeCount; i++) {
    const episodeDiv = document.createElement("div");
    episodeDiv.classList.add("episode");
    episodeDiv.innerHTML += `
      <p>قسمت ${i}</p>
      <button type="button">تماشا نشده</button>
    `;

    watchlistDetailsContainer.appendChild(episodeDiv);
  }

  creationWatchlistContainer.classList.add("deactive");
  createWatchlistBtn.classList.add("deactive");

  watchlistDetailsContainer.classList.remove("deactive");
  deleteWatchlistBtn.classList.remove("deactive");
}

// Update seen status of episode
function updateEpisodeStatus(element) {
  if (element.target.tagName === "BUTTON") {
    if (!element.target.parentElement.classList.contains("seen")) {
      element.target.parentElement.classList.add("seen");
      element.target.textContent = "تماشا شده";
    } else {
      element.target.parentElement.classList.remove("seen");
      element.target.textContent = "تماشا نشده";
    }
  }
}

// Delete the existing watchlist and update the UI
function deleteExistingWatchlist() {
  h1Title.textContent = "";

  const deleteEpisodes = document.querySelectorAll(
    "#watchlist-details-container .episode"
  );
  deleteEpisodes.forEach((div) => {
    div.remove();
  });

  localStorage.clear();

  // Display watchlist creation form
  creationWatchlistContainer.classList.remove("deactive");
  createWatchlistBtn.classList.remove("deactive");

  // Hide Watchlist details view
  watchlistDetailsContainer.classList.add("deactive");
  deleteWatchlistBtn.classList.add("deactive");
}

// Save current state to localStorage on page unload (close or refresh)
function saveToLocalStorage() {
  title = document.getElementById("title").textContent;
  episodeCount = document.querySelectorAll(".episode");

  if (title) {
    for (let i = 0; i < episodeCount.length; i++) {
      if (episodeCount[i].classList.contains("seen")) {
        episodeStatus.push(true);
      } else {
        episodeStatus.push(false);
      }
    }

    localStorage.setItem("title", JSON.stringify(title));
    localStorage.setItem("episodeStatus", JSON.stringify(episodeStatus));
  }
}

// Load saved state from localStorage on page load
function loadFromLocalStorage() {
  const localTitle = JSON.parse(localStorage.getItem("title"));
  const localEpisodeStatus = JSON.parse(localStorage.getItem("episodeStatus"));

  if (localTitle && localEpisodeStatus) {
    // Hide watchlist creation form
    creationWatchlistContainer.classList.add("deactive");
    createWatchlistBtn.classList.add("deactive");

    // Display Watchlist details view
    watchlistDetailsContainer.classList.remove("deactive");
    deleteWatchlistBtn.classList.remove("deactive");

    h1Title.textContent = localTitle;

    for (let i = 0; i < localEpisodeStatus.length; i++) {
      console.log(localEpisodeStatus[i]);

      if (localEpisodeStatus[i]) {
        const episodeDiv = document.createElement("div");
        episodeDiv.classList.add("episode");
        episodeDiv.classList.add("seen");
        episodeDiv.innerHTML += `
          <p>قسمت ${i + 1}</p>
          <button type="button">تماشا شده</button>
        `;

        watchlistDetailsContainer.appendChild(episodeDiv);
      } else {
        const episodeDiv = document.createElement("div");
        episodeDiv.classList.add("episode");
        episodeDiv.innerHTML += `
          <p>قسمت ${i + 1}</p>
          <button type="button">تماشا نشده</button>
        `;

        watchlistDetailsContainer.appendChild(episodeDiv);
      }
    }
  }
}
