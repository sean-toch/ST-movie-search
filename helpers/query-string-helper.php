<?php


//Checks if there is the correct number of values and if they are empty
function valid_theatre_query_string($db_help) {
    if (count($_GET) != 2 || empty($_GET['id']) || empty($_GET['name'])) {
        return false;
    } else if (empty(valid_theatre_id($db_help, $_GET['id']))) {
        return false;
    } else {
        return true;
    }
}


//Returns the completed link
function theatre_link($theatre) {
    $url = theatre_link_url($theatre);

    return <<<TEXT
        <a href="$url">See Whats Playing</a>
    TEXT;
}


//Returns a query string based off of the selected theatre
function theatre_info($theatre) {
    return http_build_query(
        [
            "id" => $theatre['id'],
            "name" => $theatre['name'],
        ]
    );
}


//Returns the query string added to the source 
function theatre_link_url($theatre) {
    return "now-playing.php?" . theatre_info($theatre);
}
