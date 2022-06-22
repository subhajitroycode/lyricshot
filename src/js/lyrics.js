import { getLyrics } from "./lyricsAPI";
import { songDetails, lines } from "./script";

export const showLyrics = (value) => {
  const songName = value.querySelector("h3").innerText;
  const artistName = value.querySelector("p").innerText;
  const image = value.querySelector("img").src;
  const songId = value.querySelector("div").dataset.id;

  songDetails.innerHTML = "";
  lines.innerHTML = "";

  getLyrics(songId)
    .then((data) => {
      const h6 = document.createElement("h6");
      const img = document.createElement("img");
      const p = document.createElement("p");
      const div = document.createElement("div");
      const lyrics = data.lyrics.lines;

      h6.innerText = songName;
      p.innerText = artistName;
      img.src = image;
      div.classList.add("info-details");

      songDetails.appendChild(img);
      div.appendChild(h6);
      div.appendChild(p);
      songDetails.appendChild(div);

      const displayLines = lyrics
        .map((line) => {
          return `<p>${line.words}</p>`;
        })
        .join("\n");

      lines.innerHTML = displayLines;

      document.querySelector(".logo").classList.remove("hidden");
    })
    .catch((err) => alert(err.message));
};
