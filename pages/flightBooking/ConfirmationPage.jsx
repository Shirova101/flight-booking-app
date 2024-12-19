import React from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/pages/flightBooking/ConfirmationPage.styles';
import FlightCard from '../../components/FlightCard';
import AddOnList from '../../components/AddOnList';

import PassengerDisplay from '../../components/PassengerDisplay';
import PaymentDisplay from '../../components/PaymentDisplay';

const ConfirmationPage = () => {
  const { selectedFlight, selectedReturnFlight } = useSelector((state) => state.flights);
  const { booking, passengerDetails = [], payment } = useSelector((state) => state.guest);
  const navigate = useNavigate();
  
  // Helper to calculate total add-ons cost for outbound and return flights
  const totalAddOnCost = (addOns) => 
    Object.values(addOns)
      .filter((addOn) => addOn?.selected)
      .reduce((sum, addOn) => sum + (addOn?.cost || 0), 0);

  const outboundAddOnCost = totalAddOnCost(selectedFlight?.addOns || {});
  const returnAddOnCost = totalAddOnCost(selectedReturnFlight?.addOns || {});

  const totalCost = payment?.totalCost || ((selectedFlight?.totalFare || 0) + outboundAddOnCost + returnAddOnCost);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Booking Confirmation</Text>

      {/* Flight Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Flight Details</Text>
        <FlightCard 
          flight={selectedFlight} 
          isSelected={true} 
          isReturn={false} 
        />
        {selectedReturnFlight && (
          <FlightCard 
            flight={selectedReturnFlight} 
            isSelected={true} 
            isReturn={true} 
          />
        )}
      </View>

      {/* Passenger Details */}
      <PassengerDisplay passengers={passengerDetails} />

      {/* Add-Ons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Add-Ons</Text>
        
        {/* Outbound Add-Ons */}
        <AddOnList 
          addOns={Object.entries(selectedFlight?.addOns || {})} 
          renderAddOnItem={({ item }) => (
            <Text key={item[0]} style={styles.detailText}>
              {item[0].charAt(0).toUpperCase() + item[0].slice(1)}: ₹{item[1].cost}
            </Text>
          )}
          noAddOnsText="No add-ons selected."
        />

        {/* Return Add-Ons */}
        {selectedReturnFlight && (
          <AddOnList 
            addOns={Object.entries(selectedReturnFlight?.addOns || {})} 
            renderAddOnItem={({ item }) => (
              <Text key={item[0]} style={styles.detailText}>
                {item[0].charAt(0).toUpperCase() + item[0].slice(1)}: ₹{item[1].cost}
              </Text>
            )}
            noAddOnsText="No add-ons selected."
          />
        )}
      </View>

      {/* Payment Details */}
      <PaymentDisplay payment={payment} totalCost={totalCost} />

      {/* Back to Home Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigate('/')}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ConfirmationPage;
