import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Picker, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setContactInfo,addPassengerDetail, updatePassengerDetail, setPrimaryPassenger } from '../../redux/slices/guestSlice';
import ProgressHeader from '../../components/ProgressHeader';
import Footer from '../../components/Footer';
import styles from '../../styles/pages/flightBooking/PassengerDetails.styles'
import FormField from '../../components/FormField';

const PassengerDetails = () => {
  const dispatch = useDispatch();
  const guestData = useSelector((state) => state.guest);
  
  const [contactInfo, setContactInfoLocal] = useState(guestData.contactInfo);
  const passengerForms = useSelector((state) => state.guest.passengerDetails)
  const [primaryPassengerId, setPrimaryPassengerId] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  console.log(passengerForms)


  useEffect(() => {
    const validateForm = () => {
      // Validate contact info
      const isContactInfoValid =
        contactInfo.firstName &&
        contactInfo.lastName &&
        contactInfo.phone &&
        contactInfo.email &&
        contactInfo.country &&
        contactInfo.city;
  
      // Validate passenger forms
      const arePassengersValid = passengerForms.every(
        (passenger) => passenger.firstName && passenger.lastName && passenger.phone
      );
  
      // Check if at least one primary passenger is set
      const hasPrimaryPassenger = passengerForms.some((passenger) => passenger.isPrimary);
  
      // Update form validity
      setIsFormValid(isContactInfoValid && arePassengersValid && hasPrimaryPassenger);
    };
  
    validateForm();
  }, [contactInfo, passengerForms]);

  const handleContactInfoChange = (field, value) => {
    const updatedContactInfo = { ...contactInfo, [field]: value };
    setContactInfoLocal(updatedContactInfo);
    dispatch(setContactInfo(updatedContactInfo));
  };

  const handlePassengerChange = (index, field, value) => {
    const updatedForms = passengerForms.map((passenger, idx) =>
      idx === index ? { ...passenger, [field]: value } : passenger
    );
    dispatch(updatePassengerDetail(updatedForms[index]));
  };

  const handleSetPrimaryPassenger = (index) => {
    setPrimaryPassengerId(index);
    dispatch(setPrimaryPassenger(index));
    const updatedForms = passengerForms.map((passenger) =>
      passenger.id === index ? { ...passenger, isPrimary: true } : { ...passenger, isPrimary: false }
    );  
    dispatch(updatePassengerDetail(updatedForms[index]));
  };

  return (
    <ScrollView style={styles.container}>
    <ProgressHeader currentStep={1} />
    <Text style={styles.header}>Billing Contact Information</Text>
    <View style={styles.formRow}>
      <FormField
        label="Title"
        type="picker"
        value={contactInfo.title}
        onChange={(value) => handleContactInfoChange('title', value)}
        options={[
          { id: 1, label: 'Mr', value: 'Mr' },
          { id: 2, label: 'Miss', value: 'Miss' },
          { id: 3, label: 'Mrs', value: 'Mrs' },
        ]}
      />
      <FormField
        label="First Name"
        type="text"
        value={contactInfo.firstName}
        onChange={(value) => handleContactInfoChange('firstName', value)}
      />
      <FormField
        label="Last Name"
        type="text"
        value={contactInfo.lastName}
        onChange={(value) => handleContactInfoChange('lastName', value)}
      />
    </View>
    <View style={styles.formRow}>
      <FormField
        label="Phone Number"
        type="number"
        value={contactInfo.phone}
        onChange={(value) => handleContactInfoChange('phone', value)}
      />
      <FormField
        label="Email"
        type="text"
        value={contactInfo.email}
        onChange={(value) => handleContactInfoChange('email', value)}
      />
    </View>
    <View style={styles.formRow}>
      <FormField
        label="Country"
        type="text"
        value={contactInfo.country}
        onChange={(value) => handleContactInfoChange('country', value)}
      />
      <FormField
        label="City"
        type="text"
        value={contactInfo.city}
        onChange={(value) => handleContactInfoChange('city', value)}
      />
    </View>

    <Text style={styles.header}>Passenger Information</Text>
    {passengerForms && passengerForms.map((passenger, index) => (
      <View key={passenger.id} style={styles.passengerForm}>
        <Text style={styles.passengerLabel}>Passenger {index + 1}</Text>
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
          label="Phone Number"
          type="number"
          value={passenger.phone}
          onChange={(value) => handlePassengerChange(index, 'phone', value)}
        />
        <TouchableOpacity
          onPress={() => handleSetPrimaryPassenger(passenger.id)}
          style={[
            styles.primaryButton,
            primaryPassengerId === passenger.id && styles.primarySelected,
          ]}
        >
          <Text style={styles.primaryButtonText}>
            {primaryPassengerId === passenger.id ? 'Primary Passenger' : 'Set as Primary'}
          </Text>
        </TouchableOpacity>
      </View>
    ))}

    <Footer totalCost={guestData.payment.totalCost} isFlightSelected={isFormValid} current_step={1} />
  </ScrollView>
  );
};



export default PassengerDetails;