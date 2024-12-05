import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchCriteria: {
    fromLocation: '',
    toLocation: '',
    departureDate: null,
    returnDate: null,
  },
  flights: [], // Outbound flights
  returnFlights: [], // Return flights
  selectedFlight: null, // Selected outbound flight
  selectedReturnFlight: null, // Selected return flight
  loading: false,
  error: null,
};

const flightsSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    setSearchCriteria(state, action) {
      state.searchCriteria = action.payload;
    },
    setFlights(state, action) {
      state.flights = action.payload;
    },
    setReturnFlights(state, action) {
      state.returnFlights = action.payload;
    },
    setSelectedFlight(state, action) {
      state.selectedFlight = action.payload;
    },
    setSelectedReturnFlight(state, action) {
      state.selectedReturnFlight = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  setSearchCriteria,
  setFlights,
  setReturnFlights,
  setSelectedFlight,
  setSelectedReturnFlight,
  setLoading,
  setError,
} = flightsSlice.actions;

export default flightsSlice.reducer;