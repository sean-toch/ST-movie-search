<?php
// MODIFIED THE CODE FROM LAB 4!!

/**
 * Returns the names, addresses, lat and long of all theatres
 * @param mixed $db_helper 
 * @return mixed An array containing the the info stated above
 */
function theatres($db_helper) {
    $query = <<<QUERY
    SELECT theatre.id, theatre.name, theatre.address
    FROM theatre
    ORDER BY theatre.name ASC
    QUERY;

    return $db_helper->run($query)->fetchAll();
}

/**
 * Returns the names of all movies playing at a specified theatre
 * @param mixed $db_helper 
 * @param mixed $t_id
 * @return mixed An array containing the the info stated above
 */
function now_playing($db_helper, $t_id) {
    $query = <<<QUERY
    SELECT movie.title, now_playing.id
    FROM movie INNER JOIN now_playing
    ON movie.id = now_playing.movie_id
    WHERE now_playing.theatre_id = :t_id
    ORDER BY movie.title
    QUERY;

    return $db_helper->run($query, [":t_id" => $t_id])->fetchAll();
}

/**
 * Returns the login info of provided user/pwd if it exists
 * @param mixed $db_helper 
 * @param mixed $user
 * @param mixed $pwd
 * @return mixed An array containing the the info stated above
 */
function login($db_helper) {
    $query = <<<QUERY
    SELECT administrator.username, administrator.passwrd
    FROM administrator
    QUERY;

    return $db_helper->run($query)->fetchAll();
}

/**
 * Checks if the given ID is in the table
 * @param mixed $db_helper 
 * @param mixed $given_id
 * @return mixed the ID if found
 */
function valid_id($db_helper, $tmdb_id) {
    $query = <<<QUERY
        SELECT id 
        FROM movie
        WHERE id = :tmdb_id
    QUERY;

    return $db_helper->run($query, [":tmdb_id" => "$tmdb_id"])->fetch();
}

/**
 * Checks if the given ID is in the table
 * @param mixed $db_helper 
 * @param mixed $given_id
 * @return mixed the ID if found
 */
function valid_theatre_id($db_helper, $t_id) {
    $query = <<<QUERY
        SELECT id 
        FROM theatre
        WHERE id = :t_id
    QUERY;

    return $db_helper->run($query, [":t_id" => "$t_id"])->fetch();
}

/**
 * Returns the names of all theatre playing a certain movie
 * @param mixed $db_helper 
 * @param mixed $tmdb_id
 * @return mixed An array containing the the info stated above
 */
function playing_in($db_helper, $tmdb_id) {
    $query = <<<QUERY
    SELECT theatre.name, theatre.address, theatre.lat, theatre.long
    FROM theatre 
    INNER JOIN now_playing ON theatre.id = now_playing.theatre_id
    INNER JOIN movie ON now_playing.movie_id = movie.id
    WHERE movie.id = :tmdb_id
    QUERY;

    return $db_helper->run($query, [":tmdb_id" => $tmdb_id])->fetchAll();
}

/**
 * Returns the count of all theatre playing a certain movie
 * @param mixed $db_helper 
 * @param mixed $tmdb_id
 * @return mixed An array containing the the info stated above
 */
function playing_in_count($db_helper, $tmdb_id) {
    $query = <<<QUERY
    SELECT COUNT(theatre.id)
    FROM theatre 
    INNER JOIN now_playing ON theatre.id = now_playing.theatre_id
    INNER JOIN movie ON now_playing.movie_id = movie.id
    WHERE movie.id = :tmdb_id
    QUERY;

    return $db_helper->run($query, [":tmdb_id" => $tmdb_id])->fetchAll();
}



//Disconnects the $db_helper object
function disconnect($db_helper) {
    $db_helper->close_connection();
}


//Gets the corresponding ID of a movie based on title
function get_m_id($db_helper, $movie_name) {
    $query = <<<QUERY
    SELECT movie.id AS m_id
    FROM movie
    WHERE movie.title = :movie_name
    QUERY;

    return $db_helper->run($query, [":movie_name" => $movie_name])->fetch();
}


/**
 * Adds a movie to the now playing page 
 * @param mixed $db_helper 
 * @param mixed $id
 * @param mixed $theatre_id
 * @param mixed $movie_id
 * @return mixed nothing
 */
function add($db_helper, $theatre_id, $movie_id) {
    $query = <<<QUERY
    INSERT INTO now_playing (theatre_id, movie_id) VALUES (:theatre_id , :movie_id)
    QUERY;

    return $db_helper->run($query, [":theatre_id" => $theatre_id, ":movie_id" => $movie_id])->fetchAll();
}


/**
 * Removes a movie from the now playing page
 * @param mixed $db_helper 
 * @param mixed $theatre_id
 * @param mixed $movie_id
 * @return mixed nothing
 */
function remove($db_helper, $theatre_id, $movie_id) {
    $query = <<<QUERY
    DELETE FROM now_playing 
    WHERE theatre_id = :theatre_id
    AND movie_id = :movie_id
    QUERY;

    return $db_helper->run($query, [":theatre_id" => $theatre_id, ":movie_id" => $movie_id])->fetchAll();
}
