import { useSelector, useDispatch } from 'react-redux';
import { toggleOutboundAddOn, toggleReturnAddOn } from '../redux/slices/guestSlice';

const useAddOns = () => {
  const dispatch = useDispatch();
  const { outboundFlight, returnFlight, booking } = useSelector((state) => state.guest);

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

  const availableAddOns = [
    ...formatAddOns(outboundFlight, 'outbound'),
    ...(booking.flightType === 'twoWay' ? formatAddOns(returnFlight, 'return') : []),
  ];

  const handleToggleAddOn = ({ key, type }) => {
    if (type === 'outbound') {
      dispatch(toggleOutboundAddOn({ addOnKey: key.replace('outbound_', '') }));
    } else if (type === 'return') {
      dispatch(toggleReturnAddOn({ addOnKey: key.replace('return_', '') }));
    }
  };

  return { availableAddOns, handleToggleAddOn };
};

export default useAddOns;
