import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { checkInRequest } from '../../redux/slices/checkInSlice';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/pages/checkIn/CheckInDetails.styles';

import FlightCard from '../../components/FlightCard';
import AddOnList from '../../components/AddOnList';
import PassengerDisplay from '../../components/PassengerDisplay';

const CheckInDetails = () => {
  const { passengerDetails, bookingDetails, outboundAddOns, returnAddOns, loading, error } = useSelector(
    (state) => state.checkIn
  );
  console.log(passengerDetails)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleConfirmCheckIn = () => {
    dispatch(checkInRequest({ PNR: bookingDetails.PNR, flightType: bookingDetails.flightType }));
    navigate('/checkIn-confirmation');
  };

  React.useEffect(() => {
    if (!loading && !error && bookingDetails?.checkInCompleted) {
      navigate('/checkin-confirmation');
    }
  }, [loading, error, bookingDetails, navigate]);

  if (loading || !passengerDetails || !bookingDetails) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={styles.loadingText.color} />
        <Text style={styles.loadingText}>Loading Check-In Details...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Check-In Summary</Text>
      
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

      {/* Confirm Check-In Button */}
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleConfirmCheckIn}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color={styles.buttonText.color} /> : <Text style={styles.buttonText}>Confirm Check-In</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CheckInDetails;
