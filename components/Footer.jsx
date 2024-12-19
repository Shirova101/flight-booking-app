import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/components/Footer.styles';
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

export default Footer;
