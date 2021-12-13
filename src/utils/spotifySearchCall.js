export const spotifySearchCall = async (paramsArray, token) => {
    try {
        const url = new URL("https://api.spotify.com/v1/search")

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
        
        return await getSearch.json();
    } catch (error) {
        console.log(error);
    }
};
