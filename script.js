const $movieContainer = document.querySelector('.movie-container')
const modalBackground = document.querySelector(".modal-background");


const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOGE3YjI2ZmRmZmFiYmVjMjNhZWE0NjZkMzFkODM2NSIsIm5iZiI6MTcyOTQ3ODQ5OC40ODYxNiwic3ViIjoiNjQ3MWEzY2ZhMTk5YTYwMGY5NDFmOWFjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.9L4q3j1R8vGeSOUD6UAi4YB6R1cbvkfc_DQJ5qCvtB0",
  }
};

//fetch
const displayMovies = (moviesData, element) => {
  if (moviesData && moviesData.results.length > 0) {
    try {
      console.log(moviesData.results)
      moviesData.results.forEach((movie) => {
        const divEl = document.createElement("div");

        const movieItem = `
        <div class="movieCard" data-id="${movie.id}" >
          <img src="https://image.tmdb.org/t/p/w300${movie.backdrop_path}
          " alt="${movie.title}" class="movieImage"/ >
          <div class="cardInput">
            <h3>${movie.title}</h3>
            <p> 개봉 : ${movie.release_date}</p>
            <p>별점:${movie.vote_average}</p>
            <p>개봉일:${movie.release_date}</p>
          </div>
        </div>`
          ;
          
          divEl.innerHTML = movieItem;
        element.append(divEl);

        divEl.addEventListener("click", () => {
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

};

fetch("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko&page=1&sort_by=popularity.desc", options)
  .then((response) => response.json())
  .then((response) => displayMovies(response, $movieContainer));
