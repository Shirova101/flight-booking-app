import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  PNR: '',
  bookingDetails: null, // Stores booking fetched from backend
  passengerDetails:[],
  primaryPassenger: null, // Details of the primary passenger
  outboundAddOns: {
    assistance: false,
    insurance: false,
    food: false,
    wifi: false,
  }, // Add-on details for outbound flight
  returnAddOns: {
    assistance: false,
    insurance: false,
    food: false,
    wifi: false,
  }, // Add-on details for return flight
  checkInSuccess: false,
  bookingModified: false, // To track if any booking modification has been made
  loading: false,
  error: null,
};

const checkInSlice = createSlice({
  name: 'checkIn',
  initialState,
  reducers: {
    setPNR(state, action) {
      state.PNR = action.payload;
    },
    fetchBookingRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchBookingSuccess(state, action) {
      console.log(action.payload);
      state.loading = false;
      state.bookingDetails = action.payload;
      state.primaryPassenger = action.payload.passengers.find((p) => p.isPrimary) || null;
      state.passengerDetails = [...action.payload.passengers];
      // Initialize add-ons from backend response
      state.outboundAddOns = action.payload.flightDetails?.addOnsSelected || state.outboundAddOns;
      state.returnAddOns = action.payload.returnFlightDetails?.addOnsSelected || state.returnAddOns;
    },
    fetchBookingFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    checkInRequest(state) {
      state.loading = true;
      state.error = null;
    },
    checkInSuccess(state) {
      state.loading = false;
      state.checkInSuccess = true;
    },
    checkInFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addPassengerDetail(state, action) {
      state.passengerDetails =[...action.payload] // Replace with new passenger list
    },
    updatePassengerDetail(state, action) {
      const updatedDetails = state.passengerDetails.map((passenger) =>
        passenger.id === action.payload.id
          ? { ...passenger, ...action.payload }
          : passenger
      );
      state.passengerDetails = updatedDetails;
    },

    // Update add-on choices in state for outbound or return flights
    updateAddOns(state, action) {
      const { flightType, addOn, value } = action.payload; // flightType: 'outbound' or 'return'
      if (flightType === 'outbound') {
        state.outboundAddOns[addOn] = value;
      } else if (flightType === 'return') {
        state.returnAddOns[addOn] = value;
      }
    },

    // Action to modify the booking details (update add-ons, change passengers, etc.)
    modifyBookingRequest(state) {
      state.loading = true;
      state.error = null;
    },
    modifyBookingSuccess(state, action) {
      state.loading = false;
      state.bookingDetails = action.payload.updatedDetails; // Assuming updated details are returned
      state.bookingModified = true; // Set booking as modified
      state.primaryPassenger = action.payload.updatedDetails.passengers.find((p) => p.isPrimary) || null;
      // Update add-ons in state after modification
      state.outboundAddOns = action.payload.updatedDetails.flightDetails?.addOnsSelected || state.outboundAddOns;
      state.returnAddOns = action.payload.updateDetails.returnFlightDetails?.addOnsSelected || state.returnAddOns;
    },
    modifyBookingFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Reset booking modification status
    resetBookingModification(state) {
      state.bookingModified = false;
    },
  },
});

export const {
  setPNR,
  fetchBookingRequest,
  fetchBookingSuccess,
  fetchBookingFailure,
  checkInRequest,
  checkInSuccess,
  checkInFailure,
  updateAddOns,
  modifyBookingRequest,
  modifyBookingSuccess,
  modifyBookingFailure,
  updatePassengerDetail,
  resetBookingModification,
} = checkInSlice.actions;

export default checkInSlice.reducer;
