import { StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOW } from '../../theme/theme';
import sharedStyles from '../../shared/sharedStyles';

export default StyleSheet.create({
  ...sharedStyles, // Extends shared styles

  // Specific overrides for SearchResults
  flightItem: {
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.medium,
    marginBottom: SPACING.md,
    backgroundColor: COLORS.white,
    ...SHADOW.default,
  },
  selectedFlightItem: {
    backgroundColor: COLORS.lightGrey,
  },
  selectText: {
    marginTop: SPACING.sm,
    fontSize: FONT_SIZES.medium,
    color: COLORS.lightGrey,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightGrey,
    padding: SPACING.lg,
  },
  subHeader: {
    fontSize: FONT_SIZES.large,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
    fontWeight: 'bold',
    color: COLORS.darkGrey,
  },
});
