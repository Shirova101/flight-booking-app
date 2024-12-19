import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Picker, StyleSheet } from 'react-native';
import CustomDatePicker from '../../components/CustomDatePicker';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addPassengerDetail, setFlightSelection, setPassengerInfo, setPrimaryPassenger } from '../../redux/slices/guestSlice';
import { setSearchCriteria } from '../../redux/slices/flightSlice';
import FormField from '../../components/FormField';
import styles from '../../styles/pages/flightBooking/FlightBookingForm.styles'


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
      <FormField
        label="Flight Type"
        type="picker"
        value={flightType}
        onChange={handleFlightTypeChange}
        options={[
          { label: 'One-way', value: 'oneWay' },
          { label: 'Round-trip', value: 'twoWay' },
        ]}
      />
      {/* From Location */}
      {stations && <FormField
        label="From"
        type="stations-picker"
        value={fromLocation}
        onChange={setFromLocation}
        stations={stations}
      />}

      {/* To Location */}
      {stations && <FormField
        label="From"
        type="stations-picker"
        value={toLocation}
        onChange={setToLocation}
        stations={stations}
      />}

      {/* Departure Date */}
      <FormField
        label="Departure Date"
        type="date"
        value={UFdepartureDate}
        onChange={setUFDepartureDate}
      />
      {/* Return Date */}
      {showReturnDate && <FormField
        label="Return Date"
        type="date"
        value={UFreturnDate}
        onChange={setUFReturnDate}
      />}

      {/* Number of Passengers */}
      <FormField
        label="Adults"
        type="number"
        value={adults}
        onChange={(value) =>setAdults(Number(value))}
      />

      <FormField
        label="Children"
        type="number"
        value={children}
        onChange={(value) =>setChildren(Number(value))}
      />

      <FormField
        label="Infants"
        type="number"
        value={infants}
        onChange={(value) =>setInfants(Number(value))}
      />

      {/* Submit Button */}
      <View style={styles.button}>
        <Button title="Book Flight" onPress={handleBookingSubmit} />
      </View>
    </View>
  );
};


export default FlightBookingForm