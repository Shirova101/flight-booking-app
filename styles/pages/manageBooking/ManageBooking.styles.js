import { StyleSheet } from 'react-native';
import sharedStyles from '../../shared/sharedStyles';
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOW } from '../../theme/theme';

export default StyleSheet.create({
  ...sharedStyles,
  container: {
    ...sharedStyles.container,
    padding: SPACING.xl,
  },
  title: {
    ...sharedStyles.title,
    fontSize: FONT_SIZES.xxxLarge,
    marginBottom: SPACING.lg,
  },
  card: {
    ...sharedStyles.card,
    marginBottom: SPACING.xxl,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: '600',
    marginBottom: SPACING.sm,
    color: COLORS.primary,
  },
  subTitle: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '500',
    color: COLORS.secondary,
    marginTop: SPACING.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  detailLabel: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '500',
    color: COLORS.darkGrey,
  },
  detailValue: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
    color: COLORS.primary,
  },
  addOnItem: {
    fontSize: FONT_SIZES.small,
    color: COLORS.muted,
    marginTop: SPACING.xs,
  },
  button: {
    ...sharedStyles.button,
    backgroundColor: COLORS.success,
    marginTop: SPACING.lg,
  },
  buttonDisabled: {
    backgroundColor: COLORS.border,
  },
  buttonText: {
    ...sharedStyles.buttonText,
    fontSize: FONT_SIZES.large,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightGrey,
  },
  loadingText: {
    marginTop: SPACING.sm,
    fontSize: FONT_SIZES.medium,
    color: COLORS.secondary,
  },
  errorText: {
    ...sharedStyles.errorText,
    textAlign: 'center',
    marginTop: SPACING.sm,
  },
});
