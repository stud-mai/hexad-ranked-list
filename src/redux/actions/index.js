import * as actionTypes from './actionTypes';

export const loadMovieList = (movieList) => ({ type: actionTypes.LOAD_MOVIE_LIST, movieList });

export const openMovieRater = (id, rank, title) => ({ type: actionTypes.OPEN_MOVIE_RATER, id, rank, title });

export const closeMovieRater = () => ({ type: actionTypes.CLOSE_MOVIE_RATER });

export const updateMovieRank = (id, rank) => ({ type: actionTypes.UPDATE_MOVIE_RANK, id, rank });

export const startRandomRating = () => ({ type: actionTypes.START_RANDOM_RATING });

export const stopRandomRating = () => ({ type: actionTypes.STOP_RANDOM_RATING });