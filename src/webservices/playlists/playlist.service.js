const CustomError = require('../../shared/custom-error');
const environment = require('../../environment/environment');
const axios = require('axios');

class PlaylistService {
    constructor() {
    }

    getPlaylist = async (hometown) => {
        const temperature = await this.getTemperature(hometown);
        if (!temperature)
            throw new CustomError('Error to get WeatherMap data');

        const playlistGenre = this.getPlaylistGenreByTemperature(temperature);

        return this.getPlaylistByGenre(playlistGenre);
    }

    getTemperature = async (hometown) => {
        const apiUrl = environment.weatherMapApi;
        const token = environment.weatherMapSecret;
        const queryParams = {
            q: hometown,
            appid: token,
            units: 'metric'
        }

        const response = await axios.get(`http://${apiUrl}/weather`, { params: queryParams });
        const data = response.data;
        const result = data.main && data.main.temp ? data.main.temp : null;

        return result;
    }

    getPlaylistGenreByTemperature = (temperature) => {
        if (temperature > 30)
            return "party";

        if (temperature >= 15 && temperature <= 30)
            return "pop";

        if (temperature >= 10 && temperature < 15)
            return "rock";

        return "classical";
    }

    getPlaylistByGenre = async (genre) => {
        const apiUrl = environment.spotifyApi;
        const token = environment.spotifySecret;
        const queryParams = {
            genre
        }

        const response = await axios.get(`${apiUrl}/playlists`, { params: queryParams });

        const data = response.data;

        return data;
    }
}

module.exports = new PlaylistService();