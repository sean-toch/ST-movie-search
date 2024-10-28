## Movie Search Website Overview
This Code is fir a movie searching website which allows users to search by movie title, rating or both. This frontend is built using HTML, CSS and Javascript and uses IMDB APIs as well as an API built by the backend to retrive the search results and all the informations about them. Users can click on search results to see more information like cast, runtime and the current showing of the movies. Users can add movies to either a Favorites or To-Watch list which is saved using browser caches and they can search for movies specifically in these lists. The backend of the site uses PHP and is responsible for the admin pages and managing the theatres and movies in the database. The admin pages require a login enforced by cookies and session states and uses SQL queries to allows changes to the movie database which holds which movies are playing at which theatres. This project was previously hosted on Google Cloud Platforms and met 115/115 functional requirments set by the assignment. 


## COMP3512 - Codespace Base Template:

### LAMPish

| Name    | Version                        |
| ------- | ------------------------------ |
| Linux   | Debian GNU/Linux 11 (bullseye) |
| Apache  | 2.4.56 (Debian)                |
| MariaDB | 15.1 Distribution 10.5.21      |
| PHP     | 8.2.13 (cli)                   |

### Node

- Node 20.10.0
- NPM 10.2.3

### Workspace-specific Extensions

These are all installed via `devcontainer.json`.

| Identifier                            | Name               | Purpose                                  |
| ------------------------------------- | ------------------ | ---------------------------------------- |
| bmewburn.vscode-intelephense-client   | Intelephense       | Code completion, linting, formatting.    |
| cweijan.vscode-database-client2       | Database Client    | GUI-ish DB admin tool. Replaces DBeaver. |
| esbenp.prettier-vscode                | Prettier           | Formatting JS.                           |
| neilbrayfield.php-docblocker          | PHP DocBlocker     | New 2024. PHP documentation tool.        |
| rangav.vscode-thunder-client          | Thunder Client     | Rest API tool.                           |
| ritwickdey.liveserver                 | Live Server        | See changes to code in browser on save.  |
| streetsidesoftware.code-spell-checker | Code Spell Checker | No excuses for poor spelling.            |
| xdebug.php-debug                      | PHP Debug          | Makes PHP debugging possible.            |

ESLint and Prettier are also brought in via the `package.json`.
