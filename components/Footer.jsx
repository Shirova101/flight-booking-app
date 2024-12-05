import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-dom';

const steps = ['/passenger-details', '/add-ons', '/payment-page'];

const Footer = ({ totalCost, isFlightSelected = true, current_step }) => {
  const navigate = useNavigate();

  const handleContinue = () => {
    if (isFlightSelected) {
      navigate(steps[current_step]); // Adjust route as needed
    }
  };

  return (
    <View style={styles.footer}>
      <Text style={styles.totalCost}>Total Cost: ${totalCost}</Text>
      <Button
        title="Continue"
        onPress={handleContinue}
        disabled={!isFlightSelected} // Disable if form is invalid
        color="#007bff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    flexDirection: 'row', // Align items horizontally
    justifyContent: 'space-between', // Space between elements
    alignItems: 'center', // Center vertically
  },
  totalCost: {
    fontSize: 18,
  },
});

export default Footer;
