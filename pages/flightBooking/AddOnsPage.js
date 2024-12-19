import React from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleOutboundAddOn, toggleReturnAddOn } from '../../redux/slices/guestSlice';
import Footer from '../../components/Footer';
import ProgressHeader from '../../components/ProgressHeader';
import AddOnList from '../../components/AddOnList'; 
import AddOnItem from '../../components/AddOnItem'; 
import styles from '../../styles/pages/flightBooking/AddOnsPage.styles';
import useAddOns from '../../hooks/useAddOns';

const AddOnsPage = () => {
  const {availableAddOns , handleToggleAddOn} = useAddOns();

  // Redux Selectors
  
  const { totalCost } = useSelector((state) => state.guest.payment);


  // Render Add-On Item
  const renderAddOnItem = ({ item }) => (
    <AddOnItem item={item} onPress={handleToggleAddOn} />
  );

  return (
    <View style={styles.container}>
      {/* Progress Header */}
      <ProgressHeader currentStep={2} />

      <Text style={styles.header}>Select Add-ons</Text>

      {/* Add-on List */}
      <AddOnList
        addOns={availableAddOns}
        renderAddOnItem={renderAddOnItem}
        noAddOnsText="No add-ons available for selected flights."
      />

      {/* Footer with Total Cost */}
      <Footer totalCost={totalCost} current_step={2} />
    </View>
  );
};

export default AddOnsPage;
