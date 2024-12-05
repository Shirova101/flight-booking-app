import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CheckInConfirmation = () => {
  const { checkInSuccess, bookingDetails, primaryPassenger } = useSelector((state) => state.checkIn);
  const navigate = useNavigate();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Check-In Confirmation</Text>

      {/* Check-in Success or Failure Message */}
      {checkInSuccess ? (
        <Text style={styles.successMessage}>Check-In Successful!</Text>
      ) : (
        <Text style={styles.failureMessage}>Check-In Failed. Please try again.</Text>
      )}

      {/* Display Booking and Passenger Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsHeader}>Booking Details:</Text>

        {/* Flight Information */}
        <Text style={styles.detailItem}>
          <Text style={styles.detailLabel}>Flight Number:</Text> {bookingDetails.flightDetails.flightNumber}
        </Text>
        <Text style={styles.detailItem}>
          <Text style={styles.detailLabel}>Airline:</Text> {bookingDetails.flightDetails.airlineName}
        </Text>
        <Text style={styles.detailItem}>
          <Text style={styles.detailLabel}>From:</Text> {bookingDetails.flightDetails.fromLocation}
        </Text>
        <Text style={styles.detailItem}>
          <Text style={styles.detailLabel}>To:</Text> {bookingDetails.flightDetails.toLocation}
        </Text>
        <Text style={styles.detailItem}>
          <Text style={styles.detailLabel}>Departure Time:</Text> {new Date(bookingDetails.flightDetails.departureTime).toLocaleString()}
        </Text>
        <Text style={styles.detailItem}>
          <Text style={styles.detailLabel}>Arrival Time:</Text> {new Date(bookingDetails.flightDetails.arrivalTime).toLocaleString()}
        </Text>

        {/* Passenger Information */}
        <Text style={styles.detailsHeader}>Passenger Details:</Text>
        <Text style={styles.detailItem}>
          <Text style={styles.detailLabel}>Name:</Text> {primaryPassenger.name}
        </Text>
        <Text style={styles.detailItem}>
          <Text style={styles.detailLabel}>Age:</Text> {primaryPassenger.age}
        </Text>
        <Text style={styles.detailItem}>
          <Text style={styles.detailLabel}>Gender:</Text> {primaryPassenger.gender}
        </Text>
        <Text style={styles.detailItem}>
          <Text style={styles.detailLabel}>Seat Number:</Text> {primaryPassenger.seatNumber || 'Not Assigned'}
        </Text>
      </View>

      {/* Back to Home Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigate('/')}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 18,
    color: 'green',
    textAlign: 'center',
    marginBottom: 20,
  },
  failureMessage: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  detailsContainer: {
    marginBottom: 30,
  },
  detailsHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginVertical: 10,
  },
  detailItem: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  detailLabel: {
    fontWeight: '600',
    color: '#333',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
});

export default CheckInConfirmation;
