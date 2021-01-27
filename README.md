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

OBS: All the docker's internal apis are ok (Users documentation endpoints), but I couldn't execute external apis calls (spotify and weather), so unfortunately the project was incomplete until now.
