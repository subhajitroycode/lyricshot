const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "ab83087b2cmsh1a40d77ab05f046p12dc43jsn5b20114a3dfd",
    "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
  },
};

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");
const lyricsContainer = document.querySelector(".lyrics-container");
const displayLyrics = lyricsContainer.querySelector(".show-lyrics");
const songDetails = displayLyrics.querySelector(".song-details");
const lines = displayLyrics.querySelector(".lines");
const loading = document.getElementById("loading");
const bgContainer = document.querySelector(".bg-container");

const searchSongs = async (queryValue) => {
  let response = await fetch(
    `https://spotify23.p.rapidapi.com/search/?q=${queryValue}&type=multi&offset=0&limit=10&numberOfTopResults=10`,
    options
  );

  if (response.status !== 200)
    throw new Error("ERROR 404: Cannot fetch the data");

  return await response.json();
};

const getLyrics = async (id) => {
  let response = await fetch(
    `https://spotify23.p.rapidapi.com/track_lyrics/?id=${id}`,
    options
  );

  if (response.status !== 200)
    throw new Error("ERROR 404: Cannot fetch the data");

  return await response.json();
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  document.querySelector(".second-container").classList.add("hidden");
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

const showResults = (data) => {
  const tracks = data.tracks.items;
  // let id = null;
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
      document.querySelector(".second-container").classList.remove("hidden");
      document.querySelector(".logo").classList.add("hidden");

      showLyrics(e.target.closest("li"));
    });
    // console.log(track);
  });
};

const showLyrics = (value) => {
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

const bgColors = bgContainer.querySelectorAll(".bg-color");

bgColors.forEach((bg) => {
  bg.addEventListener("click", (e) => {
    displayLyrics.style.backgroundColor = "transparent";
    switch (e.target.dataset.color) {
      case "black":
        lyricsContainer.style.backgroundColor = "#292929";
        displayLyrics.style.backgroundColor = "#111111";
        break;

      case "red":
        lyricsContainer.style.backgroundColor = "#ce0025";
        break;

      case "purple":
        lyricsContainer.style.backgroundColor = "#2a283d";
        break;

      case "brown":
        lyricsContainer.style.backgroundColor = "#8b6952";
        break;

      case "smalt-blue":
        lyricsContainer.style.backgroundColor = "#56808f";
        break;

      case "coral-tree":
        lyricsContainer.style.backgroundColor = "#aa6a7b";
        break;

      case "brown-grey":
        lyricsContainer.style.backgroundColor = "#988a5f";
        break;

      case "default":
        lyricsContainer.style.backgroundColor = "#91908C";
        break;
    }
  });
});
