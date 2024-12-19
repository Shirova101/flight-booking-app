import React from 'react';
import PaymentOption from './PaymentOption';  // Import PaymentOption Component
import { View } from 'react-native';
import styles from '../styles/pages/flightBooking/PaymentPage.styles';

const PaymentOptionsList = ({ options }) => (
  <View style={styles.paymentOptions}>
    {options.map((option, index) => (
      <PaymentOption
        key={index}
        optionName={option}
        onPress={() => console.log(`${option} selected`)} // Placeholder for the actual logic
      />
    ))}
  </View>
);

export default PaymentOptionsList;
