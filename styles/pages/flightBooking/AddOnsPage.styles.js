import { StyleSheet } from 'react-native';
import sharedStyles from '../../shared/sharedStyles';
import { COLORS, FONT_SIZES, SPACING, RADIUS } from '../../theme/theme';

export default StyleSheet.create({
  container: {
    ...sharedStyles.container,
    padding: SPACING.lg,
    backgroundColor: COLORS.lightGrey,
  },
  header: {
    ...sharedStyles.title,
    fontSize: FONT_SIZES.xxLarge,
    marginBottom: SPACING.md,
  },
  addOnItem: {
    flex: 1,
    margin: SPACING.sm,
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: RADIUS.medium,
    alignItems: 'center',
    justifyContent: 'center',
    ...sharedStyles.card,
  },
  selectedAddOnItem: {
    backgroundColor: COLORS.success,
  },
  addOnTitle: {
    fontSize: FONT_SIZES.large,
    marginBottom: SPACING.sm,
    color: COLORS.darkGrey,
  },
  addOnCost: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.secondary,
  },
  addOnStatus: {
    marginTop: SPACING.sm,
    fontSize: FONT_SIZES.medium,
    color: COLORS.primary,
  },
  noAddOnsText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.secondary,
    textAlign: 'center',
    marginTop: SPACING.lg,
  },
});
