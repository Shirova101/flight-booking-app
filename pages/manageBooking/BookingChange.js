import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { modifyBookingRequest, updatePassengerDetail } from '../../redux/slices/checkInSlice';

const BookingChange = () => {
  const dispatch = useDispatch();
  const {
    PNR,
    bookingDetails,
    loading,
    error,
    bookingModified,
  } = useSelector((state) => state.checkIn);

  const passengerDetails = useSelector((state) => state.checkIn.passengerDetails);
  const [billingContact, setBillingContact] = useState({ title: '', firstName: '', lastName: '',phone: '', email: '', country: '', city: '' });
  
  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = {...passengerDetails};
    updatedPassengers[index] = {...updatedPassengers[index], [field]: value};
    dispatch(updatePassengerDetail(updatedPassengers[index]));
  };

  const handleBillingChange = (field, value) => {
    setBillingContact({ ...billingContact, [field]: value });
  };

  const handleSubmit = () => {
    const updatedDetails = {
      passengers: passengerDetails,
      guestDetails: billingContact,
    };
    // Dispatch modify booking action
    dispatch(modifyBookingRequest({PNR: PNR, updatedDetails }));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Manage Booking</Text>

      {PNR ? (
        <View>
          <Text style={styles.sectionHeader}>Passenger Details</Text>
          {passengerDetails && passengerDetails.map((passenger, index) => (
            <View key={passenger.id} style={styles.passengerCard}>
              <Text style={styles.subHeader}>Passenger {index + 1}</Text>
              <TextInput
                style={styles.input}
                placeholder="First Name"
                value={passenger.firstName}
                onChangeText={(parcel) => handlePassengerChange(index, 'firstName', parcel)}
              />
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={passenger.lastName}
                onChangeText={(parcel) => handlePassengerChange(index, 'lastName', parcel)}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone"
                value={passenger.phone}
                onChangeText={(parcel) => handlePassengerChange(index, 'phone', parcel)}
              />
            </View>
          ))}

          <Text style={styles.sectionHeader}>Billing Contact Info</Text>
          <TextInput
            style={styles.input}
            value={billingContact.title}
            onChangeText={(value) => handleBillingChange('title', value)}
          />
          <TextInput
            style={styles.input}
            value={billingContact.firstName}
            onChangeText={(value) => handleBillingChange('firstName', value)}
          />
          <TextInput
            style={styles.input}
            value={billingContact.lastName}
            onChangeText={(value) => handleBillingChange('lastName', value)}
          />
          <TextInput
            style={styles.input}
            value={billingContact.phone}
            onChangeText={(value) => handleBillingChange('phone', value)}
          />
          <TextInput
            style={styles.input}
            value={billingContact.email}
            onChangeText={(value) => handleBillingChange('email', value)}
          />
          <TextInput
            style={styles.input}
            value={billingContact.country}
            onChangeText={(value) => handleBillingChange('country', value)}
          />
          <TextInput
            style={styles.input}
            value={billingContact.city}
            onChangeText={(value) => handleBillingChange('city', value)}
          />

          <Button title="Save Changes" onPress={handleSubmit} />
        </View>
      ) : (
        <Text style={styles.errorText}>No booking selected. Please search using the form on the home screen.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  sectionHeader: { fontSize: 20, fontWeight: 'bold', marginVertical: 15 },
  passengerCard: { marginBottom: 20, padding: 10, borderWidth: 1, borderRadius: 8, borderColor: '#ddd' },
  subHeader: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, borderRadius: 5, borderColor: '#ddd', padding: 10, marginBottom: 10 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: 'red', fontSize: 16 },
});

export default BookingChange