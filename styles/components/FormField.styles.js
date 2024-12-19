// src/styles/formFieldStyles.js
import { StyleSheet } from 'react-native';
import sharedStyles from '../shared/sharedStyles';
import { COLORS, SPACING, FONT_SIZES, RADIUS } from '../theme/theme';

// Extending sharedStyles for FormField
export default StyleSheet.create({
  formFieldContainer: {
    ...sharedStyles.container,
    padding: SPACING.sm,
    minHeight: 'auto', // Adjusting height for specific use case
  },
  input: {
    ...sharedStyles.input,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.small,
    padding: SPACING.sm,
    fontSize: FONT_SIZES.medium,
    marginBottom: SPACING.sm,
  },
  label: {
    ...sharedStyles.label,
    fontWeight: '600', // Ensure the font weight is consistent
    marginBottom: SPACING.sm,
    color: COLORS.darkGrey,
  },
  errorText: {
    ...sharedStyles.errorText,
    color: COLORS.error,
    fontSize: FONT_SIZES.small,
    marginTop: SPACING.xs,
  },
  errorBorder: {
    borderColor: COLORS.error,
  },
  picker: {
    ...sharedStyles.input,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.small,
    padding: SPACING.sm,
    fontSize: FONT_SIZES.medium,
    marginBottom: SPACING.sm,
  },
  datePickerContainer: {
    marginBottom: SPACING.sm,
  },
});
