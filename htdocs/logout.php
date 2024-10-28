<?php
//Destroys session and therefore logs out user
Session_start();
Session_destroy();

header("Location: admin.php");
exit();
