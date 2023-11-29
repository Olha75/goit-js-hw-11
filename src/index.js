import axios from "axios";
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// const API_KEY = '35827866-cac2bfdbcf92b350627521ced';
// const API_URL = 'https://pixabay.com/api/';
// const perPage = 40;

// const form = document.getElementById('search-form');
// const gallery = document.querySelector('.gallery');
// const loadMoreBtn = document.querySelector('.load-more');

// let page = 1;
// let currentSearchQuery = '';

// form.addEventListener('submit', handleFormSubmit);
// loadMoreBtn.addEventListener('click', loadMoreImages);

// function handleFormSubmit(event) {
//   event.preventDefault();

//   const formData = new FormData(event.currentTarget);
//   const searchQuery = formData.get('searchQuery');

//   if (searchQuery.trim() === '') {
//     Notiflix.Notify.warning('Please enter a search query.');
//     return;
//   }

//   if (searchQuery !== currentSearchQuery) {
//     clearGallery();
//     page = 1;
//     currentSearchQuery = searchQuery;
//   }

//   fetchImages(searchQuery, page);
// }

// function fetchImages(query, pageNum) {
//   const url = `${API_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNum}&per_page=${perPage}`;

//   fetch(url)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`Failed to fetch images. Status: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then(data => {
//       if (data.hits.length === 0 && pageNum === 1) {
//         Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//         return;
//       }

//       if (data.hits.length === 0 && pageNum > 1) {
//         Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
//         return;
//       }

//       renderImages(data.hits);
//       page += 1;
//       showLoadMoreBtn();
//     })
//     .catch(error => {
//       console.error('Error fetching images:', error);
//       Notiflix.Notify.failure('Oops! Something went wrong. Please try again later.');
//     });
// }

// function renderImages(images) {
//   const cardsMarkup = images
//     .map(image => createImageCardMarkup(image))
//     .join('');

//   gallery.insertAdjacentHTML('beforeend', cardsMarkup);

//   images.forEach(image => {
//     const imgElement = gallery.querySelector(`[data-src="${image.webformatURL}"]`);
//     imgElement.addEventListener('load', handleImageLoad);
//     imgElement.addEventListener('error', handleImageError);
//   });
// }

// function createImageCardMarkup({ webformatURL, likes, views, comments, downloads }) {
//   return `
//     <div class="photo-card">
//       <img data-src="${webformatURL}" alt="" loading="lazy" />
//       <div class="info">
//         <p class="info-item"><b>Likes:</b> ${likes}</p>
//         <p class="info-item"><b>Views:</b> ${views}</p>
//         <p class="info-item"><b>Comments:</b> ${comments}</p>
//         <p class="info-item"><b>Downloads:</b> ${downloads}</p>
//       </div>
//     </div>
//   `;
// }

// function clearGallery() {
//   gallery.innerHTML = '';
// }

// function showLoadMoreBtn() {
//   loadMoreBtn.classList.remove('hidden');
// }

// function hideLoadMoreBtn() {
//   loadMoreBtn.classList.add('hidden');
// }

// function loadMoreImages() {
//   fetchImages(currentSearchQuery, page);
// }

// hideLoadMoreBtn();

// function handleImageLoad(event) {
//     event.target.removeAttribute('data-src');
//   }

//   function handleImageError(event) {
//     event.target.src = '/src/images/dly pomulku.jpg';
//     event.target.removeAttribute('data-src');
// }

//--------------------------------------------------------------------//

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;

form.addEventListener('submit', handleFormSubmit);
loadMoreBtn.addEventListener('click', loadMoreImages);

function handleFormSubmit(event) {
  event.preventDefault();
  
  const searchQuery = event.currentTarget.elements.searchQuery.value;

  if (searchQuery.trim() === '') {
    Notiflix.Notify.failure('Введіть ключове слово');
    return;
  }

  page = 1;
  clearGallery();
  fetchImages(searchQuery);
}

function loadMoreImages() {
  page += 1;
  const searchQuery = form.elements.searchQuery.value;
  fetchImages(searchQuery);
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
        Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");
        return;
      }

      createImageCards(data.hits);
      showLoadMoreBtn();
      initLightbox();
    })
    .catch(error => {
      console.error('Error fetching images:', error);
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
  loadMoreBtn.classList.remove('hidden');
}

function initLightbox() {
  new SimpleLightbox('.gallery a', {
    captions: true,
    captionDelay: 250,
  });
}




//--------------------------------------------------------//

// axios.get('/users')
//   .then(res => {
//     console.log(res.data);
//   });

//   let API_KEY = 'YOUR_API_KEY';
//   let URL = "https://pixabay.com/api/?key="+35827866-cac2bfdbcf92b350627521ced+"&q="+encodeURIComponent('red roses');
//   $.getJSON(URL, function(data){
//   if (parseInt(data.totalHits) > 0)
//       $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
//   else
//       console.log('No hits');
//   });



//   key - твій унікальний ключ доступу до API.
//   q - термін для пошуку. Те, що буде вводити користувач.
//   image_type - тип зображення. На потрібні тільки фотографії, тому постав значення photo.
//   orientation - орієнтація фотографії. Постав значення horizontal.
//   safesearch - фільтр за віком. Постав значення true.



// webformatURL - посилання на маленьке зображення для списку карток.
// largeImageURL - посилання на велике зображення.
// tags - рядок з описом зображення. Підійде для атрибуту alt.
// likes - кількість лайків.
// views - кількість переглядів.
// comments - кількість коментарів.
// downloads - кількість завантажень.


// "Sorry, there are no images matching your search query. Please try again."



//   35827866-cac2bfdbcf92b350627521ced


//   https://pixabay.com/api/

//   https://pixabay.com/api/?key={ KEY }&q=yellow+flowers&image_type=photo

//   https://pixabay.com/api/videos/

//   https://pixabay.com/api/videos/?key={ KEY }&q=yellow+flowers