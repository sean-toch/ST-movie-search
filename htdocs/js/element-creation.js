//SEARCH RESULT ELM -----------------------------------------
function createSearchResultElm(movies, favorites, toWatch) {
  let search_result = document.createElement("div");
  search_result.classList.add("result-list");

  let favorites_list;
  if (favorites !== null) {
    favorites_list = JSON.parse(favorites).list;
  }

  let toWatch_list;
  if (toWatch !== null) {
    toWatch_list = JSON.parse(toWatch).list;
  }

  let is_fav;
  let is_toWatch;
  for (let movie of movies) {
    // eslint-disable-next-line unicorn/prefer-ternary
    if (checkIfFav(movie, favorites_list)) {
      is_fav = true;
    } else {
      is_fav = false;
    }

    // eslint-disable-next-line unicorn/prefer-ternary
    if (checkIfToWatch(movie, toWatch_list)) {
      is_toWatch = true;
    } else {
      is_toWatch = false;
    }

    search_result.append(createMovieDiv(movie, is_fav, is_toWatch));
  }
  return search_result;
}

//ITERATES THROUGH FAVORITES LIST CHECKING FOR ID MATCHES
function checkIfFav(movie, favorites_list) {
  if (favorites_list === undefined) {
    return false;
  }

  for (let id of favorites_list) {
    if (id === movie.id.toString()) {
      return true;
    }
  }
}

//ITERATES THROUGH TOWATCH LIST CHECKING FOR ID MATCHES
function checkIfToWatch(movie, toWatch_list) {
  if (toWatch_list === undefined) {
    return false;
  }

  for (let item of toWatch_list) {
    if (item.id === movie.id) {
      return true;
    }
  }
}

//CREATES THE MOVIE CONTAINER DIV AND APPENDS INFO
function createMovieDiv(movie, is_fav, is_toWatch) {
  let movie_div = document.createElement("div");
  movie_div.classList.add("movie-container");

  movie_div.append(createPosterDiv(movie, is_fav, is_toWatch));
  movie_div.append(createDetailDiv(movie));
  movie_div.append(createFavDiv(movie, is_fav, is_toWatch));

  return movie_div;
}

//CREATES THE POSTER PORTION OF THE SEARCH RESULT ELM
function createPosterDiv(movie, is_fav, is_toWatch) {
  let poster_div = document.createElement("div");
  poster_div.classList.add("poster-container");

  let poster = document.createElement("img");
  poster.classList.add("search-poster");
  poster.src = "https://image.tmdb.org/t/p/w154" + movie.poster_path;
  poster.alt = "Poster Not Available";
  // eslint-disable-next-line unicorn/prefer-dom-node-dataset
  poster.setAttribute("data-mid", movie.id);
  // eslint-disable-next-line unicorn/prefer-dom-node-dataset
  poster.setAttribute("data-fav", is_toWatch);
  // eslint-disable-next-line unicorn/prefer-dom-node-dataset
  poster.setAttribute("data-watch", is_fav);

  poster_div.append(poster);

  return poster_div;
}

//CREATES THE DETAIL DIV PORTION OF THE SEARCH RESULT ELM
function createDetailDiv(movie) {
  let detail_div = document.createElement("div");
  detail_div.classList.add("detail-container");

  let title = document.createElement("h1");
  title.textContent = movie.title;

  let details_link = document.createElement("p");
  details_link.textContent = "Click Poster For More Information";

  let release_year = document.createElement("p");
  release_year.textContent = movie.release_date;

  let tmdb_avg = document.createElement("p");
  tmdb_avg.textContent = "Average Score: " + movie.vote_average;

  detail_div.append(title);
  detail_div.append(details_link);
  detail_div.append(release_year);
  detail_div.append(tmdb_avg);

  return detail_div;
}

function createFavDiv(movie, is_fav, is_toWatch) {
  let fav_div = document.createElement("div");
  fav_div.classList.add("fav-container");

  let fav = document.createElement("img");
  // eslint-disable-next-line unicorn/prefer-ternary
  if (is_fav) {
    fav.src = "../images/favorited.png";
    fav.classList.add("fav-button-added");
  } else {
    fav.src = "../images/notFavorited.png";
    fav.classList.add("fav-button");
  }
  // eslint-disable-next-line unicorn/prefer-dom-node-dataset
  fav.setAttribute("data-mid", movie.id);

  let toWatch = document.createElement("img");
  // eslint-disable-next-line unicorn/prefer-ternary
  if (is_toWatch) {
    toWatch.src = "../images/toWatchAdded.png";
    toWatch.classList.add("toWatch-button-added");
  } else {
    toWatch.src = "../images/toWatch.png";
    toWatch.classList.add("toWatch-button");
  }
  // eslint-disable-next-line unicorn/prefer-dom-node-dataset
  toWatch.setAttribute("data-mid", movie.id);

  fav_div.append(fav);
  fav_div.append(toWatch);

  return fav_div;
}

export { createSearchResultElm };

//EXPAND ELM -----------------------------------------------
function createExpandResult(movie, is_fav, is_toWatch, now_playing) {
  let expanded_div = document.createElement("div");
  expanded_div.classList.add("movie-expanded");

  expanded_div.append(
    createPosterDetails(movie, is_fav, is_toWatch, now_playing),
  );
  expanded_div.append(createCastTheatreList(movie));

  return expanded_div;
}

function createPosterDetails(movie, is_fav, is_toWatch, now_playing) {
  let poster_div = document.createElement("div");
  poster_div.classList.add("poster-info");

  let expanded_poster = document.createElement("img");
  expanded_poster.classList.add("large-poster");
  expanded_poster.src = "https://image.tmdb.org/t/p/w185/" + movie.poster_path;

  let title = document.createElement("h1");
  title.textContent = movie.title;

  let run_time = document.createElement("h4");
  run_time.textContent = movie.runtime + " Minutes";

  let tag_line = document.createElement("h3");
  tag_line.textContent = movie.tagline;

  let overview = document.createElement("p");
  overview.textContent = movie.overview;

  let back_button = document.createElement("button");
  back_button.classList.add("back-button");
  back_button.textContent = "Back To Results";

  let fav_status = document.createElement("h4");
  // eslint-disable-next-line unicorn/prefer-ternary
  if (is_fav === "true") {
    fav_status.textContent = "Movie Is Favorited";
  } else {
    fav_status.textContent = "Movie Is Not Favorited";
  }

  let toWatch_status = document.createElement("h4");
  // eslint-disable-next-line unicorn/prefer-ternary
  if (is_toWatch === "true") {
    toWatch_status.textContent = "Movie Is Marked As ToWatch";
  } else {
    toWatch_status.textContent = "Movie Is Not Marked As ToWatch";
  }

  let tmdb_vote_avg = document.createElement("p");
  tmdb_vote_avg.textContent = "TMDB Vote Average: " + movie.vote_avg;

  let tmdb_vote_count = document.createElement("p");
  tmdb_vote_count.textContent = "TMDB Vote Count: " + movie.vote_count;

  let genres_title = document.createElement("h4");
  genres_title.textContent = "Genres";

  let genres = document.createElement("p");
  genres.classList.add("genres-container");
  genres.textContent = movie.genres.map((genre) => ` ${genre.name}`);

  let keywords_title = document.createElement("h4");
  keywords_title.textContent = "Keywords";

  let keywords = document.createElement("p");
  keywords.classList.add("keywords");
  keywords.textContent = movie.keywords.map((word) => ` ${word.name}`);

  let now_playing_title = document.createElement("h4");
  now_playing_title.textContent = "Now Playing At:";

  let now_playing_content = document.createElement("div");

  // eslint-disable-next-line unicorn/prefer-ternary, unicorn/no-negated-condition
  if (now_playing !== undefined) {
    for (let theatre of now_playing) {
      let now_playing_text = document.createElement("div");
      now_playing_text.textContent = theatre.name + ", " + theatre.address;
      let now_playing_img = document.createElement("img");
      now_playing_img.alt = "good";
      now_playing_img.src = `https://maps.googleapis.com/maps/api/staticmap?center=${theatre.lat},${theatre.long}&markers=color:red|${theatre.lat},${theatre.long}&zoom=13&size=160x160&key=AIzaSyB09bunQ6THBGwGjehzk75xYKNru423oZg`;

      now_playing_content.append(now_playing_text);
      now_playing_content.append(now_playing_img);
    }
  } else {
    let now_playing_error = document.createElement("p");
    now_playing_error.textContent =
      "No Current Movie Showing in Calgary, AB...";
    now_playing_content.append(now_playing_error);
  }

  poster_div.append(expanded_poster);
  poster_div.append(title);
  poster_div.append(run_time);
  poster_div.append(tag_line);
  poster_div.append(overview);
  poster_div.append(back_button);
  poster_div.append(fav_status);
  poster_div.append(toWatch_status);
  poster_div.append(tmdb_vote_avg);
  poster_div.append(tmdb_vote_count);
  poster_div.append(genres_title);
  poster_div.append(genres);
  poster_div.append(keywords_title);
  poster_div.append(keywords);
  poster_div.append(now_playing_title);
  poster_div.append(now_playing_content);

  return poster_div;
}

function createCastTheatreList(movie) {
  let cast_div = document.createElement("div");
  cast_div.classList.add("cast-theatres");

  let cast_title = document.createElement("h3");
  cast_title.textContent = "Cast";
  let cast_list = document.createElement("p");
  cast_list.textContent = movie.cast_list.map(
    (actor) => ` ${actor.name} as "${actor.character}"`,
  );

  let theatres_title = document.createElement("h3");
  theatres_title.textContent = "Theatres";

  let tmdb_link = document.createElement("a");
  tmdb_link.href = "https://www.themoviedb.org/movie/" + movie.tmdb_link;
  tmdb_link.textContent = "TMDB_LINK";

  let imdb_link = document.createElement("a");
  imdb_link.href = "https://www.imdb.com/title/" + movie.imdb_link;
  imdb_link.textContent = "IMDB LINK";

  let gap = document.createElement("br");

  cast_div.append(cast_title);
  cast_div.append(cast_list);
  cast_div.append(gap);
  cast_div.append(theatres_title);
  cast_div.append(gap);
  cast_div.append(tmdb_link);
  cast_div.append(gap);
  cast_div.append(gap);
  cast_div.append(imdb_link);

  return cast_div;
}

export { createExpandResult };
