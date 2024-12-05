import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleOutboundAddOn, toggleReturnAddOn } from '../../redux/slices/guestSlice';
import Footer from '../../components/Footer';
import ProgressHeader from '../../components/ProgressHeader';

const AddOnsPage = () => {
  const dispatch = useDispatch();

  // Redux Selectors
  const { outboundFlight, returnFlight, payment, booking } = useSelector((state) => state.guest);
  const { totalCost } = payment;

  // Extract and structure add-ons dynamically
  const formatAddOns = (flight, type = 'outbound') => {
    if (!flight || !flight.addOns) return [];
    return Object.entries(flight.addOns).map(([key, details]) => ({
      key: `${type}_${key}`,
      name: `${key.charAt(0).toUpperCase()}${key.slice(1)}${type === 'return' ? ' (Return)' : ''}`,
      selected: details.selected,
      cost: details.cost,
      type,
    }));
  };

  // Get add-ons for outbound and return flights
  const availableAddOns = [
    ...formatAddOns(outboundFlight, 'outbound'),
    ...(booking.flightType === 'twoWay' ? formatAddOns(returnFlight, 'return') : []),
  ];

  // Handler to toggle add-ons based on type
  const handleToggleAddOn = ({ key, type }) => {
    if (type === 'outbound') {
      dispatch(toggleOutboundAddOn({ addOnKey: key.replace('outbound_', '') }));
    } else if (type === 'return') {
      dispatch(toggleReturnAddOn({ addOnKey: key.replace('return_', '') }));
    }
  };

  // Render single add-on card
  const renderAddOnItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.addOnItem, item.selected && styles.selectedAddOnItem]}
      onPress={() => handleToggleAddOn(item)}
    >
      <Text style={styles.addOnTitle}>{item.name}</Text>
      <Text style={styles.addOnCost}>₹{item.cost}</Text>
      <Text style={styles.addOnStatus}>{item.selected ? 'Selected' : 'Select'}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Progress Header */}
      <ProgressHeader currentStep={2} />

      <Text style={styles.header}>Select Add-ons</Text>

      {/* Add-on List */}
      {availableAddOns.length > 0 ? (
        <FlatList
          data={availableAddOns}
          numColumns={2}
          renderItem={renderAddOnItem}
          keyExtractor={(item) => item.key}
        />
      ) : (
        <Text style={styles.noAddOnsText}>No add-ons available for selected flights.</Text>
      )}

      {/* Footer with Total Cost */}
      <Footer totalCost={totalCost} current_step={2} />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    flex: 1,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  addOnItem: {
    flex: 1,
    margin: 10,
    padding: 20,
    backgroundColor: '#ffffff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedAddOnItem: {
    backgroundColor: '#d0f0c0',
  },
  addOnTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  addOnCost: {
    fontSize: 16,
    color: '#6c757d',
  },
  addOnStatus: {
    marginTop: 10,
    fontSize: 16,
    color: '#007bff',
  },
  noAddOnsText: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default AddOnsPage;
