const API_KEY = "vRG9qHyg-RUoHFqK52aVwH2Yf4BjcQ6jBot3_oNHfOA";
const API_URL = "https://api.unsplash.com";

export const searchPhotos = async ({ search }) => {
  if (search === "") return null;

  try {
    const response = await fetch(
      `${API_URL}/search/photos/?client_id=${API_KEY}&query=${search}&page=1`
    );
    const json = await response.json();

    const responsePhotos = json.results;

    return responsePhotos?.map((photo) => ({
      id: photo.id,
      url: photo.urls.small,
      author: photo.user.name,
    }));
  } catch (error) {
    throw new Error("Error getting movies");
  }
};
