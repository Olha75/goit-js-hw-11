import axios from "axios";
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";



const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;

form.addEventListener('submit', handleFormSubmit);
loadMoreBtn.addEventListener('click', loadMoreImages);

async function handleFormSubmit(event) {
  event.preventDefault();
  const searchQuery = event.currentTarget.elements.searchQuery.value;

  if (searchQuery.trim() === '') {
    await Notiflix.Notify.failure('Введіть ключове слово');
    return;
  }

  page = 1;
  clearGallery();
  try {
    await fetchImages(searchQuery);
  } catch (error) {
    console.error('Error handling form submit:', error);
  }
}

async function loadMoreImages() {
  page += 1;
  const searchQuery = form.elements.searchQuery.value;
  try {
    await fetchImages(searchQuery);
  } catch (error) {
    console.error('Вибачте, під час завантаження додаткових зображень виникла помилка:', error);
  }
}
  
function clearGallery() {
  gallery.innerHTML = '';
}

function fetchImages(searchQuery) {
  const key = '35827866-cac2bfdbcf92b350627521ced';
  const perPage = 40;
  const baseUrl = 'https://pixabay.com/api/';
  const url = `${baseUrl}?key=${key}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  axios.get(url)
    .then(response => {
      const data = response.data;

      if (data.hits.length === 0) {
        Notiflix.Notify.info("На жаль, немає зображень, які відповідають вашому пошуковому запиту. Будь ласка, спробуйте ще раз.");
        return;
      }
      totalHits = data.totalHits;
      createImageCards(data.hits);
      showLoadMoreBtn();
      initLightbox();
    })
    .catch(error => {
      console.error('Помилка отримання зображень:', error);
    });
}

function createImageCards(images) {
  const cardsMarkup = images.map(image => createImageCardMarkup(image)).join('');
  gallery.insertAdjacentHTML('beforeend', cardsMarkup);
}

function createImageCardMarkup(image) {
  return `
    <div class="photo-card">
      <a href="${image.largeImageURL}" data-lightbox="gallery">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item"><b>Likes:❤️ </b> ${image.likes}</p>
        <p class="info-item"><b>Views:</b> ${image.views}</p>
        <p class="info-item"><b>Comments:</b> ${image.comments}</p>
        <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
      </div>
    </div>
  `;
}

function showLoadMoreBtn() {
  const shouldShow = totalHits > 40;
  loadMoreBtn.classList.toggle('hidden', !shouldShow);
}

function initLightbox() {
  new SimpleLightbox('.gallery a', {
    captions: true,
    captionDelay: 250,
  });
}

