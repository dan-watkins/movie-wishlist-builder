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
			rapidAPI();
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



const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'a41af16ff5msh7a6c6e9df83c957p184bbajsncd5a40f520fb',
		'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
	}
};



function rapidAPI() {
	var rapidRequestUrl = "https://streaming-availability.p.rapidapi.com/v2/search/title?title=" + movieTitle.value + "&country=us&show_type=movie&output_language=en";
	fetch(rapidRequestUrl, options)
		.then(function (response) {
			if (response.status !=200) {
				alert(respnse.status);
			} else {
				return response.json();
			}
		})
		.then(function(data) {
			console.log(data);
			displayStreamInfo(data);
		}
		)
}
