import { StyleSheet } from 'react-native';
import sharedStyles from '../../shared/sharedStyles'; // Import shared styles
import { COLORS, FONT_SIZES, SPACING, RADIUS } from '../../theme/theme';

export default StyleSheet.create({
  container: {
    ...sharedStyles.container,
    padding: SPACING.lg,
  },
  header: {
    fontSize: FONT_SIZES.xLarge,
    fontWeight: '700',
    marginBottom: SPACING.md,
    color: COLORS.darkGrey,
  },
  totalCost: {
    fontSize: FONT_SIZES.large,
    marginBottom: SPACING.md,
    fontWeight: '500',
    color: COLORS.darkGrey,
  },
  subheader: {
    fontSize: FONT_SIZES.large,
    marginBottom: SPACING.md,
    color: COLORS.secondary,
  },
  paymentOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  paymentButton: {
    width: '45%',
    backgroundColor: COLORS.lightGrey,
    padding: SPACING.md,
    borderRadius: RADIUS.small,
    alignItems: 'center',
    marginBottom: SPACING.sm,
    ...sharedStyles.card, // Adding shared card style to give it consistency
  },
  payNowButton: {
    ...sharedStyles.button,
    backgroundColor: COLORS.primary,
    marginTop: SPACING.lg,
  },
  payNowButtonText: {
    ...sharedStyles.buttonText,
    fontSize: FONT_SIZES.xLarge,
  },
  content: {
    flex: 1,
    paddingTop: SPACING.md,
  },
});
