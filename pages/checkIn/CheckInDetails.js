import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { checkInRequest } from '../../redux/slices/checkInSlice';
import { useNavigate } from 'react-router-dom';

const CheckInDetails = () => {
  const { primaryPassenger, bookingDetails, outboundAddOns, returnAddOns, loading, error } = useSelector(
    (state) => state.checkIn
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleConfirmCheckIn = () => {
    dispatch(checkInRequest({ PNR: bookingDetails.PNR, flightType: bookingDetails.flightType }));
  };

  React.useEffect(() => {
    if (!loading && !error && bookingDetails?.checkInCompleted) {
      navigate('/checkin-confirmation');
    }
  }, [loading, error, bookingDetails, navigate]);

  if (!primaryPassenger || !bookingDetails) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading Check-In Details...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Check-In Summary</Text>

      {/* Passenger Details */}
      <Card>
        <Text style={styles.sectionTitle}>Passenger Details</Text>
        <Detail label="Name" value={`${primaryPassenger.firstName} ${primaryPassenger.lastName}`} />
        <Detail label="Phone" value={primaryPassenger.phone} />
      </Card>

      {/* Outbound Flight Details */}
      <Card>
        <Text style={styles.sectionTitle}>Outbound Flight</Text>
        <FlightDetails details={bookingDetails.flightDetails} />
        <AddOnsSection addOns={outboundAddOns} flightType="Outbound" />
      </Card>

      {/* Return Flight Details (If Available) */}
      {bookingDetails.returnFlightDetails && (
        <Card>
          <Text style={styles.sectionTitle}>Return Flight</Text>
          <FlightDetails details={bookingDetails.returnFlightDetails} />
          <AddOnsSection addOns={returnAddOns} flightType="Return" />
        </Card>
      )}

      {/* Error Message */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Confirm Check-In Button */}
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleConfirmCheckIn}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Confirm Check-In</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

/** Reusable Card Component */
const Card = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

/** Detail Component */
const Detail = ({ label, value }) => {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}:</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
};

/** Flight Details Component */
const FlightDetails = ({ details }) => (
  <>
    <Detail label="Flight Number" value={details.flightNumber} />
    <Detail label="From" value={details.fromLocation} />
    <Detail label="To" value={details.toLocation} />
    <Detail label="Departure" value={new Date(details.departureTime).toLocaleString()} />
    <Detail label="Arrival" value={new Date(details.arrivalTime).toLocaleString()} />
    <Detail label="Class" value={details.class} />
  </>
);

/** Add-Ons Section */
const AddOnsSection = ({ addOns, flightType }) => (
  <>
    <Text style={styles.subTitle}>{flightType} Add-Ons:</Text>
    {Object.entries(addOns).map(([addOn, value]) => (
      <Text key={addOn} style={styles.addOnItem}>
        {addOn.charAt(0).toUpperCase() + addOn.slice(1)}: {value ? 'Yes' : 'No'}
      </Text>
    ))}
  </>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    color: '#343a40',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#007BFF',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
    marginTop: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6c757d',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
  addOnItem: {
    fontSize: 14,
    color: '#495057',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#9E9E9E',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  errorText: {
    color: '#dc3545',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default CheckInDetails;
