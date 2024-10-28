<?php include "partials/head.php" ?>

<body>
    <div class="header">
        <div class="header-item">
            <img src='./images/logo.png' class="logo" alt="Logo">
        </div>
    </div>

    <div class="content">
        <div class="login">
            <div class="login-form">
                <h2>Admin Login</h2>

                <br>

                <form method="post">

                    <input type="text" id="name" name="user-name" value="<?= $name ?>" placeholder="UserName" />

                    <br><br>

                    <input type="password" id="pwd" name="pwd" placeholder="Password" />

                    <br><br>

                    <?php if (isset($errors['user-pwd'])) : ?>
                        <p class="login-error"><?= $errors['user-pwd'] ?></p>
                    <?php endif; ?>
                    <button class="submit-btn" type="submit">Submit</button>
                </form>
                <br>

                <h6><a class="nav-link" href="../index.html">Default View</a></h6>
            </div>
        </div>
    </div>

</body>

</html>