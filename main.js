const creationWatchlistContainer = document.getElementById(
  "creation-watchlist-container"
);
const titleInput = document.getElementById("titleInput");
const episodeCountInput = document.getElementById("episodeCountInput");
const createWatchlistBtn = document.getElementById("create-watchlist-btn");
const deleteWatchlistBtn = document.getElementById("delete-watchlist-btn");
const h1Title = document.getElementById("title");

let watchlistDetailsContainer = document.getElementById(
  "watchlist-details-container"
);
let title = "";
let episodeCount = 0;

// Start watchlist creation on button click
createWatchlistBtn.addEventListener("click", createNewWatchlist);

// Create a new watchlist and update the UI
function createNewWatchlist() {
  title = titleInput.value;
  episodeCount = episodeCountInput.value;

  h1Title.textContent = title;

  for (let i = 1; i <= episodeCount; i++) {
    watchlistDetailsContainer.innerHTML += `
    <div class="episode">
      <p>قسمت ${i}</p>
      <button type="button">تماشا نشده</button>
    </div>
    `;
  }

  creationWatchlistContainer.classList.add("deactive");
  createWatchlistBtn.classList.add("deactive");

  watchlistDetailsContainer.classList.remove("deactive");
  deleteWatchlistBtn.classList.remove("deactive");
}
