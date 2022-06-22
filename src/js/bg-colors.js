import { lyricsContainer, displayLyrics } from "./script";

export const changeColor = (e) => {
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
};
