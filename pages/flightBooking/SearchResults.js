import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setFlightSelection, setTotalCost } from '../../redux/slices/guestSlice';
import { setSelectedFlight, setSelectedReturnFlight } from '../../redux/slices/flightSlice';
import ProgressHeader from '../../components/ProgressHeader';
import Footer from '../../components/Footer';

const SearchResults = () => {
  const dispatch = useDispatch();
  const guestData = useSelector((state) => state.guest); // Guest booking data
  console.log(guestData.passengerDetails);
  const flights = useSelector((state) => state.flights.flights); // Outbound flights
  const returnFlights = useSelector((state) => state.flights.returnFlights); // Return flights
  const loading = useSelector((state) => state.flights.loading); // Loading state for flights
  const selectedFlight = useSelector((state) => state.flights.selectedFlight); // Selected outbound flight
  const selectedReturnFlight = useSelector((state) => state.flights.selectedReturnFlight); // Selected return flight

  const [selectedFlightId, setSelectedFlightId] = useState(null); // Local outbound flight selection
  const [selectedReturnFlightId, setSelectedReturnFlightId] = useState(null); // Local return flight selection
  const currentStep = 0;

  // Handle updating the local state for flight selection
  useEffect(() => {
    if (selectedFlight) {
      setSelectedFlightId(selectedFlight.id); // Update outbound flight selection
    }
    if (selectedReturnFlight) {
      setSelectedReturnFlightId(selectedReturnFlight.id); // Update return flight selection
    }
  }, [selectedFlight, selectedReturnFlight]);

  // Handle outbound flight selection
  const handleSelectOutboundFlight = (flight) => {
    const isSameFlightSelected = selectedFlightId === flight.id;

    dispatch(setSelectedFlight(isSameFlightSelected ? null : flight)); // Set outbound flight
    dispatch(setTotalCost(isSameFlightSelected ? guestData.payment.totalCost - flight.totalFare : guestData.payment.totalCost + flight.totalFare)); // Adjust total cost
    setSelectedFlightId(isSameFlightSelected ? null : flight.id); // Update local state for outbound flight
  };

  // Handle return flight selection
  const handleSelectReturnFlight = (flight) => {
    const isSameFlightSelected = selectedReturnFlightId === flight.id;

    dispatch(setSelectedReturnFlight(isSameFlightSelected ? null : flight)); // Set return flight
    dispatch(setTotalCost(isSameFlightSelected ? guestData.payment.totalCost - flight.totalFare : guestData.payment.totalCost + flight.totalFare)); // Adjust total cost
    setSelectedReturnFlightId(isSameFlightSelected ? null : flight.id); // Update local state for return flight
  };

  // Render flight list
  const renderFlightList = (data, isReturn = false) => (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[
            styles.flightItem,
            (isReturn ? selectedReturnFlightId : selectedFlightId) === item.id && styles.selectedFlightItem,
          ]}
          onPress={() => isReturn ? handleSelectReturnFlight(item) : handleSelectOutboundFlight(item)}
        >
          <Text>Flight Number: {item.flightNumber}</Text>
          <Text>From: {item.fromLocation}</Text>
          <Text>To: {item.toLocation}</Text>
          <Text>Departure Date: {item.departureTime}</Text>
          {item.returnTime && <Text>Return Date: {item.returnTime}</Text>}
          <Text>Price: ₹{item.totalFare}</Text>
          <Text style={styles.selectText}>
            {(isReturn ? selectedReturnFlightId : selectedFlightId) === item.id
              ? 'Selected'
              : 'Select'}
          </Text>
        </TouchableOpacity>
      )}
    />
  );

  // Show loading spinner until the flight data is fetched
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading flights...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ProgressHeader currentStep={currentStep} /> {/* Progress header */}
      <Text style={styles.header}>Available Flights</Text>
      <Text style={styles.subHeader}>Outbound Flights</Text>
      {renderFlightList(flights)} {/* Outbound flights */}
      <Text style={styles.subHeader}>Return Flights</Text>
      {renderFlightList(returnFlights, true)} {/* Return flights */}
      <Footer
        totalCost={guestData.payment.totalCost}
        isFlightSelected={!!selectedFlight}
        current_step={currentStep}
      /> {/* Footer with total cost */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  flightItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 15,
  },
  selectedFlightItem: {
    backgroundColor: '#d0f0c0',
  },
  selectText: {
    marginTop: 10,
    fontSize: 16,
    color: '#007bff',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchResults;
