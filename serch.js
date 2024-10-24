// 영화 검색 데이터 가져오기
const inputEl = document.querySelector(".search-input");
const movieContainer = document.querySelector(".movie-container");

const getSearchMovies = async (title) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${title}&language=ko&page=1`

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjMxOTMzYTA4MjY5MjkwOTM1NWNhNmNjY2YwNzUyMiIsIm5iZiI6MTcyOTM0MDg4Ny4zMTk3NDksInN1YiI6IjY3MGY5NDY5MDE5ZjNiYzViMTFiZTYyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JKZICPzOMMdn7tTRO5-ONvM02DwOk6MvMyUkfgKUT24`
                //api키 가져오기 tmdb가서 로그인->api referanve->gettingstarted->
            },
        });

        const data = await response.json();
        if (data && data.results.length > 0) {
            //데이터가 있으면서 데이터결과의 길이보다 클때만 아래를 실행
            data.results.forEach((movie) => {
                const divEl = document.createElement('div')
                divEl.classList.add("serchImage")
                const movieItem = `
                <div class="serchCard">
            <div class>
                <img src="https://image.tmdb.org/t/p/w300/${movie.poster_path}" alt="${movie.title}"/>
            <p> 개봉 : ${movie.release_date}</p>
            <p>별점:${movie.vote_average}</p>
            <p>개봉일:${movie.release_date}</p>
            </div>
            </div>
        `;

                divEl.innerHTML = movieItem
                movieContainer.append(divEl)
            })

        } else {
            const movieEl = document.createElement('p')
            movieEl.textContent = "영화가 없습니다.";
            movieContainer.append(movieEl);
        }

    } catch (error) {
        throw new Error(`이런 ${error} 가 발생했어요!`);
    }
};


inputEl.addEventListener("keydown", (e) => {
    const serchValue = e.target.value.toLowerCase().trim()
    if (e.key === "Enter") {
        getSearchMovies(serchValue)
    };
    if (serchValue === "") {
        movieContainer.innerHTML = ""
        fetch("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko&page=1&sort_by=popularity.desc", options)


    }
});


