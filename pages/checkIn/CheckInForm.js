// src/pages/CheckInPage.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigate } from 'react-router-dom';
import FormField from '../../components/FormField';
import { setPNR, fetchBookingRequest } from '../../redux/slices/checkInSlice';
import styles from '../../styles/pages/checkIn/CheckInForm.styles';

const CheckInForm = () => {
  const [PNR, setPNRValue] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.checkIn);

  const handleCheckIn = () => {
    if (PNR.trim()) {
      dispatch(setPNR(PNR));
      dispatch(fetchBookingRequest({ PNR }));
      navigate('/checkIn-details');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Check-In</Text>
      <View style={styles.formContainer}>
        <FormField
          label="Enter PNR"
          type="text"
          value={PNR}
          onChange={setPNRValue}
          placeholder="Enter your PNR number"
          error={error}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleCheckIn}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Fetching...' : 'Fetch Booking'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckInForm;
