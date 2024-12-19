import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import styles from '../../styles/pages/manageBooking/ManageBookingForm.styles.js';
import FormField from '../../components/FormField.jsx';
import { setPNR, fetchBookingRequest } from '../../redux/slices/checkInSlice';
import { useNavigate } from 'react-router-dom';

const ManageBookingForm = () => {
  const [PNR, setLocalPNR] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.checkIn);
  const navigate = useNavigate();
  const handleCheckIn = () => {
    if (PNR.trim()) {
      dispatch(setPNR(PNR));
      dispatch(fetchBookingRequest({PNR:PNR}));
      navigate('/manage-booking');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manage Booking</Text>
      <View style={styles.formContainer}>
        <FormField
          label="Enter PNR"
          type="text"
          value={PNR}
          onChange={setLocalPNR}
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

export default ManageBookingForm;
