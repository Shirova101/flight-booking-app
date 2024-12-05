import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  details: {
    name: '',
    email: '',
    phone: '',
  },
  booking: {
    flightType: 'oneWay', // 'oneWay', 'roundTrip'
    fromLocation: '',
    toLocation: '',
    departureDate: '',
    returnDate: '', // Optional for round trips
    passengers: {
      adults: 1,
      children: 0,
      infants: 0, 
    },
    PNR: null, // Unique PNR after booking
  },
  outboundFlight: {
    flightNumber: '',
    addOns: {
      assistance: { selected: false, cost: 100 },
      insurance: { selected: false, cost: 250 },
      food: { selected: false, cost: 150 },
      wifi: { selected: false, cost: 50 },
    },
  },
  returnFlight: {
    flightNumber: '', // For round-trip bookings
    addOns: {
      assistance: { selected: false, cost: 100 },
      insurance: { selected: false, cost: 250 },
      food: { selected: false, cost: 150 },
      wifi: { selected: false, cost: 50 },
    },
  },
  payment: {
    status: 'Pending', // 'pending', 'completed', 'failed'
    totalCost: 0,
  },
  contactInfo: {
    title: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    country: '',
    city: '',
  },
  passengerDetails: [], // Passenger info for outbound flight
  returnPassengerDetails: [], // Passenger info for return flight (if different)
  primaryPassengerId: null, // ID to track primary passenger for loyalty programs
  error: null,
  loading: false,
};

const guestSlice = createSlice({
  name: 'guest',
  initialState,
  reducers: {
    fetchGuestDetails(state) {
      state.loading = true;
    },
    setGuestDetails(state, action) {
      state.details = action.payload;
      state.loading = false;
    },
    setFlightSelection(state, action) {
      state.booking = {
        ...state.booking,
        ...action.payload,
      };
    },
    setOutboundFlight(state, action) {
      state.outboundFlight.flightNumber = action.payload.flightNumber;
    },
    setReturnFlight(state, action) {
      state.returnFlight.flightNumber = action.payload.flightNumber;
    },
    toggleOutboundAddOn(state, action) {
      const { addOnKey } = action.payload;
      const selected = !state.outboundFlight.addOns[addOnKey].selected;
      state.outboundFlight.addOns[addOnKey].selected = selected;

      // Update total cost
      state.payment.totalCost += selected ? state.outboundFlight.addOns[addOnKey].cost : -state.outboundFlight.addOns[addOnKey].cost;
    },
    toggleReturnAddOn(state, action) {
      const { addOnKey } = action.payload;
      const selected = !state.returnFlight.addOns[addOnKey].selected;
      state.returnFlight.addOns[addOnKey].selected = selected;

      // Update total cost
      state.payment.totalCost += selected ? state.returnFlight.addOns[addOnKey].cost : -state.returnFlight.addOns[addOnKey].cost;
    },
    setPassengerInfo(state, action) {
      state.booking.passengers = action.payload;
    },
    setReturnPassengerInfo(state, action) {
      state.returnPassengerDetails = action.payload;
    },
    setAddOns(state, action) {
      state.outboundFlight.addOns = action.payload.outbound || state.outboundFlight.addOns;
      state.returnFlight.addOns = action.payload.return || state.returnFlight.addOns;
    },
    setPaymentStatus(state, action) {
      state.payment.status = action.payload.status;
      state.loading = false;
    },
    setPNR(state, action) {
      state.booking.PNR = action.payload;
    },
    setTotalCost(state, action) {
      state.payment.totalCost = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    setContactInfo(state, action) {
      state.contactInfo = action.payload;
    },
    addPassengerDetail(state, action) {
      state.passengerDetails =[...action.payload] // Replace with new passenger list
    },
    addReturnPassengerDetail(state, action) {
      state.returnPassengerDetails.push(action.payload);
    },
    
    updatePassengerDetail(state, action) {
      const updatedDetails = state.passengerDetails.map((passenger) =>
        passenger.id === action.payload.id
          ? { ...passenger, ...action.payload }
          : passenger
      );
      state.passengerDetails = updatedDetails;
    },
    
    updateReturnPassengerDetail(state, action) {
      const index = state.returnPassengerDetails.findIndex(
        (passenger) => passenger.id === action.payload.id
      );
      if (index !== -1) {
        state.returnPassengerDetails[index] = action.payload;
      }
    },
    setPrimaryPassenger(state, action) {
      state.primaryPassengerId = action.payload;
    },
  },
});

export const {
  fetchGuestDetails,
  setGuestDetails,
  setFlightSelection,
  setOutboundFlight,
  setReturnFlight,
  toggleOutboundAddOn,
  toggleReturnAddOn,
  setPassengerInfo,
  setReturnPassengerInfo,
  setAddOns,
  setPaymentStatus,
  setPNR,
  setTotalCost,
  setLoading,
  setError,
  setContactInfo,
  addPassengerDetail,
  addReturnPassengerDetail,
  updatePassengerDetail,
  updateReturnPassengerDetail,
  setPrimaryPassenger,
} = guestSlice.actions;

export default guestSlice.reducer;