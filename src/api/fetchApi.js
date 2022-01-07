const baseUrl = "https://agentrajat-generic-apis.herokuapp.com";
const pixabaySearchAPI = "/pixabay/search";

export const SearchPixabayImages = (query, page, perPage, successCb, errorCb) => {
    fetch(`${baseUrl}${pixabaySearchAPI}?q=${query}&image_type=photo&page=${page}&per_page=${perPage}`)
        .then(response => response.json())
        .then(data => successCb(data))
        .catch(error => errorCb(error));
}