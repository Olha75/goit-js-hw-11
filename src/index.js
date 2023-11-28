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



//   35827866-cac2bfdbcf92b350627521ced


  https://pixabay.com/api/

  https://pixabay.com/api/?key={ KEY }&q=yellow+flowers&image_type=photo

  https://pixabay.com/api/videos/

  https://pixabay.com/api/videos/?key={ KEY }&q=yellow+flowers