<?php

//Checks if the password and username matches any in the database array
function Login_validation($logins, $password, $name) {
    foreach ($logins as $login) {
        if (password_verify($password, $login['passwrd']) and $name === $login['username']) {
            return true;
        }
    }
    return false;
}


//Redirect the user to the theatres page
function redirect() {
    session_start();
    $_SESSION['logged-in'] = "true";
    header("Location: theatres.php");
    exit();
}
