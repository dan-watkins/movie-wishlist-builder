var movieTitle = document.getElementById("input-search");
var movieSearch = document.getElementById("movie-search");
var results = document.getElementsByClassName("results");
var addBtn = document.getElementById("addMovie");

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
			rapidAPI(data);
        })
        return;
};

function displayMovies(data) {
    var moviePoster = data.Poster;
    var movieDesc = data.Plot;
    document.getElementById("moviePoster").src = moviePoster;
    document.getElementById("description").innerHTML = "<p>" + movieDesc + "</p>";
    addBtn.setAttribute("data-poster", data.Poster);
    addBtn.setAttribute("data-plot", data.Plot);
    addBtn.setAttribute("data-title", data.Title);
};

movieSearch.addEventListener('click', inputEventHandler);



const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'a41af16ff5msh7a6c6e9df83c957p184bbajsncd5a40f520fb',
		'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
	}
};



function rapidAPI(imdbData) {
	var rapidRequestUrl = "https://streaming-availability.p.rapidapi.com/v2/search/title?title=" + movieTitle.value + "&country=us&show_type=movie&output_language=en";
	fetch(rapidRequestUrl, options)
		.then(function (response) {
			if (response.status !=200) {
				alert(response.status);
			} else {
				return response.json();
			}
		})
		.then(function(data) {
            for (let i = 0; i < data.result.length; i++) {
                var movieId = data.result[i].imdbId;
                if (imdbData.imdbID == movieId) {
                    console.log(data.result[i]);
                    displayStreamInfo(data.result[i]);
                    return;
                } else {
                    console.log("no streaming results found");
                }
            }
		}
		)
}


// hamburger
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

  

  function addMovie(event) {
    var currentMovies = JSON.parse(localStorage.getItem("watchList")) || [];
    var newMovie = {
        title: event.target.dataset.title,
        poster: event.target.dataset.poster,
        plot: event.target.dataset.plot
    };

    if (currentMovies.find(function (movie) {
        return movie.title === newMovie.title;
    })) {
        //add modal to inform user that the movie is already on their list
        return;
    }

    if (movieTitle.value) {
        currentMovies.push(newMovie);
        localStorage.setItem("watchList", JSON.stringify(currentMovies));
        getWatchList();
    }
}


function getWatchList() {
    document.getElementById("currentMovieList").innerHTML = null;
    var currentWatchList = JSON.parse(localStorage.getItem("watchList"));
    console.log(currentWatchList);
    if (currentWatchList) {
        for (var movie of currentWatchList) {
            var newCard = document.createElement("article");
            newCard.setAttribute("class", "media box");
            newCard.innerHTML = `
            <figure class="media-left">
                 <p class="image is-64x64">
                <img id="posterImage" src="${movie.poster}" alt="movie img">
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <p id="titleOfMovie">
                    <strong>${movie.title}</strong>
                    </p>
                    <p id="movieDescription">
                    ${movie.plot}
                    </p>
                </div>
            </div>
                <div class="media-right">
                <button class="delete"></button>
            </div>
            `
            document.getElementById("currentMovieList").appendChild(newCard);
        }
    }
}

getWatchList();
addBtn.addEventListener("click", addMovie);