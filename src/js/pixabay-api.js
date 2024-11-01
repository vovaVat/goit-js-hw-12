import axios from "axios";

const makeHTTPResponse = async (input, page) => {
  const myApi = "28678786-a2e7b218e16ae31de09ab66ee";
  const url = `https://pixabay.com/api/?key=${myApi}&q=${input}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${page}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
export default makeHTTPResponse;