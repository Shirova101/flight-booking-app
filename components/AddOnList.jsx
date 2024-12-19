import React from 'react';
import { FlatList, Text } from 'react-native';
import AddOnItem from './AddOnItem'; // Import AddOnItem
import styles from '../styles/pages/flightBooking/AddOnsPage.styles';

const AddOnList = ({ addOns, renderAddOnItem, noAddOnsText }) => (
  <>
    {addOns.length > 0 ? (
      <FlatList
        data={addOns}
        numColumns={2}
        renderItem={renderAddOnItem}
        keyExtractor={(item) => item.key}
      />
    ) : (
      <Text style={styles.noAddOnsText}>{noAddOnsText}</Text>
    )}
  </>
);

export default AddOnList;
