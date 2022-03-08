import './index.css';
import { getData, getMovieData } from './modules/api.js';

const movieList = document.querySelector('.movie-list');
const movieDetails = document.querySelector('.movie-details');
const page = document.documentElement;

// Function to count number of element on the page
const countItems = (arr) => {
  let count = 0;
  arr.forEach(() => {
    count += 1;
  });
  const itemCount = document.querySelector('.item-count');
  itemCount.innerHTML = count;
  return count;
};

const displayMovies = (title) => {
  getData(title)
    .then((res) => {
      res.forEach((movie) => {
        movieList.innerHTML += `<article class="movie">
                                <img class="movie-poster" src="${movie.Poster}"/>
                                <div class="l-c-buttons">
                                    <i class="like-btn">&#x2764;</i>
                                    <button class="comment-btn">Comment</button>
                                </div>
                                <p class="movie-title">${movie.Title}</p>
                                <ul class="type-year">
                                    <li class="movie-type">${movie.Type}</li>
                                    <li class="movie-year">${movie.Year}</li>
                                </ul>
                            </article>`;
      });
      return res;
    })
    .then((movieList) => {
      countItems(movieList);
    });
};

const showComment = (btn) => {
  const movie = btn.parentElement.nextElementSibling.innerHTML;
  movieDetails.innerHTML = '';
  page.classList.add('comment-open');
  getMovieData(movie).then((data) => {
    movieDetails.innerHTML = `<button class="pop-close-btn btn"><span class="pop-close"></span></button>
      <article class="m">
        <img class="m-poster" src="${data.Poster}"/>
        <div class="m-title-plot">
            <p class="m-title">${data.Title}</p>
            <p class="m-plot">${data.Plot}</p>
        </div>
        <ul class="type-year">
            <li class="movie-type">${data.Type}</li>
            <li class="movie-year">${data.Year}</li>
        </ul>
      </article>`;
  });
};

document.addEventListener('DOMContentLoaded', displayMovies('marvel'));

document.addEventListener('click', (e) => {
  if (e.target && e.target.classList.contains('comment-btn')) {
    showComment(e.target);
  }

  if (e.target && e.target.classList.contains('pop-close-btn')) {
    page.classList.remove('comment-open');
  }
});