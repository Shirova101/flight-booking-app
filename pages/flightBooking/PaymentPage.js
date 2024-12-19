import React from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProgressHeader from '../../components/ProgressHeader';
import PaymentOptionsList from '../../components/PaymentOptionsList'; // Import PaymentOptionsList Component
import PayNowButton from '../../components/PayNowButton';  // Import PayNowButton Component
import styles from '../../styles/pages/flightBooking/PaymentPage.styles';

const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalCost = useSelector((state) => state.guest.payment.totalCost);

  const handlePayNow = () => {
    navigate('/payment-portal'); // Navigate to the payment portal
  };

  // List of Payment Options
  const paymentOptions = ['Credit Card', 'Debit Card', 'UPI', 'Net Banking'];

  return (
    <View style={styles.container}>
      {/* Progress Header with Current Step */}
      <ProgressHeader currentStep={2} />

      {/* Payment Section */}
      <View style={styles.content}>
        <Text style={styles.header}>Payment</Text>
        <Text style={styles.totalCost}>Total Amount Due: ₹{totalCost}</Text>
        <Text style={styles.subheader}>Choose Payment Method</Text>

        {/* Payment Options List */}
        <PaymentOptionsList options={paymentOptions} />

        {/* Pay Now Button */}
        <PayNowButton onPress={handlePayNow} />
      </View>
    </View>
  );
};

export default PaymentPage;
