import axios from "axios";
import Notiflix from "notiflix";


axios.get('/users')
  .then(res => {
    console.log(res.data);
  });

  let API_KEY = 'YOUR_API_KEY';
  let URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent('red roses');
  $.getJSON(URL, function(data){
  if (parseInt(data.totalHits) > 0)
      $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
  else
      console.log('No hits');
  });



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