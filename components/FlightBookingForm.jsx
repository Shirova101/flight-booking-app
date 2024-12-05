import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Picker, StyleSheet } from 'react-native';
import CustomDatePicker from './CustomDatePicker';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addPassengerDetail, setFlightSelection, setPassengerInfo, setPrimaryPassenger } from '../redux/slices/guestSlice';
import { setSearchCriteria } from '../redux/slices/flightSlice';

const FlightBookingForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State hook
  const [flightType, setFlightType] = useState('oneWay');
  const [UFdepartureDate, setUFDepartureDate] = useState(new Date());
  const [UFreturnDate, setUFReturnDate] = useState(new Date());
  const [showReturnDate, setShowReturnDate] = useState(false);
  const [fromLocation, setFromLocation] = useState('Kolkata');
  const [toLocation, setToLocation] = useState('Hyderabad');
  const [stations, setStations] = useState([]);  // State for stations
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  // Simulated list of stations (could be fetched from backend in the future)
  useEffect(() => {
    // Simulating a backend API call to fetch stations
    const fetchedStations = [
      { id: 'DEL', name: 'Delhi' },
      { id: 'BOM', name: 'Mumbai' },
      { id: 'BLR', name: 'Bangalore' },
      { id: 'HYD', name: 'Hyderabad' },
      { id: 'CCU', name: 'Kolkata' },
      { id: 'MAA', name: 'Chennai' },
      { id: 'PNQ', name: 'Pune' },
      { id: 'AMD', name: 'Ahmedabad' },
      { id: 'COK', name: 'Cochin' },
      { id: 'GOI', name: 'Goa' },
    ];
    
    setStations(fetchedStations);  // Setting stations after "fetching"
  }, []);

  // Handling flight type change
  const handleFlightTypeChange = (value) => {
    setFlightType(value);
    setShowReturnDate(value === 'twoWay');
  };

  // Function to format date
  function formatDate(date) {
    console.log(date)
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  // Handle booking form submit
  const handleBookingSubmit = () => {
    const departureDate = formatDate(UFdepartureDate);
    const returnDate = showReturnDate ? formatDate(UFreturnDate) : null;
  
    // Encapsulate flight selection details in an object
    const flightDetails = {
      flightType,
      fromLocation,
      toLocation,
      departureDate,
      returnDate: showReturnDate ? returnDate : null,
    };
  
    // Encapsulate passenger details in an object
    const passengers = {
      adults,
      children,
      infants,
    };
  
    // Encapsulate search criteria in an object
    const searchCriteria = {
      fromLocation,
      toLocation,
      departureDate,
      returnDate: showReturnDate ? returnDate : null,
    };
    
    const totalPassengers = adults + children + infants;
  
    // Generate a new passenger list
    const initialForms = Array.from({ length: totalPassengers }, (_, i) => ({
      id: i, // Unique ID for each passenger
      firstName: '',
      lastName: '',
      phone: '',
      isPrimary: i === 0, // Mark the first passenger as primary
    }));
  
    console.log(initialForms)
    console.log(`is it an array`,Array.isArray(initialForms)); 
    dispatch(addPassengerDetail(initialForms));
    
    setPrimaryPassenger(0);
  
    // Dispatch all the details
    dispatch(setFlightSelection(flightDetails));
    dispatch(setPassengerInfo(passengers));
  
    dispatch(setSearchCriteria(searchCriteria));
    console.log(searchCriteria)
    
  
    // Navigate to search results page
    navigate('/search-results');
  };
  

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Flight Booking</Text>

      {/* Flight Type */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Flight Type:</Text>
        <Picker
          selectedValue={flightType}
          style={styles.picker}
          onValueChange={handleFlightTypeChange}
        >
          <Picker.Item label="One-way" value="oneWay" />
          <Picker.Item label="Round-trip" value="twoWay" />
        </Picker>
      </View>

      {/* From Location */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>From:</Text>
        <Picker
          selectedValue={fromLocation}
          style={styles.picker}
          onValueChange={setFromLocation}
        >
          <Picker.Item label="Select departure station" value="" />
          {stations.map((station) => (
            <Picker.Item key={station.id} label={`${station.name} (${station.id})`} value={station.name} />
          ))}
        </Picker>
      </View>

      {/* To Location */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>To:</Text>
        <Picker
          selectedValue={toLocation}
          style={styles.picker}
          onValueChange={setToLocation}
        >
          <Picker.Item label="Select destination station" value="" />
          {stations.map((station) => (
            <Picker.Item key={station.id} label={`${station.name} (${station.id})`}  value={station.name} />
          ))}
        </Picker> 
      </View>

      {/* Departure Date */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Departure Date:</Text>
        <CustomDatePicker date={UFdepartureDate} onDateChange={setUFDepartureDate} />
      </View>

      {/* Return Date */}
      {showReturnDate && (
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Return Date:</Text>
          <CustomDatePicker date={UFreturnDate} onDateChange={setUFReturnDate} />
        </View>
      )}

      {/* Number of Passengers */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Adults:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(adults)}
          onChangeText={(value) => setAdults(Number(value))}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Children:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(children)}
          onChangeText={(value) => setChildren(Number(value))}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Infants:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(infants)}
          onChangeText={(value) => setInfants(Number(value))}
        />
      </View>

      {/* Submit Button */}
      <View style={styles.buttonWrapper}>
        <Button title="Book Flight" onPress={handleBookingSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  formTitle: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  buttonWrapper: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default FlightBookingForm