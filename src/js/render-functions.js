export function renderImages(images) {
  return images.map(image => `
      <a href="${image.largeImageURL}" class="gallery-item">
          <img src="${image.webformatURL}" alt="${image.tags}" class="gallery-image">
          <div class="info">
              <p><b>Likes</b> <span>${image.likes}</span></p>
              <p><b>Views</b> <span>${image.views}</span></p>
              <p><b>Comments</b> <span>${image.comments}</span></p>
              <p><b>Downloads</b> <span>${image.downloads}</span></p>
          </div>
      </a>
  `).join('');
}

export function clearGallery() {
  document.querySelector('.gallery').innerHTML = '';
}