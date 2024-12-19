// src/components/PaymentDetails.js
import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/pages/flightBooking/ConfirmationPage.styles'; // Add styles as needed

const PaymentDisplay = ({ payment, totalCost }) => {
  const formatCurrency = (value) => new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(value);

  return (
    <View style={styles.paymentSection}>
      <Text style={styles.sectionTitle}>Payment Summary</Text>
      <Text style={styles.paymentStatus}>
        Status: <Text style={styles.boldText}>{(payment?.status || 'Unknown').toUpperCase()}</Text>
      </Text>
      <Text style={styles.totalCostText}>
        Total Paid: {formatCurrency(totalCost)}
      </Text>
    </View>
  );
};

export default PaymentDisplay;
