<?php include "partials/head.php" ?>

<body>
    <div class="header">
        <div class="header-item">
            <img src='./images/logo.png' class="logo" alt="Logo">
        </div>
        <div class="header-item">
            <h5>THEATRES</h5>

        </div>

        <div class="header-item">
            <h6><a class="logout-link" href="../logout.php">LOGOUT</a></h6>
        </div>
    </div>
    <div class="sort-container">
        <form method="post">
            <input type="radio" id="asc" name="sort" value="asc" checked="checked">
            <label for="asc">Ascending</label><br>
            <input type="radio" id="dsc" name="sort" value="dsc">
            <label for="dsc">Descending</label><br><br>
            <button class="submit-btn" type="submit">Sort</button>
        </form>
    </div>

    <div class="content">

        <div class="theatre">

            <?php foreach ($theatres as $theatre) : ?>
                <?php include "./views/partials/theatre-block.php" ?>
            <?php endforeach ?>
        </div>
    </div>
    <?php include "./views/partials/footer.php" ?>
</body>

</html>