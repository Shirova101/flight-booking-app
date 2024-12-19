// src/styles/pages/CheckInPage.styles.js
import { StyleSheet } from 'react-native';
import sharedStyles from '../../shared/sharedStyles';
import { COLORS, FONT_SIZES, SPACING, RADIUS } from '../../theme/theme';

export default StyleSheet.create({
  ...sharedStyles,
  header: {
    fontSize: FONT_SIZES.xxxLarge,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginVertical: SPACING.lg,
  },
  formContainer: {
    ...sharedStyles.card,
    padding: SPACING.lg,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.medium,
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.large,
    fontWeight: '600',
  },
  errorText: {
    marginTop: SPACING.sm,
    fontSize: FONT_SIZES.small,
    color: COLORS.error,
  },
  inputField: {
    ...sharedStyles.input,
    marginBottom: SPACING.md,
  },
});
