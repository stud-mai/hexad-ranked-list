import { takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../redux/actions/actionTypes'

function* loadMovieList () {

}

export default function* rootSaga() {
    yield takeLatest(actionTypes.LOAD_MOVIE_LIST, loadMovieList);
}