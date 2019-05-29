import reducer, { INITIAL_STATE } from '../index';
import * as actionTypes from '../../actions/actionTypes';
import movieListMock from './movieListMock';


describe('App Reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            rankList: [],
            movieBeingRated: {}
        });
    });

    it('should set movie list', () => {
        const action = { type: actionTypes.LOAD_MOVIE_LIST, movieList: [{}] };
        const expectedState = reducer(INITIAL_STATE, action);

        expect(expectedState).toEqual({
            rankList: [{}],
            movieBeingRated: {}
        });
    });

    it('should set movie data for opening movie rater', () => {
        const action = {
            type: actionTypes.OPEN_MOVIE_RATER,
            id: 'movie-id',
            rank: 5,
            title: 'Test Movie'
        };
        const expectedState = reducer(INITIAL_STATE, action);

        expect(expectedState).toEqual({
            rankList: [],
            movieBeingRated: {
                id: 'movie-id',
                rank: 5,
                title: 'Test Movie'
            }
        });
    });

    it('should clear movie data when closing movie rater', () => {
        const action = { type: actionTypes.CLOSE_MOVIE_RATER };
        const expectedState = reducer(INITIAL_STATE, action);

        expect(expectedState).toEqual({
            rankList: [],
            movieBeingRated: {}
        });
    });

    it('should update movie list according to updated movie rank', () => {
        const action = { type: actionTypes.UPDATE_MOVIE_RANK, id: "tt016", rank: 10 };
        const expectedState = reducer({
            rankList: movieListMock,
            movieBeingRated: movieListMock[2]
        }, action);

        expect(expectedState).toEqual({
            rankList: [{
                title: "The Lord of the Rings: The Return of the King",
                rank: 10,
                id: "tt016"
            }, {
                title: "Pulp Fiction",
                rank: 5,
                id: "tt01"
            }, {
                title: "The Prestige",
                rank: 0,
                id: "tt04"
            }],
            movieBeingRated: {
                title: "The Lord of the Rings: The Return of the King",
                rank: 10,
                id: "tt016"
            }
        });
    });
});