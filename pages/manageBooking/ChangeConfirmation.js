import React from 'react';
import { ScrollView, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/pages/manageBooking/ChangeConfirmation.styles.js';

import FlightCard from '../../components/FlightCard';
import PassengerDisplay from '../../components/PassengerDisplay';
import PaymentDisplay from '../../components/PaymentDisplay';

const ChangeConfirmation = () => {
  const { bookingModified, bookingDetails, passengerDetails, loading, error } = useSelector((state) => state.checkIn);
  const navigate = useNavigate();

  // Adding safety checks to ensure bookingDetails and flightDetails are available
  const flightDetails = bookingDetails?.flightDetails;
  const returnFlightDetails = bookingDetails?.returnFlightDetails;
  const paymentDetails = bookingDetails?.payment;

  // Check if bookingDetails or flightDetails are undefined or null
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>An error occurred: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Booking Change Confirmation</Text>

      {/* Booking Modified Success or Failure Message */}
      {bookingModified ? (
        <Text style={styles.successMessage}>Booking Modified Successfully!</Text>
      ) : (
        <Text style={styles.failureMessage}>Booking Modification Failed. Please try again.</Text>
      )}

      {/* Flight Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Booking Details</Text>
        {flightDetails ? (
          <FlightCard
            flight={flightDetails}
            isSelected={true}
            isReturn={false}
          />
        ) : (
          <Text style={styles.errorText}>Flight details are not available</Text>
        )}
        
        {bookingDetails.flightType === 'twoWay' && returnFlightDetails ? (
          <FlightCard 
            flight={returnFlightDetails} 
            isSelected={true} 
            isReturn={true} 
          />
        ) : (
          bookingDetails.flightType === 'twoWay' && <Text style={styles.errorText}>Return flight details are not available</Text>
        )}
      </View>

      {/* Passenger Details */}
      {passengerDetails ? (
        <PassengerDisplay passengers={passengerDetails} />
      ) : (
        <Text style={styles.errorText}>Passenger details are not available</Text>
      )}

      {/* Payment Details */}
      {paymentDetails ? (
        <PaymentDisplay payment={paymentDetails} totalCost={paymentDetails.totalCost} />
      ) : (
        <Text style={styles.errorText}>Payment details are not available</Text>
      )}

      {/* Back to Home Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigate('/')}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ChangeConfirmation;
