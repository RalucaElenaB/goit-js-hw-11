import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export default function displayGallery(images) {
  const gallery = document.querySelector('.photo');
  const galleryMarkup = images.hits
    .map(
      image =>
        `<div class="photo-card">
            <a class="photo__link" href="${image.largeImageURL}">
              <img class="photo-card__image" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
            </a>
            <div class="info">
              <p class="info-item">
                <b>Likes</b><span class="likes">${image.likes}</span>
              </p>
              <p class="info-item">
                <b>Views</b><span class="views">${image.views}</span>
              </p>
              <p class="info-item">
                <b>Comments</b><span class="comments">${image.comments}</span>
              </p>
              <p class="info-item">
                <b>Downloads</b><span class="downloads">${image.downloads}</span>
              </p>
            </div>
        </div>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeEnd', galleryMarkup);
  simpleLightbox();
}

function simpleLightbox() {
  const galleryHandler = new SimpleLightbox('.photo-card a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  galleryHandler.on('show.simplelightbox');
  galleryHandler.refresh();
}
