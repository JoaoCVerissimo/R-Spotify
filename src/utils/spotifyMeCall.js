export const spotifyFollowedArtistCall = async (paramsArray, token) => {
    try {
        const url = new URL("https://api.spotify.com/v1/me/top/artists");

        for(const item of paramsArray){
            const key = Object.keys(item);
            url.searchParams.append(key, item[key]);
        }

        const getSearch = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        let status = getSearch.status;
        window.localStorage.setItem("status", status);
        
        return await getSearch.json();
    } catch (error) {
        console.log(error);
    }
};

export const spotifySavedTracksCall = async (paramsArray, token) => {
    try {
        const url = new URL("https://api.spotify.com/v1/me/tracks");

        for(const item of paramsArray){
            const key = Object.keys(item);
            url.searchParams.append(key, item[key]);
        }

        const getSearch = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        let status = getSearch.status;
        window.localStorage.setItem("status", status);
        
        return await getSearch.json();
    } catch (error) {
        console.log(error);
    }
};

export const spotifyAlbumsTracksCall = async (paramsArray, token) => {
    try {
        const url = new URL("https://api.spotify.com/v1/me/albums");

        for(const item of paramsArray){
            const key = Object.keys(item);
            url.searchParams.append(key, item[key]);
        }

        const getSearch = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        let status = getSearch.status;
        window.localStorage.setItem("status", status);
        
        return await getSearch.json();
    } catch (error) {
        console.log(error);
    }
};
