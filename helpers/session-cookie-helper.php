<?php

//Checks if $_SESSION is set and redirects to login otherwise
function session_check() {
    session_start();
    if (empty($_SESSION['logged-in'])) {
        header("Location: admin.php");
        exit();
    }
}

//Check for or creates a cookie of the last time on the theatres page
function last_logged_in() {
    if (!isset($_COOKIE['prev'])) {
        add_cookie();
        $time = $_COOKIE['prev'];
    } else if (isset($_COOKIE['prev'])) {
        $time = $_COOKIE['prev'];
    }
    return $time;
}

//CODE USED FROM STACK OVERFLOW
function add_cookie() {
    $calgaryTimezone = new DateTimeZone('America/Edmonton');

    $calgaryDateTime = new DateTime('now', $calgaryTimezone);

    $calgaryDateTimeString = $calgaryDateTime->format('Y-m-d H:i');

    setcookie("prev", $calgaryDateTimeString, strToTime('+30 days'), '/');
}
