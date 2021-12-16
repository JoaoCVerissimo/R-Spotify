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

export const spotifyAlbumTracksCall = async (id, token) => {
  try {
    const url = `https://api.spotify.com/v1/albums/${id}/tracks`;

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

export const spotifySaveAlbumCall = async (id, token) => {
  try {
    const url = `https://api.spotify.com/v1/me/albums?ids=${id}`;

    const getSearch = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    let status = getSearch.status;
    localStorage.setItem("status", status);
    if (status === 401) localStorage.removeItem("token");

    return await getSearch;
  } catch (error) {
    console.log(error);
  }
};

// ------------------------------------------------------------------------------------------------------------------------------------------------ //

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

export const spotifySaveTracksCall = async (id, token) => {
  try {
    const url = `https://api.spotify.com/v1/me/tracks?ids=${id}`;

    const getSearch = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    let status = getSearch.status;
    localStorage.setItem("status", status);
    if (status === 401) localStorage.removeItem("token");

    return await getSearch;
  } catch (error) {
    console.log(error);
  }
};

// ------------------------------------------------------------------------------------------------------------------------------------------------ //

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

export const spotifyArtistTopTracksCall = async (id, token) => {
  try {
    const url = `https://api.spotify.com/v1/artists/${id}/top-tracks?market=PT`;

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

export const spotifyArtistAlbumsCall = async (id, token) => {
  try {
    const url = `https://api.spotify.com/v1/artists/${id}/albums`;

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

export const spotifyArtistFollowCall = async (id, token) => {
  try {
    const url = `https://api.spotify.com/v1/me/following?type=artist&ids=${id}`;

    const getSearch = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let status = getSearch.status;
    localStorage.setItem("status", status);
    if (status === 401) localStorage.removeItem("token");

    return await getSearch;
  } catch (error) {
    console.log(error);
  }
};

export const spotifyArtistUnfollowCall = async (id, token) => {
  try {
    const url = `https://api.spotify.com/v1/me/following?type=artist&ids=${id}`;

    const getSearch = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    let status = getSearch.status;
    localStorage.setItem("status", status);
    if (status === 401) localStorage.removeItem("token");

    return await getSearch;
  } catch (error) {
    console.log(error);
  }
};

// ------------------------------------------------------------------------------------------------------------------------------------------------ //
