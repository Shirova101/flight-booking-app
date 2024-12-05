// ProgressHeader.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const steps = ['Flight Booking', 'Passenger Details', 'Add-ons', 'Payment'];

const ProgressHeader = ({ currentStep }) => {
  return (
    <View style={styles.headerContainer}>
      {steps.map((step, index) => (
        <Text
          key={step}
          style={[
            styles.stepText,
            currentStep === index && styles.activeStepText
          ]}
        >
          {step}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#f5f5f5',
  },
  stepText: {
    color: '#888',
    fontSize: 16,
  },
  activeStepText: {
    color: '#3498db', // Color to highlight the current step
    fontWeight: 'bold',
  },
});

export default ProgressHeader;
