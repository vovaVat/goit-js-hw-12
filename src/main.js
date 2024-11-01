import makeHTTPResponse from "./js/pixabay-api";
import { renderImages, clearGallery } from './js/render-functions';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");
const loader = document.querySelector("#loader");
const lightbox = new SimpleLightbox('.gallery a');
const loaderMore= document.querySelector(".loader-more.hidden");
const loadButton = document.querySelector('.load-button.hidden');

let pageNum = 1;
let query = "";
let totalHits = 0;
let loadedHits = 0;

loadButton.classList.add("hidden");
loaderMore.classList.add("hidden");

form.addEventListener("submit", event => {
  event.preventDefault();
  query = document.querySelector('.input').value.trim();

  if (!query) {
    iziToast.warning({
      message: 'Please enter a search term',
      position: 'topRight',
      backgroundColor: '#FF0000',
      color: 'white',
      timeout: 5000,
    });
    return;
  }

  clearGallery();
  loadButton.classList.add("hidden");
  loader.classList.remove("hidden");
  pageNum = 1;
  loadedHits = 0;

  makeHTTPResponse(query, pageNum)
    .then(data => {
      totalHits = data.totalHits;
      loadedHits = data.hits.length;

      if (data.hits.length === 0) {
        iziToast.info({
          message: "Sorry, there are no images matching your search query. Please try again!",
          position: 'topRight',
          backgroundColor: '#EF4040',
          color: 'white',
          timeout: 5000,
        });
        return;
      }

      gallery.innerHTML = renderImages(data.hits);
      pageNum++;
      lightbox.refresh();

      if (loadedHits < totalHits) {
        loadButton.classList.remove("hidden");
      }
    })
    .catch(error => {
      iziToast.error({
        message: 'Error fetching images. Please try again later.',
        position: 'topRight',
        backgroundColor: '#FF0000',
        color: 'white',
        timeout: 5000,
      });
    })
    .finally(() => {
      loader.classList.add("hidden");
    });
});

loadButton.addEventListener("click", () => {
  loadButton.classList.add("hidden");
  loaderMore.classList.remove("hidden")

  makeHTTPResponse(query, pageNum)
    .then(data => {
      loadedHits += data.hits.length;

      if (loadedHits >= totalHits) {
        loadButton.classList.add("hidden");
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
          color: 'white',
          timeout: 5000,
        });
      }

      gallery.insertAdjacentHTML('beforeend', renderImages(data.hits));
      pageNum++;
      lightbox.refresh();
    })
    .catch(error => {

    })
    .finally(() =>{
      const rect= document.querySelector(".gallery-item").getBoundingClientRect().height;
      loaderMore.classList.add("hidden");
      if (loadedHits < totalHits){
        loadButton.classList.remove("hidden");
        window.scrollBy({
          top: rect * 2,
          left: 0,
          behavior: "smooth",
        });
      }
    });
});