<?php include "partials/head.php" ?>

<body>
    <div class="header">
        <div class="header-item">
            <img src='./images/logo.png' class="logo" alt="Logo">
        </div>
        <div class="header-item">
            <h5>Movies</h5>
        </div>
        <div class="header-item">
            <h6><a class="logout-link" href="../logout.php">LOGOUT</a></h6>
        </div>
    </div>
    <div class="content">
        <div class="movie">
            <div class="movie-item">
                <h1><?php echo $t_name ?>: </h1>
                <ul>
                    <?php if (!empty($current_movies)) { ?>
                        <?php foreach ($current_movies as $curr) : ?>
                            <li>
                                <h4><?php echo $curr['title']; ?></h4>
                            </li>
                        <?php endforeach;
                    } else { ?>
                        <li>
                            <h4> <?php echo "No Movies Are Currently Playing..."; ?></h4>
                        </li>
                    <?php } ?>
                </ul>

                <br>

                <h2><a class="nav-link" href="../theatres.php">Back To Theatres</a></h2>

                <br>
                <hr><br>

                <h2>Add/Remove</h2>
                <form method="post">
                    <input type="radio" id="add" name="add/remove" value="add" checked="checked">
                    <label for="add">Add</label><br>
                    <input type="radio" id="remove" name="add/remove" value="remove">
                    <label for="remove">Remove</label><br><br>

                    <input type="text" id="m_name" name="m_name" placeholder="Movie Title" />

                    <br><br>

                    <button class="submit-btn" type="submit">Enter</button>
                </form>
            </div>
        </div>
    </div>
    <?php include "./views/partials/footer.php" ?>
</body>

</html>