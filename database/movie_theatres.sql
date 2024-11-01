-- Active: 1707844011072@@127.0.0.1@3306@moviehouse

DROP DATABASE IF EXISTS moviehouse;
CREATE DATABASE moviehouse DEFAULT CHARACTER SET = 'utf8mb4';
USE moviehouse;

SET FOREIGN_KEY_CHECKS=0;

CREATE TABLE IF NOT EXISTS administrator (
	username VARCHAR(255) PRIMARY KEY, 
	passwrd VARCHAR(255)
);
INSERT INTO administrator (username, passwrd) VALUES ('jpratt', '$2y$12$N1NTAncUw/83qVb6iVZcAu9jNOJX/pelKrxzerYmwjh9CHH8aTzWq');
INSERT INTO administrator (username, passwrd) VALUES ('stoch', '$2y$12$v9ISexyQBZeu.seRBdJAhe5ZlQqqE5QETOC694UEy.1/5eNaKKppa');
INSERT INTO administrator (username, passwrd) VALUES ('comp3512', '$2y$12$dgCAWCQY38CRsNGE5U1MgepTJUx0.GBBPvICWf7NgIJ0kiMDa6Qxa');



CREATE TABLE IF NOT EXISTS movie (
	id INTEGER PRIMARY KEY, 
	title TEXT NOT NULL, 
	release_date TEXT NOT NULL
);
INSERT INTO movie (id, title, release_date) VALUES (787699, 'Wonka', '2023-12-06');
INSERT INTO movie (id, title, release_date) VALUES (609681, 'The Marvels', '2023-11-08');
INSERT INTO movie (id, title, release_date) VALUES (753342, 'Napoleon', '2023-11-22');
INSERT INTO movie (id, title, release_date) VALUES (955916, 'Lift', '2024-01-10');
INSERT INTO movie (id, title, release_date) VALUES (848187, 'Role Play', '2023-12-14');
INSERT INTO movie (id, title, release_date) VALUES (872585, 'Oppenheimer', '2023-07-19');
INSERT INTO movie (id, title, release_date) VALUES (906126, 'Society of the Snow', '2023-12-13');
INSERT INTO movie (id, title, release_date) VALUES (572802, 'Aquaman and the Lost Kingdom', '2023-12-20');
INSERT INTO movie (id, title, release_date) VALUES (866398, 'The Beekeeper', '2024-01-10');
INSERT INTO movie (id, title, release_date) VALUES (346698, 'Barbie', '2023-07-19');
INSERT INTO movie (id, title, release_date) VALUES (466420, 'Killers of the Flower Moon', '2023-10-18');
INSERT INTO movie (id, title, release_date) VALUES (930564, 'Saltburn', '2023-11-16');
INSERT INTO movie (id, title, release_date) VALUES (956262, 'The Kitchen', '2023-10-15');
INSERT INTO movie (id, title, release_date) VALUES (848326, 'Rebel Moon - Part One: A Child of Fire', '2023-12-15');
INSERT INTO movie (id, title, release_date) VALUES (792307, 'Poor Things', '2023-11-21');
INSERT INTO movie (id, title, release_date) VALUES (1212073, 'Sixty Minutes', '2024-01-19');
INSERT INTO movie (id, title, release_date) VALUES (695721, 'The Hunger Games: The Ballad of Songbirds & Snakes', '2023-11-15');
INSERT INTO movie (id, title, release_date) VALUES (558915, 'The Color Purple', '2023-12-25');
INSERT INTO movie (id, title, release_date) VALUES (823452, 'The Boys in the Boat', '2023-12-25');
INSERT INTO movie (id, title, release_date) VALUES (673593, 'Mean Girls', '2024-01-10');
INSERT INTO movie (id, title, release_date) VALUES (10775, 'Infernal Affairs', '2002-12-12');
INSERT INTO movie (id, title, release_date) VALUES (508883, 'The Boy and the Heron', '2023-12-08');
INSERT INTO movie (id, title, release_date) VALUES (940721, 'Godzilla Minus One', '2023-12-01');
INSERT INTO movie (id, title, release_date) VALUES (365620, 'Ferrari', '2023-12-25');
INSERT INTO movie (id, title, release_date) VALUES (840430, 'The Holdovers', '2022-10-27');


CREATE TABLE IF NOT EXISTS theatre (
	id INTEGER PRIMARY KEY, 
	name TEXT NOT NULL, 
	address TEXT NOT NULL, 
	lat DOUBLE, 
	`long` DOUBLE
);
INSERT INTO theatre (id, name, address, lat, `long`) VALUES (1, 'Plaza Theatre', '1133 Kensington Rd NW', 51.052412578151916, -114.08788680334811);
INSERT INTO theatre (id, name, address, lat, `long`) VALUES (2, 'Globe Cinema', '617 8 Ave SW', 51.045686640675555, -114.07502973218419);
INSERT INTO theatre (id, name, address, lat, `long`) VALUES (3, 'Scotiabank Theatre Chinook', '6455 Macleod Trail SW', 50.99660636689441, -114.07416176102294);
INSERT INTO theatre (id, name, address, lat, `long`) VALUES (4, 'Landmark Cinemas 5 Market Mall', '3412 49 St NW', 51.08298029486308, -114.15741816357233);
INSERT INTO theatre (id, name, address, lat, `long`) VALUES (5, 'Landmark Cinemas 16 Country Hills', '388 Country Hills Blvd NE', 51.156639164566315, -114.06759779008361);


CREATE TABLE IF NOT EXISTS now_playing (
	id INT PRIMARY KEY AUTO_INCREMENT, 
	theatre_id INTEGER NOT NULL, 
	movie_id INTEGER NOT NULL, 
	CONSTRAINT `fk_now_playing_theatre` 
		FOREIGN KEY (theatre_id) REFERENCES theatre (id),
	CONSTRAINT `fk_now_playing_movie`
		FOREIGN KEY (movie_id) REFERENCES movie (id)
	);

INSERT INTO now_playing (theatre_id, movie_id) VALUES (1, 840430);
INSERT INTO now_playing (theatre_id, movie_id) VALUES (1, 508883);
INSERT INTO now_playing (theatre_id, movie_id) VALUES (1, 753342);
INSERT INTO now_playing (theatre_id, movie_id) VALUES (2, 10775);
INSERT INTO now_playing (theatre_id, movie_id) VALUES (2, 508883);
INSERT INTO now_playing (theatre_id, movie_id) VALUES (3, 365620);
INSERT INTO now_playing (theatre_id, movie_id) VALUES (4, 365620);
INSERT INTO now_playing (theatre_id, movie_id) VALUES (5, 753342);
INSERT INTO now_playing (theatre_id, movie_id) VALUES (5, 840430);
INSERT INTO now_playing (theatre_id, movie_id) VALUES (3, 10775);

SET FOREIGN_KEY_CHECKS=1;