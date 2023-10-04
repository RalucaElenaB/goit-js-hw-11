import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export default displayGallery = images => {
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
                <b>Likes</b>${image.likes}
              </p>
              <p class="info-item">
                <b>Views</b>${image.views}
              </p>
              <p class="info-item">
                <b>Comments</b>${image.comments}
              </p>
              <p class="info-item">
                <b>Downloads</b>${image.downloads}
              </p>
            </div>
        </div>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeEnd', galleryMarkup);
  simpleLightbox();
};

function simpleLightbox() {
  const galleryHandler = new SimpleLightbox('.photo-card a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  galleryHandler.on('show.simplelightbox');
  galleryHandler.refresh();
}
