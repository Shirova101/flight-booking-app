import { StyleSheet } from 'react-native';
import sharedStyles from '../../shared/sharedStyles';
import { COLORS, FONT_SIZES, SPACING, RADIUS } from '../../theme/theme';

export default StyleSheet.create({
  ...sharedStyles, // Spread shared styles to inherit common styles

  // Specific styles for PassengerDetails
  header: {
    fontSize: FONT_SIZES.xxLarge,
    marginVertical: SPACING.lg,
    color: COLORS.darkGrey,
  },

  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },

  passengerForm: {
    marginBottom: SPACING.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.medium,
    ...sharedStyles.card, // Using shared card style for consistent design
  },

  passengerLabel: {
    fontSize: FONT_SIZES.large,
    marginBottom: SPACING.sm,
    color: COLORS.darkGrey,
  },

  primaryButton: {
    marginTop: SPACING.md,
    padding: SPACING.sm,
    borderRadius: RADIUS.small,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.lightGrey,
  },

  primarySelected: {
    backgroundColor: COLORS.success,
  },

  primaryButtonText: {
    textAlign: 'center',
    color: COLORS.primary,
    fontWeight: '600',
  },
});
