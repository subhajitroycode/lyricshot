import { searchSongs } from "./lyricsAPI";
import { showResults } from "./song-results";
import { changeColor } from "./bg-colors";

const key = config.SECRET_API_KEY;
const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");
const lyricsContainer = document.querySelector(".lyrics-container");
const displayLyrics = lyricsContainer.querySelector(".show-lyrics");
const songDetails = displayLyrics.querySelector(".song-details");
const lines = displayLyrics.querySelector(".lines");
const loading = document.getElementById("loading");
const bgContainer = document.querySelector(".bg-container");
const bgColors = bgContainer.querySelectorAll(".bg-color");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  document.querySelector(".music-container").classList.add("hidden");
  document.querySelector(".search-results").classList.remove("hidden");
  ul.innerHTML = "";
  ul.style.display = "none";
  loading.style.display = "flex";

  const queryString = input.value.trim().replace(/\s/g, "%20");
  searchSongs(queryString)
    .then((data) => {
      showResults(data);
    })
    .catch((err) => alert(err.message));
});

bgColors.forEach((bg) => {
  bg.addEventListener("click", (e) => {
    changeColor(e);
  });
});

export { songDetails, lines, ul, loading, lyricsContainer, displayLyrics, key };
