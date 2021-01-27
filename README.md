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

OBS: If the docker cannot connect to the local network the external apis (Weather and Spotify on /playlists) will not work properly.
