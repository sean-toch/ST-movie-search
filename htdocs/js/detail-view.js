import { movie_details_endpoint } from "./endpoints.js";

function responseFromApi(id) {
  let response = fetch(movie_details_endpoint.for(id));
  return response;
}

let resp = await responseFromApi("343611");
console.log(resp);
