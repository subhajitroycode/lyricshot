const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "ab83087b2cmsh1a40d77ab05f046p12dc43jsn5b20114a3dfd",
    "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
  },
};

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

export { searchSongs, getLyrics };
