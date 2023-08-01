var movieTitle = document.getElementById("input-search");
var movieSearch = document.getElementById("movie-search");
var results = document.getElementsByClassName("results");
var addBtn = document.getElementById("addMovie");

function inputEventHandler() {
    if (!movieTitle.value) {
        console.log("please input value");
    } else {
        omdbApi(movieTitle.value);
    }
}

function omdbApi() {
    var omdbRequestUrl =
        "http://www.omdbapi.com/?apikey=c7e37d76&t=" + movieTitle.value;
    fetch(omdbRequestUrl)
        .then(function (response) {
            if (response.status != 200) {
                alert(response.status);
            } else {
                return response.json();
            }
        })
        .then(function (data) {
            displayMovies(data);
            rapidAPI(data);
        });
    return;
}

function displayMovies(data) {
    var moviePoster = data.Poster;
    var movieDesc = data.Plot;
    document.getElementById("moviePoster").src = moviePoster;
    document.getElementById("description").innerHTML = "<p>" + movieDesc + "</p>";
    addBtn.setAttribute("data-poster", data.Poster);
    addBtn.setAttribute("data-plot", data.Plot);
    addBtn.setAttribute("data-title", data.Title);
}

movieSearch.addEventListener("click", inputEventHandler);

const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": "a41af16ff5msh7a6c6e9df83c957p184bbajsncd5a40f520fb",
        "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
    },
};

function rapidAPI(imdbData) {
    var rapidRequestUrl =
        "https://streaming-availability.p.rapidapi.com/v2/search/title?title=" +
        movieTitle.value +
        "&country=us&show_type=movie&output_language=en";
    fetch(rapidRequestUrl, options)
        .then(function (response) {
            if (response.status != 200) {
                alert(response.status);
            } else {
                return response.json();
            }
        })
        .then(function (data) {
            for (let i = 0; i < data.result.length; i++) {
                var movieId = data.result[i].imdbId;
                if (imdbData.imdbID == movieId) {
                    console.log(data.result[i]);
                    displayStreamInfo(data.result[i]);
                    trailerInfo(data.result[i])
                    return;
                } else {
                    console.log("no streaming results found");
                }
            }
        });
}



function trailerInfo(movie) {
    var modalTrailer = document.getElementById("modal-trailer")
    modalTrailer.src = ""
   

       
        var videoId = movie.youtubeTrailerVideoId
        modalTrailer.src = `https://www.youtube.com/embed/${videoId}` 
        console.log(modalTrailer)
   
}

function displayStreamInfo(data) {
    var services = Object.keys(data.streamingInfo.us)
    const streamInfo = document.getElementById("streamInfo");
    for (let i = 0; i < services.length; i++) {
        let newListItem = document.createElement('li');
        console.log(services[i])
        newListItem.textContent = services[i];
        streamInfo.appendChild(newListItem);
    }
}


// hamburger
document.addEventListener("DOMContentLoaded", () => {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(
        document.querySelectorAll(".navbar-burger"),
        0
    );

    // Add a click event on each of them
    $navbarBurgers.forEach((el) => {
        el.addEventListener("click", () => {
            // Get the target from the "data-target" attribute
            const target = el.dataset.target;
            const $target = document.getElementById(target);

            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle("is-active");
            $target.classList.toggle("is-active");
        });
    });
});

  document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
      const iframe = $el.querySelector('iframe');
      const iframeSrc = iframe.src;
      // When modal is closed video stops
      iframe.src = ''
      // Then gives the src back
      iframe.src = iframeSrc;
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }


  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.code === 'Escape') {
      closeAllModals();
    }
  });
});
  
function addMovie(event) {
    var currentMovies = JSON.parse(localStorage.getItem("watchList")) || [];
    var newMovie = {
        title: event.target.dataset.title,
        poster: event.target.dataset.poster,
        plot: event.target.dataset.plot,
    };

    if (
        currentMovies.find(function (movie) {
            return movie.title === newMovie.title;
        })
    ) {
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
    document.getElementById("currentMovieList2").innerHTML = null;
    var currentWatchList = JSON.parse(localStorage.getItem("watchList"));
    //console.log(currentWatchList);
    if (currentWatchList) {
        for (var i = 0; i < currentWatchList.length; i++) {
            var newCard = document.createElement("article");
            newCard.setAttribute("class", "media box");
            newCard.setAttribute("data-index", i);
            newCard.innerHTML = `
              <figure class="media-left">
                   <p class="image is-64x64">
                  <img id="posterImage" src="${currentWatchList[i].poster}" alt="movie img">
                  </p>
              </figure>
              <div class="media-content">
                  <div class="content">
                      <p id="titleOfMovie">
                      <strong>${currentWatchList[i].title}</strong>
                      </p>
                      <p id="movieDescription">
                      ${currentWatchList[i].plot}
                      </p>
                  </div>
              </div>
                  <div class="media-right">
                  <button class="delete"></button>
              </div>
              `;
            document.getElementById("currentMovieList").appendChild(newCard);
            document.getElementById("currentMovieList2").appendChild(newCard);
        }

    }
}

function deleteMovie(event) {

    var currentWatchList = JSON.parse(localStorage.getItem("watchList"));
    var element = event.target;

    if (element.matches(".delete") === true) {
        var index = parseInt(element.parentElement.parentElement.getAttribute("data-index"));
        currentWatchList.splice(index, 1);
        localStorage.setItem("watchList", JSON.stringify(currentWatchList));
    }

    getWatchList();
    console.log(currentWatchList);

}


getWatchList();
document.addEventListener("click", deleteMovie);
addBtn.addEventListener("click", addMovie);
