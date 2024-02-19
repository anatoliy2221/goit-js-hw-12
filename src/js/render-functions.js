export function imageTemplate(image) {
  const {
    largeImageURL,
    webformatURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = image;
  return `<li class="gallery-item">
            <a class="gallery-link" href="${largeImageURL}">
              <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
            </a>
              <ul class="list-content">      
                  <li class="list-text"><p>Likes <span>${likes}</span></p></li>
                  <li class="list-text"><p>Views <span>${views}</span></p></li>
                  <li class="list-text"><p>Comments <span>${comments}</span></p></li>
                  <li class="list-text"><p>Downloads <span>${downloads}</span></p></li>
              </ul>
          </li>`;
}

export function imagesTemplate(images) {
  return images.map(imageTemplate).join('');
}
