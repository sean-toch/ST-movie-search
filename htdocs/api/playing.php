<?php
//USED MODIFIED CODE FROM LECTURE

require_once '../../database/DatabaseHelper.php';
require_once "../../helpers/query-helper.php";

// Checks if the query string keys are set
function proper_key_present() {
    return isset($_GET['movie-id']);
}

// Throws 404 error message
function missing_error_message() {
    http_response_code(404);
    $payload = [
        "message" => "No movie id provided."
    ];
    header("Content-Type: application/json");
    echo json_encode($payload);
    exit();
}

// Throws 404 error message
function invalid_error_message($tmdb_id) {
    http_response_code(404);
    $payload = [
        "message" => "Unknown movie id $tmdb_id."
    ];
    header("Content-Type: application/json");
    echo json_encode($payload);
    exit();
}

function check_valid_id($db_help, $tmdb_id) {
    return valid_id($db_help, $tmdb_id);
}


// Delivers the id and name
function deliver_desired_results($db_help, $tmdb_id) {
    http_response_code(200);
    $payload = [
        "count" => playing_in_count($db_help, $tmdb_id),
        "theatres" => playing_in($db_help, $tmdb_id)
    ];
    disconnect($db_help);
    header("Content-Type: application/json");
    echo json_encode($payload);
}

// Pulling from config file
$config = require '../../database/config.php';

// Creating db_help object
$db_help = new DatabaseHelper($config);

// Calls all prior functions
if (!proper_key_present()) {
    missing_error_message();
} else {
    $tmdb_id = $_GET['movie-id'];
    if (!check_valid_id($db_help, $tmdb_id)) {
        invalid_error_message($tmdb_id);
    } else {
        deliver_desired_results($db_help, $tmdb_id);
    }
}
