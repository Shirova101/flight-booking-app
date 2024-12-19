import { call, put, takeLatest, select } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchBookingRequest,
  fetchBookingSuccess,
  fetchBookingFailure,
  checkInRequest,
  checkInSuccess,
  checkInFailure,
  modifyBookingRequest,
  modifyBookingSuccess,
  modifyBookingFailure,
  addPassengerDetail,
} from '../slices/checkInSlice';

const BASE_URL = 'http://localhost:4000/api/v1';

/**
 * Utility function to handle API errors.
 * Extracts meaningful messages from the response or defaults to a generic error.
 */
function getErrorMessage(error) {
  return error.response?.data?.message || 'An unexpected error occurred. Please try again later.';
}

/**
 * Saga to fetch booking details using the PNR.
 */
function* fetchBookingSaga(action) {
  try {
    const { PNR } = action.payload;
    const response = yield call(axios.get, `${BASE_URL}/bookings/search`, {
      params: { PNR },
    });
    
    yield put(addPassengerDetail(response.data.data.passengers));
    yield put(fetchBookingSuccess(response.data.data));
  } catch (error) {
    yield put(fetchBookingFailure(getErrorMessage(error)));
  }
}

function* modifyBookingSaga(action) {
  try {
    const { PNR, updatedDetails } = action.payload;

    // Make API call to modify the booking
    const response = yield call(axios.patch, `${BASE_URL}/bookings/update`, {
      PNR,
      updatedDetails,
    });
    // Dispatch success action with the updated booking details
    
    yield put(modifyBookingSuccess({ updatedDetails: response.data.data }));
  } catch (error) {
    // Handle any errors that occur during the API call
    const errorMessage = error.response?.data?.message || error.message;
    yield put(modifyBookingFailure(errorMessage));
  }
}
/**
 * Saga to check in a passenger.
 * Handles both outbound and return flights based on the current check-in status.
 */
function* checkInSaga(action) {
  try {
    const { PNR, flightType } = action.payload;
    const bookingDetails = yield select((state) => state.checkIn.bookingDetails);
    
    // Check if outbound flight check-in is required
    if (!bookingDetails.CheckInCompleted) {
      
      yield call(axios.post, `${BASE_URL}/bookings/checkIn`, {
        PNR:PNR,
        flightType: 'outbound',
      });
      
      // Update state for outbound flight check-in
      yield put(checkInSuccess());
      bookingDetails.CheckInCompleted = true;
    } 
     else {
      throw new Error('All flights have already been checked in.');
    }
  } catch (error) {
    yield put(checkInFailure(getErrorMessage(error)));
  }
}

/**
 * Root saga for all check-in-related actions.
 */
export default function* checkInSagas() {
  yield takeLatest(fetchBookingRequest.type, fetchBookingSaga);
  yield takeLatest(checkInRequest.type, checkInSaga);
  yield takeLatest(modifyBookingRequest.type, modifyBookingSaga);
}
