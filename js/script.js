const movieApi = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
const imgPath = 'https://image.tmdb.org/t/p/w1280';
const searchMovieApi = 'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';
const keyword = document.getElementById('keyword');
const movieContent = document.querySelector('.movie-content');
const btnSearch = document.querySelector('.btn');
const alerts = document.querySelector('.alerts');
getMovie(movieApi);

// ketika tombol search di click
btnSearch.addEventListener('click', async function () {
  try {
    const movieSearch = await getMovieSearch(keyword.value);
    showMovies(movieSearch);
  } catch (error) {
    alerts.innerHTML = showAlerts(error);
  }
});

function getMovieSearch(keyword) {
  return fetch(searchMovieApi + keyword)
    .then((response) => response.json())
    .then((response) => {
      const err1 = 'anda tidak memasukan keyword pencarian';
      const err2 = 'Film tidak di temukan';
      if (response.errors == 'query must be provided') {
        throw err1;
      } else if (response.total_pages === 0) {
        setTimeout(() => {
          throw err2;
        }, 1000);
      } else {
        return response.results;
      }
    });
}

function showMovies(movies) {
  let cards = '';
  movies.forEach((m) => {
    cards += updateUiMovie(m);
  });
  movieContent.innerHTML = cards;
}

function showAlerts(error) {
  return `<div class="alert alert-danger alert-dismissible fade show position-absolute" role="alert">
  <strong>${error}</strong>
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`;
}

function getMovie(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((response) => {
      const movies = response.results;
      let cards = '';
      console.log(movies);
      movies.forEach((m) => {
        cards += updateUiMovie(m);
      });
      movieContent.innerHTML = cards;
    })
    .catch((err) => console.log(err));
}

function updateUiMovie(m) {
  return `<div class="col-lg-4">
  <div class="card mt-5 rounded text-center" style="width: 18rem">
    <img src="${imgPath + m.poster_path}" class="card-img-top rounded positon-relative" alt="..." />
    <div class="card-body">
      <h5 class="card-title">${m.title}</h5>
      <span class="badge rounded-pill bg-success position-absolute top-0 end-0">${m.vote_average}</span>
      <h6 class="card-subtitle  text-muted">Release Date</h6>
      <h6 class="card-text">${m.release_date}</h6>
    </div>
  </div>
</div>`;
}
