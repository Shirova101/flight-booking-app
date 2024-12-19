// src/components/FlightCard.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/components/FlightCard.styles'; // Component-specific styles

const FlightCard = ({ 
  flight, 
  isSelected, 
  onSelect, 
  isReturn = false // Indicates whether the card is for a return flight
}) => {
  console.log(`this i the flight card `, flight);
  return (
    <TouchableOpacity 
      style={[
        styles.card, 
        isSelected && styles.selectedCard // Apply selected styles if flight is selected
      ]} 
      onPress={() => onSelect(flight)} // Handle flight selection
    >
      <Text style={styles.label}>Flight Number: {flight.flightNumber}</Text>
      <Text style={styles.label}>Airline: {flight.airlineName}</Text>
      <Text style={styles.label}>From: {flight.fromLocation}</Text>
      <Text style={styles.label}>To: {flight.toLocation}</Text>
      <Text style={styles.label}>Departure: {new Date(flight.departureTime).toLocaleString()}</Text>
      <Text style={styles.label}>Arrival: {new Date(flight.arrivalTime).toLocaleString()}</Text>
      <Text style={styles.label}>Duration: {flight.duration}</Text>
      <Text style={styles.label}>Price: ₹{flight.totalFare}</Text>
      {isReturn && <Text style={styles.label}>Return Flight</Text>}
      <Text style={[styles.selectText, isSelected && styles.selectedText]}>
        {isSelected ? 'Selected' : 'Select'}
      </Text>
    </TouchableOpacity>
  );
};

export default FlightCard;
