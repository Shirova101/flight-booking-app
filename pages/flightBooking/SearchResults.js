import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setFlightSelection, setTotalCost } from '../../redux/slices/guestSlice';
import { setSelectedFlight, setSelectedReturnFlight } from '../../redux/slices/flightSlice';
import ProgressHeader from '../../components/ProgressHeader';
import Footer from '../../components/Footer';
import styles from '../../styles/pages/flightBooking/SearchResults.styles'; // Import shared styles
import { COLORS, FONT_SIZES, SPACING } from '../../styles/theme/theme'; // Import theme constants
import FlightCard from '../../components/FlightCard';

const SearchResults = () => {
  const dispatch = useDispatch();
  const guestData = useSelector((state) => state.guest); // Guest booking data
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
        <FlightCard
        flight={item}
        isSelected={isReturn ? selectedReturnFlightId === item.id : selectedFlightId === item.id}
        onSelect={isReturn ? handleSelectReturnFlight : handleSelectOutboundFlight}
        isReturn={isReturn}
        />
      )}
    />
  );

  // Show loading spinner until the flight data is fetched
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={[styles.label, { fontSize: FONT_SIZES.medium }]}>Loading flights...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ProgressHeader currentStep={currentStep} /> {/* Progress header */}
      <Text style={[styles.title, { fontSize: FONT_SIZES.xLarge }]}>Available Flights</Text>
      <Text style={[styles.subHeader, { fontSize: FONT_SIZES.large }]}>Outbound Flights</Text>
      {renderFlightList(flights)} {/* Outbound flights */}
      {guestData.booking.flightType === 'twoWay' && (<Text style={[styles.subHeader, { fontSize: FONT_SIZES.large }]}>Return Flights</Text>)}
      {guestData.booking.flightType === 'twoWay' && renderFlightList(returnFlights, true)} {/* Return flights */}
      <Footer
        totalCost={guestData.payment.totalCost}
        isFlightSelected={!!selectedFlight}
        current_step={currentStep}
      /> {/* Footer with total cost */}
    </View>
  );
};

export default SearchResults;
