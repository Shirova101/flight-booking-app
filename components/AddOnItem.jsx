import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from '../styles/pages/flightBooking/AddOnsPage.styles';

const AddOnItem = ({ item, onPress }) => (
  <TouchableOpacity
    style={[styles.addOnItem, item.selected && styles.selectedAddOnItem]}
    onPress={() => onPress(item)}
  >
    <Text style={styles.addOnTitle}>{item.name}</Text>
    <Text style={styles.addOnCost}>₹{item.cost}</Text>
    <Text style={styles.addOnStatus}>{item.selected ? 'Selected' : 'Select'}</Text>
  </TouchableOpacity>
);

export default AddOnItem;
