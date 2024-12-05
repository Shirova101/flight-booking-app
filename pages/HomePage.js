
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FlightBookingForm from '../components/FlightBookingForm';
import CheckInForm from '../components/CheckInForm';
import ManageBookingForm from '../components/ManageBookingForm';
// Form components for Flight Booking, Check-In, and Manage Booking


const HomeScreen = () => {
  // State to track which tab is selected
  const [selectedTab, setSelectedTab] = useState('flightBooking');

  // Render the selected form based on the active tab
  const renderForm = () => {
    switch (selectedTab) {
      case 'flightBooking':
        return <FlightBookingForm />;
      case 'checkIn':
        return <CheckInForm />;
      case 'manageBooking':
        return <ManageBookingForm />;
      default:
        return <FlightBookingForm />;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Flight Services</Text>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'flightBooking' && styles.activeTab]}
          onPress={() => setSelectedTab('flightBooking')}
        >
          <Text style={styles.tabText}>Flight Booking</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'checkIn' && styles.activeTab]}
          onPress={() => setSelectedTab('checkIn')}
        >
          <Text style={styles.tabText}>Check-In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'manageBooking' && styles.activeTab]}
          onPress={() => setSelectedTab('manageBooking')}
        >
          <Text style={styles.tabText}>Manage Booking</Text>
        </TouchableOpacity>
      </View>

      {/* Form Window */}
      <View style={styles.formWindow}>
        {renderForm()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f4f7',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 4,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#007bff',
  },
  tabText: {
    fontSize: 18,
    color: '#007bff',
  },
  formWindow: {
    width: '100%',
    maxWidth: 600,
    minHeight: 300,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  formContent: {
    alignItems: 'center',
  },
  formTitle: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default HomeScreen; 