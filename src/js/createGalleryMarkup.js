const gallery = document.querySelector('.gallery');

function createGalleryMarkup(pictures) {
  const markup = pictures
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return ` <li class="gallery__item">
          <a class="gallery__link" href="${largeImageURL}">
      <div class="gallery__photo-card">
         <img class="gallery__image"src="${webformatURL}" alt="${tags}" loading="lazy"/>
      </div>
      <div class="gallery__info">
         <p class="info__item">
             <span class="info__item-name">Likes</span><br>
            <span class="info__item-data">${likes}</span>
         </p>
         <p class="info__item">
             <span class="info__item-name">Views</span><br>
             <span class="info__item-data">${views}</span>
         </p>
         <p class="info__item">
             <span class="info__item-name">Comments</span><br>
             <span class="info__item-data">${comments}</span>
         </p>
        <p class="info__item">
             <span class="info__item-name">Downloads</span><br>
             <span class="info__item-data">${downloads}</span>
         </p>
      </div>
         </a>
     </li>`;
      }
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}

export { createGalleryMarkup };
