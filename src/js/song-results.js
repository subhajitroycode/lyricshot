import { showLyrics } from "./lyrics";
import { ul, loading } from "./script";

export const showResults = (data) => {
  const tracks = data.tracks.items;
  loading.style.display = "none";
  ul.style.display = "block";

  tracks.forEach((track) => {
    const li = document.createElement("li");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    const div = document.createElement("div");
    const img = document.createElement("img");

    div.classList.add("infos");
    h3.innerText = track.data.name;
    p.innerText = track.data.artists.items[0].profile.name;
    img.src = track.data.albumOfTrack.coverArt.sources[1].url;
    div.dataset.id = track.data.id;

    div.appendChild(h3);
    div.appendChild(p);
    li.appendChild(img);
    li.appendChild(div);
    ul.appendChild(li);

    li.addEventListener("click", (e) => {
      document.querySelector(".search-results").classList.add("hidden");
      document.querySelector(".music-container").classList.remove("hidden");
      document.querySelector(".logo").classList.add("hidden");

      showLyrics(e.target.closest("li"));
    });
  });
};
