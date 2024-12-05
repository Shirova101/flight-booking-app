import { takeLatest, call, put, select } from 'redux-saga/effects';
import axios from 'axios';
import { setPNR, setLoading, setError } from './guestSlice';

const BASE_URL = 'https://your-api-endpoint.com'; // Replace with your actual API URL

// Selectors for Redux state
const selectGuestState = (state) => state.guest;
const selectFlightsState = (state) => state.flights;

// Function to generate a PNR
const generatePNR = () => {
  return `PNR-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
};

// API call to create booking
const createBookingAPI = async (bookingData) => {
  const response = await axios.post(`${BASE_URL}/bookings/booking`, bookingData);
  return response.data;
};

// Worker Saga for creating a booking
function* handleCreateBooking() {
  try {
    yield put(setLoading(true)); // Set loading state to true

    // Fetch data from the Redux store
    const guest = yield select(selectGuestState);
    const flights = yield select(selectFlightsState);

    // Prepare booking data
    const bookingData = {
      PNR: guest.booking.PNR || generatePNR(),
      flightDetails: {
        flightNumber: flights.selectedFlight?.flightNumber || '',
        airlineName: flights.selectedFlight?.airlineName || '',
        fromLocation: guest.booking.fromLocation,
        toLocation: guest.booking.toLocation,
        departureTime: flights.selectedFlight?.departureTime || null,
        arrivalTime: flights.selectedFlight?.arrivalTime || null,
        duration: flights.selectedFlight?.duration || '',
        baseFare: flights.selectedFlight?.baseFare || 0,
        taxes: flights.selectedFlight?.taxes || 0,
        totalFare: flights.selectedFlight?.totalFare || 0,
        class: flights.selectedFlight?.class || 'Economy',
        status: 'Scheduled',
        addOnsSelected: {
          assistance: guest.outboundFlight.addOns.assistance.selected,
          insurance: guest.outboundFlight.addOns.insurance.selected,
          food: guest.outboundFlight.addOns.food.selected,
          wifi: guest.outboundFlight.addOns.wifi.selected,
        },
        checkInStatus: false,
      },
      returnFlightDetails: guest.booking.flightType === 'twoway' ? {
        flightNumber: flights.selectedReturnFlight?.flightNumber || '',
        airlineName: flights.selectedReturnFlight?.airlineName || '',
        fromLocation: guest.booking.toLocation,
        toLocation: guest.booking.fromLocation,
        departureTime: flights.selectedReturnFlight?.departureTime || null,
        arrivalTime: flights.selectedReturnFlight?.arrivalTime || null,
        duration: flights.selectedReturnFlight?.duration || '',
        baseFare: flights.selectedReturnFlight?.baseFare || 0,
        taxes: flights.selectedReturnFlight?.taxes || 0,
        totalFare: flights.selectedReturnFlight?.totalFare || 0,
        class: flights.selectedReturnFlight?.class || 'Economy',
        status: 'Scheduled',
        addOnsSelected: {
          assistance: guest.returnFlight.addOns.assistance.selected,
          insurance: guest.returnFlight.addOns.insurance.selected,
          food: guest.returnFlight.addOns.food.selected,
          wifi: guest.returnFlight.addOns.wifi.selected,
        },
        checkInStatus: false,
      } : null,
      passengers: guest.passengerDetails.map((passenger) => ({
        id: passenger.id,
        firstName: passenger.firstName,
        lastName: passenger.lastName,
        phone: passenger.phone,
        isPrimary: passenger.isPrimary || null,
      })),
      payment: {
        status: guest.payment.status,
        totalCost: guest.payment.totalCost,
      },
    };

    // Call API to create booking
    const data = yield call(createBookingAPI, bookingData);

    // If API is successful, set the PNR and navigate to the confirmation page
    if (data.success) {
      yield put(setPNR(data.data.PNR));
      // Navigate to confirmation page if needed
      // navigate('/confirmation');
    } else {
      throw new Error('Booking failed. Please try again.');
    }
  } catch (error) { 
    console.error('Booking Error:', error);
    yield put(setError(error.message || 'An error occurred during booking'));
  } finally {
    yield put(setLoading(false)); // Set loading state to false
  }
}

// Watcher Saga for setPaymentStatus
function* guestSaga() {
  yield takeLatest((action) =>
    action.type === 'guest/setPaymentStatus' && action.payload.status === 'Completed', handleCreateBooking);
}

export default guestSaga;
