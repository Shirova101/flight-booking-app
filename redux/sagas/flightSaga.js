import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';  // Ensure axios is imported
import { setFlights, setLoading, setError, setReturnFlights } from '../slices/flightSlice';

// Base URL for your backend API
const BASE_URL = 'http://localhost:4000/api/v1';

// Worker Saga: Fetch flights based on search criteria
function* fetchFlights(action) {
  const { fromLocation, toLocation, departureDate, returnDate } = action.payload;

  try {
    yield put(setLoading(true)); // Set loading state before API call

    // Call the backend API using axios for the outbound flight
    const response = yield call(axios.get, `${BASE_URL}/flights/search`, {
      params: { fromLocation, toLocation, departureDate }, // Pass query parameters
    });

    // Dispatch the flights data for outbound flights to Redux
    yield put(setFlights(response.data));

    // If returnDate is provided, fetch return flights
    if (returnDate) {
      const return_response = yield call(axios.get, `${BASE_URL}/flights/search`, {
        params: { fromLocation: toLocation, toLocation: fromLocation, departureDate: returnDate }, // Swap locations for return flight
      });
      yield put(setReturnFlights(return_response.data)); // Dispatch return flights to Redux
    }

    yield put(setLoading(false)); // End loading state

  } catch (error) {
    // Dispatch the error if something goes wrong
    const errorMessage =
      error.response?.data?.message || 'Failed to fetch flights. Please try again later.';
    yield put(setError(errorMessage));
    yield put(setLoading(false)); // End loading state even if there's an error
  }
}

// Watcher Saga: Listens for 'setSearchCriteria' action to trigger the flight search
export default function* flightSaga() {
  yield takeLatest('flights/setSearchCriteria', fetchFlights);
}
