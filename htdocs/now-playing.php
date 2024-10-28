<?php
//COOKIE AND SESSION --------------------------------------------
require '../helpers/session-cookie-helper.php';
require('../helpers/query-string-helper.php');

//Checking if a session is active
session_check();

//Looking for or creating cookie
$previous = last_logged_in();


//DATABASE ------------------------------------------------------
require '../database/DatabaseHelper.php';
require("../helpers/query-helper.php");
$config = require '../database/config.php';

//Creating db_help object
$db_help = new DatabaseHelper($config);


//QUERY STRING --------------------------------------------------

//Verifies the Query String 
if (valid_theatre_query_string($db_help) === false) {
    header("Location: error.php");
    exit();
}


//pulls info from the Query String
$t_id = $_GET['id'] ?? "";
$t_name = $_GET['name'] ?? "";

//VIEW ---------------------------------------------------------
$title = "Now Playing";

if ($_SERVER['REQUEST_METHOD'] === "GET") {
    $current_movies = now_playing($db_help, $t_id);
    require "views/now-playing.view.php";
} else if ($_SERVER['REQUEST_METHOD'] === "POST") {
    if (empty($_POST['m_name'])) {
        $current_movies = now_playing($db_help, $t_id);
        require "views/now-playing.view.php";
    } else {
        $new_theatre_id = $t_id;
        $radio_val = $_POST['add/remove'];


        $new_movie_id = get_m_id($db_help, $_POST['m_name']);
        if (empty($new_movie_id)) {
            $current_movies = now_playing($db_help, $t_id);
            require "views/now-playing.view.php";
        }


        if ($radio_val === 'add') {
            add($db_help, $new_theatre_id, $new_movie_id['m_id']);
        } else if ($radio_val === 'remove') {
            remove($db_help, $new_theatre_id, $new_movie_id['m_id']);
        }

        $current_movies = now_playing($db_help, $t_id);
        require "views/now-playing.view.php";
    }
}
