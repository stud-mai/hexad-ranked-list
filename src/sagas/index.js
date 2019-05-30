import { interval } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { eventChannel } from 'redux-saga';
import { takeLatest, takeEvery, take, call, put, select } from 'redux-saga/effects';

import * as actions from '../redux/actions';
import * as actionTypes from '../redux/actions/actionTypes';
import movieList from '../data/fav-movies';

const MOVIES_COUNT = movieList.length;
const MAX_RANK = 10;
const timeline = interval(1000).pipe(
    filter(v => Math.random() * v < v / 2),
    map(() => [
        Math.floor(Math.random() * MOVIES_COUNT),
        Math.floor(Math.random() * MAX_RANK + 1)
    ])
);

function* startRandomRating() {
    const channel = yield call(subscriptionChannel);

    yield takeEvery(channel, function* ([movieIndex, rank]) {
        const id = yield select(({ rankList }) => rankList[movieIndex].id);
        yield put(actions.updateMovieRank(id, rank));
    });

    yield take(actionTypes.STOP_RANDOM_RATING);
    channel.close();
}

function subscriptionChannel() {
    return eventChannel(emit => {
        const subscription = timeline.subscribe(randomData => {
            emit(randomData);
        });
        return () => {
            subscription.unsubscribe();
        }
    })
}

export default function* rootSaga() {
    yield takeLatest(actionTypes.START_RANDOM_RATING, startRandomRating);
}