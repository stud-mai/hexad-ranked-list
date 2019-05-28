import * as actionTypes from '../actions/actionTypes';

import movieList from '../../data/fav-movies'

const INITIAL_STATE = {
    rankList: [],
    itemEditing: false,
};

const loadMovieList = (state) => ({ ...state, rankList: movieList })

const rankList = (state = INITIAL_STATE, action) => {
    const handlers = {
        [actionTypes.LOAD_MOVIE_LIST]: loadMovieList
    }
    return handlers[action.type] ? handlers[action.type](state, action) : state;
}

export default rankList;