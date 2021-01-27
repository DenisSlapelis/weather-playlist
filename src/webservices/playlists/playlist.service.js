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

        // Ref: https://openweathermap.org/current
        const response = await axios.get(`https://${apiUrl}/weather`, { params: queryParams });
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
        const headers = { Authorization: `Bearer ${token}` };
        const queryParams = {
            q: genre,
            type: 'playlist',
            market: 'US',
            limit: 1,
            offset: 1
        };

        // Ref: https://developer.spotify.com/console/get-search-item/
        const response = await axios.get(`https://${apiUrl}/search`, { headers, params: queryParams });

        const data = response.data;

        return data.playlists ? getPlaylistUrl(data) : '';
    }

    getPlaylistUrl = (spotifyData) => {
        const list = spotifyData.playlists.items;
        const item = list.length > 0 ? list[0] : '';
        const data = item && item.external_urls ? item.external_urls : '';

        return data.spotify ? data.spotify : '';
    }
}

module.exports = new PlaylistService();