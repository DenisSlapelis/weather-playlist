const service = require('../../../src/webservices/playlists/playlist.service');

describe('PLAYLIST SYNC FUNCTIONS', () => {
    describe('getPlaylistGenreByTemperature', () => {
        it("should return party", () => {
            const genre = service.getPlaylistGenreByTemperature(30.01);
            expect(genre).toEqual('party');
        });

        it("should return pop", () => {
            const genre = service.getPlaylistGenreByTemperature(30);
            expect(genre).toEqual('pop');
        });

        it("should return pop", () => {
            const genre = service.getPlaylistGenreByTemperature(15);
            expect(genre).toEqual('pop');
        });

        it("should return rock", () => {
            const genre = service.getPlaylistGenreByTemperature(14.99);
            expect(genre).toEqual('rock');
        });

        it("should return rock", () => {
            const genre = service.getPlaylistGenreByTemperature(10);
            expect(genre).toEqual('rock');
        });

        it("should return classical", () => {
            const genre = service.getPlaylistGenreByTemperature(9.99);
            expect(genre).toEqual('classical');
        });
    });
});