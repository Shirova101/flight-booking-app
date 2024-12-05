import { all } from 'redux-saga/effects';
import flightSaga from './flightSaga';
import checkInSagas from './checkInSaga';


export default function* rootSaga() {
    yield all([
        flightSaga(),
        checkInSagas(),
    ]);
  }
