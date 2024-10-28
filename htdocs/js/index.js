/* eslint-disable indent */
//IMPORTS -----------------------------------------------------
import { state } from "./state.js";
import { movie_search_endpoint } from "./endpoints.js";
import { vote_search_endpoint } from "./endpoints.js";
import { movie_details_endpoint } from "./endpoints.js";
import { now_playing_endpoint } from "./endpoints.js";
import { movie_credits_endpoint } from "./endpoints.js";
import { movie_keywords_endpoint } from "./endpoints.js";
import { commonElms } from "./common-elements.js";
import { createSearchResultElm } from "./element-creation.js";
import { createExpandResult } from "./element-creation.js";

//FIRST LANDING -----------------------------------------------

let toWatch_list = JSON.parse(localStorage.getItem("toWatch"));
if (toWatch_list === null) {
  commonElms.allButton.setAttribute("checked", "");
  commonElms.resultsContainer.textContent = "Watch List Empty...";
} else {
  state.searchResults = toWatch_list.list;
  printMovies(sortMoviesAZ(toWatch_list.list));
  commonElms.watchListButton.setAttribute("checked", "");
}

//EVENT LISTENERS ---------------------------------------------
commonElms.searchEntry.addEventListener("input", handleSearchEntryEvent);
commonElms.searchButton.addEventListener("click", handleSearchButtonEvent);
commonElms.clearName.addEventListener("click", handleNameClearEvent);
commonElms.clearVote.addEventListener("click", handleVoteClearEvent);
commonElms.sortButton.addEventListener("click", handleSortEvent);
document.body.addEventListener("click", handleExpandEvent);
document.body.addEventListener("click", handleBackToResultsEvent);
document.body.addEventListener("click", handleFavEvent);
document.body.addEventListener("click", handleToWatchEvent);

//EVENT HANDLER FUNCTIONS -------------------------------------

//disables the button if there is less than 3 characters
function handleSearchEntryEvent(inputEvent) {
  let name_search = inputEvent.target.value;
  commonElms.searchButton.disabled =
    name_search.length >= 3 || name_search.length === 0 ? false : true;
}

//Take value from input and displays search results
function handleSearchButtonEvent() {
  let name_search = commonElms.searchEntry.value;
  commonElms.resultsContainer.textContent = "Searching...";

  let vote_min = commonElms.voteMin.value;
  let vote_max = commonElms.voteMax.value;

  if (checkValues(vote_min, vote_max)) {
    let search_field = "all";
    let params = document.getElementsByName("search-param");
    for (let param of params) {
      if (param.checked) {
        search_field = param.value;
      }
    }

    switch (search_field) {
      case "favorites": {
        if (name_search === "" && vote_min === "" && vote_max === "") {
          displayAllFavorites();
        } else if (name_search === "") {
          displayFavoritesVoteResults(vote_min, vote_max);
        } else if (vote_min === "" && vote_max === "") {
          displayFavoritesNameResults(name_search);
        } else {
          displayFavoritesResults(name_search, vote_min, vote_max);
        }
        break;
      }
      case "toWatch": {
        if (name_search === "" && vote_min === "" && vote_max === "") {
          displayAllToWatch();
        } else if (name_search === "") {
          displayToWatchVoteResults(vote_min, vote_max);
        } else if (vote_min === "" && vote_max === "") {
          displayToWatchNameResults(name_search);
        } else {
          displayToWatchResults(name_search, vote_min, vote_max);
        }
        break;
      }
      case "all": {
        if (name_search === "") {
          displayAllVoteResults(vote_min, vote_max);
        } else if (vote_min === "" && vote_max === "") {
          displayAllNameResults(name_search);
        } else {
          displayAllResults(name_search, vote_min, vote_max);
        }
        break;
      }
    }
  } else {
    commonElms.resultsContainer.textContent =
      "Vote Range Invalid. Please Try Again...";
  }
}

function handleNameClearEvent() {
  commonElms.searchEntry.value = "";
}
function handleVoteClearEvent() {
  commonElms.voteMin.value = "";
  commonElms.voteMax.value = "";
}

function handleSortEvent() {
  let selection = commonElms.sort.value;

  switch (selection) {
    case "default": {
      commonElms.resultsContainer.textContent = "";
      printMovies(state.searchResults);
      break;
    }
    case "title-asc": {
      let copied = state.searchResults.map((item) => item);
      commonElms.resultsContainer.textContent = "";
      printMovies(sortMoviesAZ(copied));
      break;
    }
    case "title-dsc": {
      let copied = state.searchResults.map((item) => item);
      commonElms.resultsContainer.textContent = "";
      printMovies(sortMoviesZA(copied));
      break;
    }
    case "year-asc": {
      let copied = state.searchResults.map((item) => item);
      commonElms.resultsContainer.textContent = "";
      printMovies(sortMoviesNewOld(copied));
      break;
    }
    case "year-dsc": {
      let copied = state.searchResults.map((item) => item);
      commonElms.resultsContainer.textContent = "";
      printMovies(sortMoviesOldNew(copied));
      break;
    }
    case "vote-asc": {
      let copied = state.searchResults.map((item) => item);
      commonElms.resultsContainer.textContent = "";
      printMovies(sortMoviesHighLow(copied));
      break;
    }
    case "vote-dsc": {
      let copied = state.searchResults.map((item) => item);
      commonElms.resultsContainer.textContent = "";
      printMovies(sortMoviesLowHigh(copied));
    }
  }
}

//Hides search results and displays expanded view
function handleExpandEvent(clickEvent) {
  if (clickEvent.target.classList.value === "search-poster") {
    document.querySelector(".result-list").style.display = "none";
    let id = clickEvent.target.dataset.mid;

    let fav_list = undefined;
    if (JSON.parse(localStorage.getItem("favorites")) !== null) {
      fav_list = JSON.parse(localStorage.getItem("favorites")).list;
    }
    let is_fav = "false";

    let watch_list = undefined;
    if (JSON.parse(localStorage.getItem("toWatch")) !== null) {
      watch_list = JSON.parse(localStorage.getItem("toWatch")).list;
    }
    let is_toWatch = "false";

    // eslint-disable-next-line unicorn/prefer-array-some
    if (fav_list !== undefined) {
      // eslint-disable-next-line unicorn/no-lonely-if
      if (fav_list.find((item) => item === id) !== undefined) {
        is_fav = "true";
      }
    }

    // eslint-disable-next-line unicorn/prefer-array-some
    if (watch_list !== undefined) {
      // eslint-disable-next-line unicorn/no-lonely-if
      if (watch_list.find((item) => item.id.toString() === id) !== undefined) {
        is_toWatch = "true";
      }
    }

    displayExpandedView(id, is_fav, is_toWatch);
  }
}

//Un-hides the search results and removes the expanded movie view
function handleBackToResultsEvent(clickEvent) {
  if (clickEvent.target.classList.value === "back-button") {
    document.querySelector(".result-list").style.display = "block";
    document.querySelector(".movie-expanded").remove();
  }
}

//Changes icon and adds/removes movie from fav list
function handleFavEvent(clickEvent) {
  if (clickEvent.target.classList.value === "fav-button") {
    clickEvent.target.src = "../images/favorited.png";
    clickEvent.target.classList.add("fav-button-added");
    clickEvent.target.classList.remove("fav-button");

    let id = clickEvent.target.dataset.mid;
    addToFavorites(id);
  } else if (clickEvent.target.classList.value === "fav-button-added") {
    clickEvent.target.src = "../images/notFavorited.png";
    clickEvent.target.classList.remove("fav-button-added");
    clickEvent.target.classList.add("fav-button");

    let id = clickEvent.target.dataset.mid;
    removeFromFavorites(id);
  }
}

//Changes icon and adds/removes movie from toWatch list
function handleToWatchEvent(clickEvent) {
  if (clickEvent.target.classList.value === "toWatch-button") {
    clickEvent.target.src = "../images/toWatchAdded.png";
    clickEvent.target.classList.add("toWatch-button-added");
    clickEvent.target.classList.remove("toWatch-button");

    let id = clickEvent.target.dataset.mid;
    addToWatch(id);
  } else if (clickEvent.target.classList.value === "toWatch-button-added") {
    clickEvent.target.src = "../images/toWatch.png";
    clickEvent.target.classList.remove("toWatch-button-added");
    clickEvent.target.classList.add("toWatch-button");

    let id = clickEvent.target.dataset.mid;
    removeFromToWatch(id);
  }
}

//SEARCH API CALL -----------------------------------------

//SEARCH ALL FUNCTIONS

//Displays results for search all with all parameters
function displayAllResults(name, min, max) {
  getAllSearchResults(name, min, max);
}

//Displays results for search all with only name parameter
function displayAllNameResults(name) {
  getNameSearchResults(name);
}

function displayAllVoteResults(min, max) {
  if (min === "") {
    min = "0";
  }

  if (max === "") {
    max = "10";
  }
  getVoteSearchResults(min, max);
}

//Gets all search results when all parameters are specified
async function getAllSearchResults(name, min, max) {
  if (min === "") {
    min = "0";
  }

  if (max === "") {
    max = "10";
  }

  let name_results = fetch(movie_search_endpoint.for(name)).then((response) =>
    response.json(),
  );
  let vote_results = fetch(vote_search_endpoint.for(min, max)).then(
    (response) => response.json(),
  );

  let promiseAllResult = await Promise.all([name_results, vote_results]);

  let filtered_name = filterByVotes(promiseAllResult[0].results, min, max);
  let filtered_vote = filterByName(promiseAllResult[1].results, name);
  let merged_results = mergeResults(filtered_name, filtered_vote);
  let results = mapMergedResults(merged_results);

  state.searchResults = results;
  commonElms.resultsContainer.textContent = "";
  printMovies(results);
}

//Gets all search results when only the name parameter is specified
async function getNameSearchResults(name) {
  let uri = movie_search_endpoint.for(name);

  let apiResponse = await apiResponseFromFetch(uri);
  let promise = await promiseFromApiResponse(apiResponse);
  let results = resultsFromPromise(promise);

  state.searchResults = results;
  commonElms.resultsContainer.textContent = "";
  printMovies(results);
}

//Gets all search results when only a range is specified
async function getVoteSearchResults(min, max) {
  let uri = vote_search_endpoint.for(min, max);

  let apiResponse = await apiResponseFromFetch(uri);
  let promise = await promiseFromApiResponse(apiResponse);
  let results = resultsFromPromise(promise);

  let filtered_results = filterByCount(results);

  state.searchResults = filtered_results;
  commonElms.resultsContainer.textContent = "";
  printMovies(filtered_results);
}

//TOWATCH FUNCTIONS

//Displays results for a toWatch search with all parameters
function displayToWatchResults(name, min, max) {
  if (min === "") {
    min = "0";
  }

  if (max === "") {
    max = "10";
  }

  if (JSON.parse(localStorage.getItem("toWatch")) === null) {
    commonElms.resultsContainer.textContent =
      "No Movies Have Been Marked As To Watch...";
  } else {
    let toWatch = JSON.parse(localStorage.getItem("toWatch")).list;
    let filtered = filterByName(toWatch, name);
    let results = filterByVotes(filtered, min, max);

    state.searchResults = results;
    commonElms.resultsContainer.textContent = "";
    printMovies(results);
  }
}

//Displays results for a toWatch search by only name
function displayToWatchNameResults(name) {
  if (JSON.parse(localStorage.getItem("toWatch")) === null) {
    commonElms.resultsContainer.textContent =
      "No Movies Have Been Marked As To Watch...";
  } else {
    let toWatch = JSON.parse(localStorage.getItem("toWatch")).list;
    let results = filterByName(toWatch, name);

    state.searchResults = results;
    commonElms.resultsContainer.textContent = "";
    printMovies(results);
  }
}

//Displays results for a toWatch search by only vote avg
function displayToWatchVoteResults(min, max) {
  if (min === "") {
    min = "0";
  }

  if (max === "") {
    max = "10";
  }

  if (JSON.parse(localStorage.getItem("toWatch")) === null) {
    commonElms.resultsContainer.textContent =
      "No Movies Have Been Marked As To Watch...";
  } else {
    let toWatch = JSON.parse(localStorage.getItem("toWatch")).list;
    let results = filterByVotes(toWatch, min, max);

    state.searchResults = results;
    commonElms.resultsContainer.textContent = "";
    printMovies(results);
  }
}

//Displays all movies marked as toWatch
function displayAllToWatch() {
  if (JSON.parse(localStorage.getItem("toWatch")) === null) {
    commonElms.resultsContainer.textContent =
      "No Movies Have Been Marked As To Watch...";
  } else {
    let toWatch = JSON.parse(localStorage.getItem("toWatch")).list;
    state.searchResults = toWatch;
    commonElms.resultsContainer.textContent = "";
    printMovies(toWatch);
  }
}

//FAVORITES FUNCTIONS

//Displays all favorited movies with no extra parameters
async function displayAllFavorites() {
  const fav_ids = JSON.parse(localStorage.getItem("favorites"));

  if (fav_ids === null) {
    commonElms.resultsContainer.textContent =
      "No Movies Have Been Marked As Favorite...";
  } else if (fav_ids.list.length === 0) {
    commonElms.resultsContainer.textContent =
      "No Movies Have Been Marked As Favorite...";
  } else {
    let results = [];

    for (let id of fav_ids.list) {
      let uri = movie_details_endpoint.for(id);
      let apiResponse = await apiResponseFromFetch(uri);
      let promise = await promiseFromApiResponse(apiResponse);

      let result = optimizeMovieObjects(promise);

      results.push(result);
    }

    state.searchResults = results;
    commonElms.resultsContainer.textContent = "";
    printMovies(results);
  }
}

//Displays favorited movies with a vote avg within the specified range
async function displayFavoritesVoteResults(min, max) {
  if (min === "") {
    min = "0";
  }

  if (max === "") {
    max = "10";
  }

  const fav_ids = JSON.parse(localStorage.getItem("favorites"));

  if (fav_ids === null) {
    commonElms.resultsContainer.textContent =
      "No Movies Have Been Marked As Favorite...";
  } else if (fav_ids.list.length === 0) {
    commonElms.resultsContainer.textContent =
      "No Movies Have Been Marked As Favorite...";
  } else {
    let results = [];

    for (let id of fav_ids.list) {
      let uri = movie_details_endpoint.for(id);
      let apiResponse = await apiResponseFromFetch(uri);
      let promise = await promiseFromApiResponse(apiResponse);
      let result = optimizeMovieObjects(promise);

      results.push(result);
    }
    let filtered_results = filterByVotes(results, min, max);

    state.searchResults = filtered_results;
    commonElms.resultsContainer.textContent = "";
    printMovies(filtered_results);
  }
}

//Displays favorited movies based on specified name
async function displayFavoritesNameResults(name) {
  const fav_ids = JSON.parse(localStorage.getItem("favorites"));

  if (fav_ids === null) {
    commonElms.resultsContainer.textContent =
      "No Movies Have Been Marked As Favorite...";
  } else if (fav_ids.list.length === 0) {
    commonElms.resultsContainer.textContent =
      "No Movies Have Been Marked As Favorite...";
  } else {
    let results = [];

    for (let id of fav_ids.list) {
      let uri = movie_details_endpoint.for(id);
      let apiResponse = await apiResponseFromFetch(uri);
      let promise = await promiseFromApiResponse(apiResponse);
      let result = optimizeMovieObjects(promise);

      results.push(result);
    }
    let filtered_results = filterByName(results, name);

    state.searchResults = filtered_results;
    commonElms.resultsContainer.textContent = "";
    printMovies(filtered_results);
  }
}

//displays favorited movies based on all parameters
async function displayFavoritesResults(name, min, max) {
  const fav_ids = JSON.parse(localStorage.getItem("favorites"));

  if (fav_ids === null) {
    commonElms.resultsContainer.textContent =
      "No Movies Have Been Marked As Favorite...";
  } else if (fav_ids.list.length === 0) {
    commonElms.resultsContainer.textContent =
      "No Movies Have Been Marked As Favorite...";
  } else {
    let results = [];

    for (let id of fav_ids.list) {
      let uri = movie_details_endpoint.for(id);
      let apiResponse = await apiResponseFromFetch(uri);
      let promise = await promiseFromApiResponse(apiResponse);
      let result = optimizeMovieObjects(promise);

      results.push(result);
    }
    let filtered_by_name = filterByName(results, name);
    let filtered_by_vote = filterByVotes(filtered_by_name, min, max);

    state.searchResults = filtered_by_vote;
    commonElms.resultsContainer.textContent = "";
    printMovies(filtered_by_vote);
  }
}

//EXTRA FUNCTIONS ---------------------------------------------

//Calls the API using fetch
function apiResponseFromFetch(uri) {
  return fetch(uri);
}

//converts promise to another promise but with JS
function promiseFromApiResponse(response) {
  let promise = response.json();
  return promise;
}

//Pulls results from a promise
function resultsFromPromise(promise) {
  return promise.results;
}

function optimizeMovieObjects(movie) {
  return {
    title: movie.title,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
    vote_count: movie.vote_count,
    poster_path: movie.poster_path,
    id: movie.id,
  };
}

//Filters results from name search by votes
function filterByVotes(results, min, max) {
  return results.filter(function (result) {
    return result.vote_average >= min && result.vote_average <= max;
  });
}

//Filters results from vote search by given name
function filterByName(results, name) {
  return results.filter(function (result) {
    return result.title.toString().toLowerCase().includes(name.toLowerCase());
  });
}

function filterByCount(results) {
  return results.filter(function (result) {
    return result.vote_count >= 100;
  });
}

//filters results from name search by given vote max/min
function mergeResults(name_results, vote_results) {
  let name_set = new Set(name_results.map((index) => JSON.stringify(index)));
  let vote_set = new Set(vote_results.map((index) => JSON.stringify(index)));

  let merged_set = new Set([...name_set, ...vote_set]);
  let merged_results = [...merged_set].map((index) => JSON.parse(index));

  return merged_results;
}

function mapMergedResults(merged_results) {
  return merged_results.map(function (result) {
    return {
      title: result.title,
      id: result.id,
      poster_path: result.poster_path,
      release_date: result.release_date,
      vote_average: result.vote_average,
    };
  });
}

function sortMoviesAZ(list) {
  list.sort((a, b) => {
    const movie_a = a.title.toLowerCase();
    const movie_b = b.title.toLowerCase();
    if (movie_a < movie_b) {
      return -1;
    }
    if (movie_a > movie_b) {
      return 1;
    }
    return 0;
  });
  return list;
}

function sortMoviesZA(list) {
  list.sort((a, b) => {
    const movie_a = a.title.toLowerCase();
    const movie_b = b.title.toLowerCase();
    if (movie_a < movie_b) {
      return 1;
    }
    if (movie_a > movie_b) {
      return -1;
    }
    return 0;
  });
  return list;
}

function sortMoviesNewOld(list) {
  list.sort((a, b) => {
    const movie_a = a.release_date.toLowerCase();
    const movie_b = b.release_date.toLowerCase();
    if (movie_a < movie_b) {
      return -1;
    }
    if (movie_a > movie_b) {
      return 1;
    }
    return 0;
  });
  return list;
}

function sortMoviesOldNew(list) {
  list.sort((a, b) => {
    const movie_a = a.release_date.toLowerCase();
    const movie_b = b.release_date.toLowerCase();
    if (movie_a < movie_b) {
      return 1;
    }
    if (movie_a > movie_b) {
      return -1;
    }
    return 0;
  });
  return list;
}

function sortMoviesHighLow(list) {
  list.sort((a, b) => {
    const movie_a = a.vote_average;
    const movie_b = b.vote_average;
    if (movie_a < movie_b) {
      return -1;
    }
    if (movie_a > movie_b) {
      return 1;
    }
    return 0;
  });
  return list;
}

function sortMoviesLowHigh(list) {
  list.sort((a, b) => {
    const movie_a = a.vote_average;
    const movie_b = b.vote_average;
    if (movie_a < movie_b) {
      return 1;
    }
    if (movie_a > movie_b) {
      return -1;
    }
    return 0;
  });
  return list;
}

function checkValues(min, max) {
  if (min === "" || max === "") {
    return true;
  }
  // eslint-disable-next-line unicorn/prefer-ternary
  if (min >= 0 && min <= 10 && max >= 1 && max <= 10) {
    // eslint-disable-next-line unicorn/prefer-ternary
    if (Number(min) < Number(max)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

//MOVIE ELEMENT CREATION --------------------------------------

//Appends results elms to page or displays no results message
function printMovies(movies) {
  if (movies.length === 0) {
    commonElms.resultsContainer.textContent = "No Movies Found...";
  } else {
    commonElms.resultsContainer.append(
      createSearchResultElm(
        movies,
        localStorage.getItem("favorites"),
        localStorage.getItem("toWatch"),
      ),
    );
  }
}

//FAVORITES AND TOWATCH FUNCTIONS ------------------------------

function addToFavorites(id) {
  let fav_ids;
  // eslint-disable-next-line unicorn/prefer-ternary
  if (localStorage.getItem("favorites") === null) {
    fav_ids = {
      list: [],
    };
  } else {
    fav_ids = JSON.parse(localStorage.getItem("favorites"));
  }
  fav_ids.list.push(id);
  localStorage.setItem("favorites", JSON.stringify(fav_ids));
}

function removeFromFavorites(id) {
  let fav_ids = JSON.parse(localStorage.getItem("favorites"));
  const index = fav_ids.list.indexOf(id);
  if (index !== -1) {
    fav_ids.list.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify(fav_ids));
  }
}

function addToWatch(id) {
  let toWatch;
  // eslint-disable-next-line unicorn/prefer-ternary
  if (localStorage.getItem("toWatch") === null) {
    toWatch = {
      list: [],
    };
  } else {
    toWatch = JSON.parse(localStorage.getItem("toWatch"));
  }
  toWatch.list.push(getMovie(id));
  localStorage.setItem("toWatch", JSON.stringify(toWatch));
}

function removeFromToWatch(id) {
  let toWatch = JSON.parse(localStorage.getItem("toWatch"));

  let index = findToWatch(toWatch.list, id);

  // eslint-disable-next-line unicorn/no-negated-condition
  if (index !== -1) {
    toWatch.list.splice(index, 1);

    localStorage.setItem("toWatch", JSON.stringify(toWatch));
    console.log(
      "Updated toWatch in local storage:",
      JSON.parse(localStorage.getItem("toWatch")),
    );
  } else {
    console.log("Object with ID " + id + " not found in toWatch.list");
  }
}

function getMovie(id) {
  let result = state.searchResults.find(function (result) {
    return result.id.toString() === id;
  });
  return result;
}

function findToWatch(toWatchList, id) {
  // eslint-disable-next-line unicorn/no-for-loop
  for (let i = 0; i < toWatchList.length; i++) {
    if (toWatchList[i].id.toString() === id) {
      return i;
    }
  }
  return -1;
}

//EXPANDED VIEW ------------------------------------------------

function Movie(tmdb_details, tmdb_credits, tmdb_keywords) {
  this.title = tmdb_details.title;
  this.overview = tmdb_details.overview;
  this.runtime = tmdb_details.runtime;
  this.tagline = tmdb_details.tagline;
  this.vote_avg = tmdb_details.vote_average;
  this.vote_count = tmdb_details.vote_count;
  this.poster_path = tmdb_details.poster_path;
  this.tmdb_link = tmdb_details.id;
  this.imdb_link = tmdb_details.imdb_id;
  this.genres = tmdb_details.genres;

  this.cast_list = tmdb_credits.cast;

  this.keywords = tmdb_keywords.keywords;
}

async function displayExpandedView(id, is_fav, is_toWatch) {
  getNowPlaying(id);

  let details = fetch(movie_details_endpoint.for(id)).then((response) =>
    response.json(),
  );
  let credits = fetch(movie_credits_endpoint.for(id)).then((response) =>
    response.json(),
  );
  let keywords = fetch(movie_keywords_endpoint.for(id)).then((response) =>
    response.json(),
  );

  let promiseAllResult = await Promise.all([details, credits, keywords]);

  let movie_obj = new Movie(
    promiseAllResult[0],
    promiseAllResult[1],
    promiseAllResult[2],
  );

  await delay(600);

  printExpandedView(movie_obj, is_fav, is_toWatch, state.nowPlayingList);
}

function getNowPlaying(id) {
  let uri = now_playing_endpoint.for(id);

  apiResponseFromFetch(uri)
    .then(promiseFromApiResponse)
    .then(listFromPromise)
    .then(saveList);
}

function printExpandedView(movie_obj, is_fav, is_toWatch, now_playing) {
  commonElms.resultsContainer.append(
    createExpandResult(movie_obj, is_fav, is_toWatch, now_playing),
  );
}

function listFromPromise(promise) {
  return promise.theatres;
}

function saveList(list) {
  state.nowPlayingList = list;
}

//USED CODE FROM STACK OVERFLOW TO ADD DELAY
function delay(time) {
  return new Promise((res) => setTimeout(res, time));
}
