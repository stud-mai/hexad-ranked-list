import * as actionTypes from '../actions/actionTypes';

export const INITIAL_STATE = {
    rankList: [],
    movieBeingRated: {},
    randomRatingActivated: false
};

const loadMovieList = (state, { movieList }) => ({ ...state, rankList: movieList });

const openMovieRater = (state, { id, rank, title }) => ({ ...state, movieBeingRated: { id, rank, title } });

const closeMovieRater = (state) => ({ ...state, movieBeingRated: {} });

const updateMovieRank = (state, { id, rank }) => {
    const rankList = state.rankList
        .map(movie => {
            if (movie.id !== id) return movie;
            return { ...movie, rank }
        })
        .sort((a, b) => b.rank - a.rank);


    return {
        ...state,
        movieBeingRated: {
            ...state.movieBeingRated,
            rank
        },
        rankList,
    };
};

const startRandomRating = (state) => ({ ...state, randomRatingActivated: true });

const stopRandomRating = (state) => ({ ...state, randomRatingActivated: false });

const rankList = (state = INITIAL_STATE, action) => {
    const handlers = {
        [actionTypes.LOAD_MOVIE_LIST]: loadMovieList,
        [actionTypes.OPEN_MOVIE_RATER]: openMovieRater,
        [actionTypes.CLOSE_MOVIE_RATER]: closeMovieRater,
        [actionTypes.UPDATE_MOVIE_RANK]: updateMovieRank,
        [actionTypes.START_RANDOM_RATING]: startRandomRating,
        [actionTypes.STOP_RANDOM_RATING]: stopRandomRating
    }
    return handlers[action.type] ? handlers[action.type](state, action) : state;
};

export default rankList;