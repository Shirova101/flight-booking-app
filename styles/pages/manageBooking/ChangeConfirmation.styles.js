import { StyleSheet } from 'react-native';
import sharedStyles from '../../shared/sharedStyles'; // Import shared styles
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOW } from '../../theme/theme';

export default StyleSheet.create({
  container: {
    ...sharedStyles.container, // Use shared container style
    padding: SPACING.lg,
    backgroundColor: COLORS.lightGrey,
  },
  title: {
    ...sharedStyles.title, // Use shared title style
    fontSize: FONT_SIZES.xxLarge,
    marginBottom: SPACING.lg,
  },
  section: {
    ...sharedStyles.card, // Use shared card style
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOW.default,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: '700',
    marginBottom: SPACING.sm,
    color: COLORS.darkGrey,
  },
  detailText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.darkGrey,
    marginBottom: SPACING.sm,
  },
  noDataText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.secondary,
  },
  boldText: {
    fontWeight: '700',
    color: COLORS.darkGrey,
  },
  paymentSection: {
    backgroundColor: COLORS.lightGrey,
    borderRadius: RADIUS.medium,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderColor: COLORS.primary,
    borderWidth: 1,
    ...SHADOW.default,
  },
  paymentStatus: {
    fontSize: FONT_SIZES.large,
    color: COLORS.darkGrey,
    marginBottom: SPACING.sm,
  },
  totalCostText: {
    fontSize: FONT_SIZES.xLarge,
    fontWeight: '700',
    color: COLORS.darkGrey,
    textAlign: 'center',
    marginTop: SPACING.md,
  },
  button: {
    ...sharedStyles.button, // Use shared button style
    backgroundColor: COLORS.success,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.medium,
  },
  buttonText: {
    ...sharedStyles.buttonText, // Use shared buttonText style
    fontSize: FONT_SIZES.large,
  },
});

