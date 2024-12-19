import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomeScreen from './pages/HomePage.js';

import { Provider } from 'react-redux'; // Import Redux Provider
import store  from './redux/store.js'; // Import your Redux store
import SearchResults from './pages/flightBooking/SearchResults.js';
import PassengerDetails from './pages/flightBooking/PassengerDetails.js';
import PaymentPage from './pages/flightBooking/PaymentPage.js';
import PaymentPortal from './pages/flightBooking/PaymentPortal.jsx';
import ConfirmationPage from './pages/flightBooking/ConfirmationPage.jsx';
import AddOnsPage from './pages/flightBooking/AddOnsPage.js';
import CheckInDetails from './pages/checkIn/CheckInDetails.js';
import CheckInConfirmation from './pages/checkIn/CheckInConfirmation.js';
import ManageBooking from './pages/manageBooking/ManageBooking.js';
import BookingChange from './pages/manageBooking/BookingChange.js';
import ChangeConfirmation from './pages/manageBooking/ChangeConfirmation.js';

export default function App() {
  return (
    <Provider store={store}>  
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="search-results" element={<SearchResults />} />
          <Route path="/passenger-details" element={<PassengerDetails />} />
          <Route path="/add-ons" element={<AddOnsPage />} />
          <Route path="/payment-page" element={<PaymentPage />} />
          <Route path="/payment-portal" element={<PaymentPortal />} />
          <Route path="/confirmation-page" element={<ConfirmationPage />} />
          <Route path="/checkIn-details" element={<CheckInDetails />} />
          <Route path="/checkIn-confirmation" element={<CheckInConfirmation />} />
          <Route path="/manage-booking" element={<ManageBooking />} />
          <Route path="/booking-change" element={<BookingChange />} />
          <Route path="/change-confirmation" element={<ChangeConfirmation />} />
        </Routes>
      </Router>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});