import React from 'react';
import { View, Text, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setLoading, setPaymentStatus, setPNR } from '../../redux/slices/guestSlice';
import styles from '../../styles/pages/flightBooking/PaymentPortal.styles';

const BASE_URL = 'http://localhost:4000/api/v1';

// Utility to generate a unique PNR
const generatePNR = () => `PNR${Math.random().toString(36).substr(2, 8).toUpperCase()}`;

const PaymentPortal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access required state from Redux
  const {guest , flights } = useSelector((state) => state);
  const loading = useSelector((state) => state.guest.loading); // Loading state for flights

  const paymentStatus = useSelector((state) => state.guest.payment.status);
  const totalCost = useSelector((state) => state.guest.payment.totalCost);

  const createBooking = async () => {
    const PNR = generatePNR();
    dispatch(setLoading(true));
    const bookingData = {
      PNR: guest.booking.PNR || generatePNR(),
      guestDetails: {...guest.contactInfo},
      flightType:guest.booking.flightType,
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
      returnFlightDetails: guest.booking.flightType === 'twoWay' ? {
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
        phone: passenger.phone || null,
        isPrimary: passenger.isPrimary, 
      })),
      payment: {
        status: 'Completed',
        totalCost: guest.payment.totalCost,
      },
    };
    console.log(bookingData);
  

    try {
      // Trigger the API call to save booking details
      const response = await axios.post(`${BASE_URL}/bookings/create`, bookingData);
      if (response.data.success) {
        dispatch(setPaymentStatus({ status: 'Completed' }));
        dispatch(setPNR(PNR)); // Save PNR in Redux store
        navigate('/confirmation-page'); // Navigate to the confirmation page
      } else {
        throw new Error('Booking failed. Please try again.');
      }
    } catch (error) {
      // Handle API errors
      Alert.alert('Error', error.message || 'An error occurred during booking.');
      dispatch(setPaymentStatus({ status: 'Failed' }));
    }
  };

  const handlePaymentSuccess = () => {
    dispatch(setPaymentStatus({ status: 'Completed' }));
    createBooking();
    navigate('/confirmation-page')
  };

  const handlePaymentFailure = () => {
    dispatch(setPaymentStatus({ status: 'Failed' }));
    Alert.alert('Payment Failed', 'Your payment process was not successful. Please try again.');
    navigate('/payment-page'); // Navigate back to the payment page
  };

  
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading flights...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Payment Portal</Text>
      <Text style={styles.subheader}>Total Cost: ₹{totalCost}</Text>
      <Text style={styles.subheader}>Simulate Payment:</Text>

      {paymentStatus === 'loading' ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.buttonContainer}>
          <Button title="Success" onPress={handlePaymentSuccess} color="green" />
          <Button title="Failure" onPress={handlePaymentFailure} color="red" />
        </View>
      )}

      {paymentStatus === 'completed' && (
        <Text style={styles.successMessage}>Payment successful! Redirecting...</Text>
      )}
      {paymentStatus === 'failed' && (
        <Text style={styles.errorMessage}>Payment failed! Please try again.</Text>
      )}
    </View>
  );
};

export default PaymentPortal; 