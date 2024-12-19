import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from '../styles/pages/flightBooking/PaymentPage.styles';

const PaymentOption = ({ onPress, optionName }) => (
  <TouchableOpacity style={styles.paymentButton} onPress={onPress}>
    <Text>{optionName}</Text>
  </TouchableOpacity>
);

export default PaymentOption;
