import { StyleSheet } from 'react-native';
import sharedStyles from '../../shared/sharedStyles';
import { COLORS, FONT_SIZES, SPACING, RADIUS } from '../../theme/theme';

export default StyleSheet.create({
  ...sharedStyles,
  header: {
    fontSize: FONT_SIZES.xxLarge,
    fontWeight: 'bold',
    marginBottom: SPACING.lg,
    color: COLORS.darkGrey,
  },
  sectionHeader: {
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
    marginVertical: SPACING.md,
    color: COLORS.darkGrey,
  },
  passengerCard: {
    marginBottom: SPACING.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderRadius: RADIUS.medium,
    borderColor: COLORS.border,
  },
  subHeader: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
    marginBottom: SPACING.sm,
    color: COLORS.darkGrey,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  errorText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.error,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
});
