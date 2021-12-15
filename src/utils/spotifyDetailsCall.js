export const spotifyAlbumsCall = async (id, token) => {
  try {
    const url = `https://api.spotify.com/v1/albums/${id}`;

    const getSearch = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    let status = getSearch.status;
    localStorage.setItem("status", status);
    if (status === 401) localStorage.removeItem("token");

    return await getSearch.json();
  } catch (error) {
    console.log(error);
  }
};

export const spotifyTracksCall = async (id, token) => {
  try {
    const url = `https://api.spotify.com/v1/tracks/${id}`;

    const getSearch = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    let status = getSearch.status;
    localStorage.setItem("status", status);
    if (status === 401) localStorage.removeItem("token");

    return await getSearch.json();
  } catch (error) {
    console.log(error);
  }
};

export const spotifyArtistsCall = async (id, token) => {
  try {
    const url = `https://api.spotify.com/v1/artists/${id}`;

    const getSearch = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    let status = getSearch.status;
    localStorage.setItem("status", status);
    if (status === 401) localStorage.removeItem("token");

    return await getSearch.json();
  } catch (error) {
    console.log(error);
  }
};
