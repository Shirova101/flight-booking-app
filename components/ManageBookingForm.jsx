import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { setPNR, fetchBookingRequest } from '../redux/slices/checkInSlice';
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
      <Text style={styles.label}>Enter PNR:</Text>
      <TextInput
        style={styles.input}
        value={PNR}
        onChangeText={setLocalPNR}
        placeholder="Enter PNR"
      />
      <Button title="Fetch Booking" onPress={handleCheckIn} disabled={loading} />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default ManageBookingForm;
