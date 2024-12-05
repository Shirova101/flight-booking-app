import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

const ConfirmationPage = () => {
  const { selectedFlight, selectedReturnFlight } = useSelector((state) => state.flights);
  const { booking, passengerDetails = [], addOns = {}, payment } = useSelector((state) => state.guest);

  // Helper to format currency
  const formatCurrency = (value) => new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(value);

  // Calculate total add-on costs
  const totalAddOnCost = Object.values(addOns)
    .filter((addOn) => addOn?.selected)
    .reduce((sum, addOn) => sum + (addOn?.cost || 0), 0);

  const totalCost = payment?.totalCost || ((selectedFlight?.totalFare || 0) + totalAddOnCost);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Booking Confirmation</Text>

      {/* Flight Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Flight Details</Text>
        <Text style={styles.detailText}>
          PNR: <Text style={styles.boldText}>{booking?.PNR || 'N/A'}</Text>
        </Text>
        <Text style={styles.detailText}>
          Flight Type: {booking?.flightType || 'N/A'}
        </Text>
        <Text style={styles.detailText}>
          From: {selectedFlight?.fromLocation || booking?.fromLocation || 'N/A'}
        </Text>
        <Text style={styles.detailText}>
          To: {selectedFlight?.toLocation || booking?.toLocation || 'N/A'}
        </Text>
        <Text style={styles.detailText}>
          Departure Date: {booking?.departureDate || 'N/A'}
        </Text>
        {booking?.flightType === 'twoway' && (
          <Text style={styles.detailText}>
            Return Date: {booking?.returnDate || 'N/A'}
          </Text>
        )}
      </View>

      {/* Passenger Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Passenger Details</Text>
        {passengerDetails.length > 0 ? (
          passengerDetails.map((passenger, index) => (
            <Text key={index} style={styles.detailText}>
              {index + 1}. {passenger.firstName} {passenger.lastName} ({passenger.phone || 'N/A'})
            </Text>
          ))
        ) : (
          <Text style={styles.noDataText}>No passenger details available.</Text>
        )}
      </View>

      {/* Add-Ons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Add-Ons</Text>
        {Object.entries(addOns).map(([key, addOn]) =>
          addOn?.selected ? (
            <Text key={key} style={styles.detailText}>
              {key.charAt(0).toUpperCase() + key.slice(1)}: {formatCurrency(addOn.cost || 0)}
            </Text>
          ) : null
        )}
      </View>

      {/* Payment Details */}
      <View style={styles.paymentSection}>
        <Text style={styles.sectionTitle}>Payment Summary</Text>
        <Text style={styles.paymentStatus}>
          Status: <Text style={styles.boldText}>{(payment?.status || 'Unknown').toUpperCase()}</Text>
        </Text>
        <Text style={styles.totalCostText}>
          Total Paid: {formatCurrency(totalCost)}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#444',
  },
  detailText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  noDataText: {
    fontSize: 16,
    color: '#aaa',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#333',
  },
  paymentSection: {
    backgroundColor: '#fffbf2',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderColor: '#ffcc80',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  paymentStatus: {
    fontSize: 18,
    color: '#444',
    marginBottom: 10,
  },
  totalCostText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default ConfirmationPage;
