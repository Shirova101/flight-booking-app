import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigate } from 'react-router-dom';
// Assuming you have a similar slice for managing bookings

import FlightCard from '../../components/FlightCard';
import AddOnList from '../../components/AddOnList';
import PassengerDisplay from '../../components/PassengerDisplay';
import styles from '../../styles/pages/manageBooking/ManageBooking.styles';

const ManageBooking = () => {
  const { passengerDetails, bookingDetails, outboundAddOns, returnAddOns, loading, error } = useSelector(
    (state) => state.checkIn
  );
  
  const navigate = useNavigate();

  const handleMakeChanges = () => {
    navigate('/booking-change');
  };

  if (loading || !passengerDetails || !bookingDetails) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={styles.loadingText.color} />
        <Text style={styles.loadingText}>Loading Booking Details...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Manage Booking</Text>

      {/* Passenger Details */}
      <PassengerDisplay passengers={passengerDetails} />

      {/* Outbound Flight Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Outbound Flight</Text>
        <FlightCard flight={bookingDetails.flightDetails} isSelected={true} isReturn={false} />
        <AddOnList addOns={Object.entries(outboundAddOns)} />
      </View>

      {/* Return Flight Details (If Available) */}
      {bookingDetails.returnFlightDetails && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Return Flight</Text>
          <FlightCard flight={bookingDetails.returnFlightDetails} isSelected={true} isReturn={true} />
          <AddOnList addOns={Object.entries(returnAddOns)} />
        </View>
      )}

      {/* Error Message */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Make Changes Button */}
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleMakeChanges}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={styles.buttonText.color} />
        ) : (
          <Text style={styles.buttonText}>Make Changes</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ManageBooking;
