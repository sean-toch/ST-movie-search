const movie_details_endpoint = {
  for: function (id) {
    return `https://api.themoviedb.org/3/movie/${id}?api_key=`;
  },
};

const movie_credits_endpoint = {
  for: function (id) {
    return `https://api.themoviedb.org/3/movie/${id}/credits?api_key=`;
  },
};

const movie_keywords_endpoint = {
  for: function (id) {
    return `https://api.themoviedb.org/3/movie/${id}/keywords?api_key=`;
  },
};

const movie_search_endpoint = {
  for: function (name) {
    return `https://api.themoviedb.org/3/search/movie?query=${name}&api_key=`;
  },
};

const vote_search_endpoint = {
  for: function (min, max) {
    return `https://api.themoviedb.org/3/discover/movie?query=${min}|${max}&api_key=&sort_by=title.asc`;
  },
};
const now_playing_endpoint = {
  for: function (id) {
    return `https://literate-waffle-qgxq56jgr5vf6qv-8080.app.github.dev/api/playing.php?movie-id=${id}`;
  },
};
const google_maps_endpoint = {
  for: function (lat, long) {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=14&size=400x400&key=`;
  },
};
export { movie_details_endpoint };
export { movie_credits_endpoint };
export { movie_keywords_endpoint };
export { movie_search_endpoint };
export { vote_search_endpoint };
export { now_playing_endpoint };
export { google_maps_endpoint };
