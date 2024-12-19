// src/styles/sharedStyles.js
import { StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOW } from '../theme/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.lg,
    backgroundColor: COLORS.lightGrey,
    minHeight: '100vh',
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.medium,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOW.default,
  },
  title: {
    fontSize: FONT_SIZES.xxLarge,
    fontWeight: '700',
    textAlign: 'center',
    color: COLORS.darkGrey,
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
    marginBottom: SPACING.xs,
    color: COLORS.darkGrey,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.small,
    padding: SPACING.sm,
    fontSize: FONT_SIZES.medium,
    marginBottom: SPACING.sm,
  },
  button: {
    marginTop: SPACING.md,
    padding: SPACING.md,
    borderRadius: RADIUS.small,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.white,
    fontWeight: '600',
  },
  errorText: {
    color: COLORS.error,
    fontSize: FONT_SIZES.small,
    marginTop: SPACING.xs,
  },
  errorBorder: {
    borderColor: COLORS.error,
  },
});
