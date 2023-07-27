var movieTitle = document.getElementById("input-search");
var movieSearch = document.getElementById("movie-search");
var results = document.getElementsByClassName("results");

function inputEventHandler() {
    if (!movieTitle.value) {
        console.log('please input value')
    } else {
        omdbApi(movieTitle.value)
    };
};

function omdbApi() {
    var omdbRequestUrl = 'http://www.omdbapi.com/?apikey=c7e37d76&t=' + movieTitle.value;
    fetch(omdbRequestUrl)
        .then(function (response) {
            if (response.status != 200) {
                alert(response.status);
            } else {
                return response.json();
            }
        }
        )
        .then(function (data) {
            displayMovies(data);
        })
        return;
};

function displayMovies(data) {
    var moviePoster = data.Poster;
    var movieDesc = data.Plot;
    document.getElementById("moviePoster").src = moviePoster;
    document.getElementById("description").innerHTML = "<p>" + movieDesc + "</p>";
};

movieSearch.addEventListener('click', inputEventHandler);


//hamburger menu

document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
  
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);
  
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
  
      });
    });
  
  });