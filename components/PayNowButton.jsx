import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from '../styles/pages/flightBooking/PaymentPage.styles';

const PayNowButton = ({ onPress }) => (
  <TouchableOpacity style={styles.payNowButton} onPress={onPress}>
    <Text style={styles.payNowButtonText}>Pay Now</Text>
  </TouchableOpacity>
);

export default PayNowButton;
