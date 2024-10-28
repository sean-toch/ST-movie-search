<?php

//COOKIE AND SESSION -------------------------------------------
require '../helpers/session-cookie-helper.php';
require("../helpers/query-string-helper.php");

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


//VIEW ---------------------------------------------------------
$title = "Theatre List";
if ($_SERVER['REQUEST_METHOD'] === "GET") {
    $theatres = theatres($db_help);
    require "views/theatres.view.php";
} else if ($_SERVER['REQUEST_METHOD'] === "POST") {
    $radio_val = $_POST['sort'];
    $theatres = theatres($db_help);

    if ($radio_val === "asc") {
        sortTheatresAsc($theatres);
        require "views/theatres.view.php";
    } else if ($radio_val === "dsc") {
        $theatres = array_reverse($theatres);
        require "views/theatres.view.php";
    }
}

//FOUND THIS CODE ONLINE FROM STACK OVERFLOW
function sortTheatresAsc($theatres) {
    usort($theatres, function ($a, $b) {
        return strcmp($a['name'], $b['name']);
    });
    return $theatres;
}
