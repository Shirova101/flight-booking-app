// src/components/ProgressHeader.styles.js
import { StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, SPACING } from '../theme/theme';
import sharedStyles from '../shared/sharedStyles';

const styles = StyleSheet.create({
  ...sharedStyles,
  headerContainer: {
    ...sharedStyles.container,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.lightGrey,
  },
  stepText: {
    color: COLORS.darkGrey,
    fontSize: FONT_SIZES.medium,
    fontWeight: '500',
  },
  activeStepText: {
    color: COLORS.primary, // Highlight the current step
    fontWeight: 'bold',
  },
});

export default styles;
