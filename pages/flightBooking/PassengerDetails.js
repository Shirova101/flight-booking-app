import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Picker, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setContactInfo,addPassengerDetail, updatePassengerDetail, setPrimaryPassenger } from '../../redux/slices/guestSlice';
import ProgressHeader from '../../components/ProgressHeader';
import Footer from '../../components/Footer';

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
        <View style={styles.formGroup}>
          <Text>Title</Text>
          <Picker
            selectedValue={contactInfo.title}
            onValueChange={(value) => handleContactInfoChange('title', value)}
            style={styles.input}
          >
            <Picker.Item label="Mr" value="Mr" />
            <Picker.Item label="Miss" value="Miss" />
            <Picker.Item label="Mrs" value="Mrs" />
          </Picker>
        </View>
        <View style={styles.formGroup}>
          <Text>First Name</Text>
          <TextInput
            value={contactInfo.firstName}
            onChangeText={(value) => handleContactInfoChange('firstName', value)}
            style={styles.input}
          />
        </View>
        <View style={styles.formGroup}>
          <Text>Last Name</Text>
          <TextInput
            value={contactInfo.lastName}
            onChangeText={(value) => handleContactInfoChange('lastName', value)}
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.formRow}>
        <View style={styles.formGroup}>
          <Text>Contact Number</Text>
          <TextInput
            value={contactInfo.phone}
            onChangeText={(value) => handleContactInfoChange('phone', value)}
            style={styles.input}
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.formGroup}>
          <Text>Email</Text>
          <TextInput
            value={contactInfo.email}
            onChangeText={(value) => handleContactInfoChange('email', value)}
            style={styles.input}
            keyboardType="email-address"
          />
        </View>
      </View>
      <View style={styles.formRow}>
        <View style={styles.formGroup}>
          <Text>Country</Text>
          <TextInput
            value={contactInfo.country}
            onChangeText={(value) => handleContactInfoChange('country', value)}
            style={styles.input}
          />
        </View>
        <View style={styles.formGroup}>
          <Text>City</Text>
          <TextInput
            value={contactInfo.city}
            onChangeText={(value) => handleContactInfoChange('city', value)}
            style={styles.input}
          />
        </View>
      </View>

      <Text style={styles.header}>Passenger Information</Text>
      {passengerForms && passengerForms.map((passenger, index) => (
        <View key={passenger.id} style={styles.passengerForm}>
          <Text style={styles.passengerLabel}>Passenger {index + 1}</Text>
          <View style={styles.formRow}>
            <View style={styles.formGroup}>
              <Text>First Name</Text>
              <TextInput
                value={passenger.firstName}
                onChangeText={(value) => handlePassengerChange(index, 'firstName', value)}
                style={styles.input}
              />
            </View>
            <View style={styles.formGroup}>
              <Text>Last Name</Text>
              <TextInput
                value={passenger.lastName}
                onChangeText={(value) => handlePassengerChange(index, 'lastName', value)}
                style={styles.input}
              />
            </View>
          </View>
          <View style={styles.formRow}>
            <View style={styles.formGroup}>
              <Text>Phone Number</Text>
              <TextInput
                value={passenger.phone}
                onChangeText={(value) => handlePassengerChange(index, 'phone', value)}
                style={styles.input}
                keyboardType="phone-pad"
              />
            </View>
          </View>
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

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginVertical: 20,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  formGroup: {
    flex: 1,
    marginHorizontal: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  passengerForm: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  passengerLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
  primaryButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007bff',
    backgroundColor: '#e0e0e0',
  },
  primarySelected: {
    backgroundColor: '#d0f0c0',
  },
  primaryButtonText: {
    textAlign: 'center',
    color: '#007bff',
  },
});

export default PassengerDetails;