import * as actions from '../index';
import * as actionTypes from '../actionTypes';

describe('Action creators', () => {
    it('should create action to load movie list', () => {
        expect(actions.loadMovieList).toBeDefined();
        expect(actions.loadMovieList([{}])).toEqual({
            type: actionTypes.LOAD_MOVIE_LIST,
            movieList: [{}]
        });
    });

    it('should create action to open movie rater', () => {
        expect(actions.openMovieRater).toBeDefined();
        expect(actions.openMovieRater('movie-id', 5, 'Test Movie')).toEqual({
            type: actionTypes.OPEN_MOVIE_RATER,
            id: 'movie-id',
            rank: 5,
            title: 'Test Movie'
        });
    });

    it('should create action to close movie rater', () => {
        expect(actions.closeMovieRater).toBeDefined();
        expect(actions.closeMovieRater()).toEqual({
            type: actionTypes.CLOSE_MOVIE_RATER
        });
    });

    it('should create action to update movie rank', () => {
        expect(actions.updateMovieRank).toBeDefined();
        expect(actions.updateMovieRank('movie-id', 10)).toEqual({
            type: actionTypes.UPDATE_MOVIE_RANK,
            id: 'movie-id',
            rank: 10
        });
    });

    it('should create action to start random rating', () => {
        expect(actions.startRandomRating).toBeDefined();
        expect(actions.startRandomRating()).toEqual({
            type: actionTypes.START_RANDOM_RATING
        });
    });

    it('should create action to stop random rating', () => {
        expect(actions.stopRandomRating).toBeDefined();
        expect(actions.stopRandomRating()).toEqual({
            type: actionTypes.STOP_RANDOM_RATING
        });
    });
});