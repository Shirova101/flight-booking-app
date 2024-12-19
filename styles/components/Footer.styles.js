// src/components/Footer.styles.js
import { StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, SPACING } from '../theme/theme';
import sharedStyles from '../shared/sharedStyles';

const styles = StyleSheet.create({
  ...sharedStyles,
  footer: {
    ...sharedStyles.card,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  totalCost: {
    fontSize: FONT_SIZES.large,
    fontWeight: '600',
    color: COLORS.darkGrey,
  },
  button: {
    ...sharedStyles.button,
    paddingHorizontal: SPACING.lg,
  },
  buttonText: {
    ...sharedStyles.buttonText,
  },
});

export default styles;
