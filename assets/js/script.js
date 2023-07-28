var movieTitle = document.getElementById("input-search");
var movieSearch = document.getElementById("movie-search");
var results = document.getElementsByClassName("results");
var addBtn = document.getElementById("add");





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
    console.log(data);
    var moviePoster = data.Poster;
    var movieDesc = data.Plot;
    document.getElementById("moviePoster").src = moviePoster;
    document.getElementById("description").innerHTML = "<p>" + movieDesc + "</p>";
    addBtn.setAttribute("data-poster", data.Poster);
    addBtn.setAttribute("data-plot", data.Plot);
    addBtn.setAttribute("data-title", data.Title);
};

movieSearch.addEventListener('click', inputEventHandler);



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
                 <p class="image is-128x128">
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






