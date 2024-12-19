import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/pages/flightBooking/ConfirmationPage.styles'; // Add styles as needed

const PassengerDisplay = ({ passengers }) => {
  // Ensure passengers is an array (wrap in an array if it's an object)
  const passengerArray = Array.isArray(passengers) ? passengers : [passengers];
  React.useEffect(() => {
    console.log(passengers);
  }, [passengers]);
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Passenger Details</Text>
      {passengers && passengerArray.length > 0 ? (
        passengerArray.map((passenger, index) => (
          <Text key={index} style={styles.detailText}>
            {index + 1}. {passenger.firstName} {passenger.lastName} ({passenger.phone || 'N/A'})
          </Text>
        ))
      ) : (
        <Text style={styles.noDataText}>No passenger details available.</Text>
      )}
    </View>
  );
};

export default PassengerDisplay;
