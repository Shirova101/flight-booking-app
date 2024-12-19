import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { modifyBookingRequest, updatePassengerDetail } from '../../redux/slices/checkInSlice';
import { useNavigate } from 'react-router-dom';
import FormField from '../../components/FormField';
import styles from '../../styles/pages/manageBooking/BookingChange.styles.js';

const BookingChange = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const {
    PNR,
    passengerDetails,
    bookingDetails,
    loading,
    error,
    bookingModified,
  } = useSelector((state) => state.checkIn);

  
  const [billingContact, setBillingContact] = useState(bookingDetails.guestDetails);

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengerDetails];
    updatedPassengers[index] = { ...updatedPassengers[index], [field]: value };
    dispatch(updatePassengerDetail(updatedPassengers[index]));
  };

  const handleBillingChange = (field, value) => {
    setBillingContact({ ...billingContact, [field]: value });
  };

  const handleSubmit = () => {
    const updatedDetails = {
      passengers: passengerDetails,
      guestDetails: {...bookingDetails.guestDetails, ...billingContact},
    };
    console.log(updatedDetails);
    dispatch(modifyBookingRequest({ PNR, updatedDetails }));
    navigate('/change-confirmation');
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
              <FormField
                label="First Name"
                type="text"
                value={passenger.firstName}
                onChange={(value) => handlePassengerChange(index, 'firstName', value)}
              />
              <FormField
                label="Last Name"
                type="text"
                value={passenger.lastName}
                onChange={(value) => handlePassengerChange(index, 'lastName', value)}
              />
              <FormField
                label="Phone"
                type="text"
                value={passenger.phone}
                onChange={(value) => handlePassengerChange(index, 'phone', value)}
              />
            </View>
          ))}

          <Text style={styles.sectionHeader}>Billing Contact Info</Text>
          <FormField
            label="Title"
            type="text"
            value={billingContact.title}
            onChange={(value) => handleBillingChange('title', value)}
          />
          <FormField
            label="First Name"
            type="text"
            value={billingContact.firstName}
            onChange={(value) => handleBillingChange('firstName', value)}
          />
          <FormField
            label="Last Name"
            type="text"
            value={billingContact.lastName}
            onChange={(value) => handleBillingChange('lastName', value)}
          />
          <FormField
            label="Phone"
            type="text"
            value={billingContact.phone}
            onChange={(value) => handleBillingChange('phone', value)}
          />
          <FormField
            label="Email"
            type="text"
            value={billingContact.email}
            onChange={(value) => handleBillingChange('email', value)}
          />
          <FormField
            label="Country"
            type="text"
            value={billingContact.country}
            onChange={(value) => handleBillingChange('country', value)}
          />
          <FormField
            label="City"
            type="text"
            value={billingContact.city}
            onChange={(value) => handleBillingChange('city', value)}
          />

          <Button title="Save Changes" onPress={handleSubmit} />
        </View>
      ) : (
        <Text style={styles.errorText}>No booking selected. Please search using the form on the home screen.</Text>
      )}
    </ScrollView>
  );
};

export default BookingChange;
