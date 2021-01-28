# weather-playlist
A microservice to register a user and recommend songs based on hometown weather.

## Documentation
Back-end APIs documentation can be found on route http://localhost:4000/api/v1/doc/

## Setup

To setup your environment, create a docker image with the command: <br>
(being inside the project folder)

```bash
$ docker build . -t weather-playlist/nodejs-mysql-app
```
## Run
Now you can execute the previously created image with the command::
```bash
$ docker-compose up
```

OBS1: If the docker cannot connect to the local network the external apis (Weather and Spotify on /playlists) will not work properly.

OBS2: I was unable to generate a permanent spotify token, so if the temporary token has expired, I ask you to please enter the link https://developer.spotify.com/console/get-search-item/ and click "GET TOKEN" to generate a new token, and then insert that new token into the .env file in the SPOTIFY_TEMP_TOKEN variable. I know the .env file shouldn't be in git but I left it public to make it easier to change the token. I didn't leave the other variables in the .env as well because I would have to publish them anyway.

## Database
To access the database you can enter http://localhost:30002 and sign in with the credentials MYSQL_USER and MYSQL_PASSWORD that are in the file [docker-compose.yml](https://github.com/DenisSlapelis/weather-playlist/blob/master/docker-compose.yml).
