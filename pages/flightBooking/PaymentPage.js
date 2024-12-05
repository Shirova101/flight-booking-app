import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProgressHeader from '../../components/ProgressHeader';
import Footer from '../../components/Footer';

const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalCost = useSelector((state) => state.guest.payment.totalCost);

  const handlePayNow = () => {
    navigate('/payment-portal'); // Navigate to the payment portal
  };

  return (
    <View style={styles.container}>
      {/* Progress Header with Current Step */}
      <ProgressHeader currentStep={2} />

      {/* Payment Section */}
      <View style={styles.content}>
        <Text style={styles.header}>Payment</Text>
        <Text style={styles.totalCost}>Total Amount Due: ${totalCost}</Text>
        <Text style={styles.subheader}>Choose Payment Method</Text>
        
        {/* Simulated Payment Options */}
        <View style={styles.paymentOptions}>
          <TouchableOpacity style={styles.paymentButton}>
            <Text>Credit Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentButton}>
            <Text>Debit Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentButton}>
            <Text>UPI</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentButton}>
            <Text>Net Banking</Text>
          </TouchableOpacity>
        </View>

        {/* Pay Now Button */}
        <TouchableOpacity style={styles.payNowButton} onPress={handlePayNow}>
          <Text style={styles.payNowButtonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>

      {/* Footer with Total Cost */}
      <Footer totalCost={totalCost} isFlightSelected={true} current_step={2} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  totalCost: {
    fontSize: 20,
    marginBottom: 15,
    fontWeight: '500',
  },
  subheader: {
    fontSize: 18,
    marginBottom: 15,
  },
  paymentOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  paymentButton: {
    width: '45%',
    backgroundColor: '#e9ecef',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  payNowButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  payNowButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default PaymentPage;
