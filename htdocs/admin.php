<?php
//FORM ---------------------------------------------------------------------------

//Title for head
$title = "Admin Login";

//Checking wether its GET or POST
if ($_SERVER['REQUEST_METHOD'] === "GET") {
    $name = "";
    require 'views/admin-login.view.php';
} else if ($_SERVER['REQUEST_METHOD'] === "POST") {
    $name = $_POST['user-name'] ?? '';
    $password = $_POST['pwd'] ?? ' ';



    //LOGIN -----------------------------------------------------------------------
    require '../database/DatabaseHelper.php';
    require("../helpers/query-helper.php");
    $config = require '../database/config.php';

    //Creating db_help object
    $db_help = new DatabaseHelper($config);

    //Calls query and stores the first element of the array in $login
    //, trim($name), password_hash(trim($password), PASSWORD_BCRYPT, ['cost' => 12])
    $logins = login($db_help);

    //Uses helper function to determine if the login attempt was successful
    require '../helpers/login-helper.php';
    $success = login_validation($logins, $password, $name);

    //Holds login errors
    $errors = [];

    //If success is true then the redirect function is called otherwise they get sent back
    require '../helpers/session-cookie-helper.php';
    if ($success) {
        add_cookie();
        redirect();
    } else {
        $errors['user-pwd'] = "Incorrect Username or Password";
        require 'views/admin-login.view.php';
    }
}
