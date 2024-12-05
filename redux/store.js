// store.js
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import guestReducer from './slices/guestSlice';
import flightReducer from './slices/flightSlice.js';
import checkInReducer from './slices/checkInSlice.js'

import rootSaga from './sagas/index.js';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    guest: guestReducer,
    flights: flightReducer,
    checkIn: checkInReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);


export default store;
