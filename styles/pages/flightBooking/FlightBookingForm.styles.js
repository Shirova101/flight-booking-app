import { StyleSheet } from 'react-native';
import sharedStyles from '../../shared/sharedStyles'; // Importing shared styles
import { COLORS, FONT_SIZES, SPACING, RADIUS } from '../../theme/theme'; // Importing theme

export default StyleSheet.create({
  ...sharedStyles, // Spread the shared styles to reuse common styles
    
  formContainer: {
    ...sharedStyles.container,
    padding: SPACING.lg,
    backgroundColor: COLORS.white, // White background for the form container
    borderRadius: RADIUS.medium, // Border radius from theme
    minHeight: 'auto',
  },

  formTitle: {
    fontSize: FONT_SIZES.xLarge,
    fontWeight: '700',
    textAlign: 'center',
    color: COLORS.darkGrey, // Using darkGrey for form title color
    marginBottom: SPACING.md,
  },

  inputGroup: {
    marginBottom: SPACING.md,
  },

  label: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
    marginBottom: SPACING.xs,
    color: COLORS.darkGrey, // Reusing darkGrey color for label text
  },

  input: {
    height: 40,
    borderColor: COLORS.border,
    borderWidth: 1,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADIUS.small,
    fontSize: FONT_SIZES.medium,
    marginBottom: SPACING.sm,
  },

  picker: {
    height: 50,
    width: '100%',
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: RADIUS.small,
    paddingHorizontal: SPACING.sm,
  },

  button: {
    marginTop: SPACING.md,
    padding: SPACING.md,
    borderRadius: RADIUS.small,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },

  buttonText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.white,
    fontWeight: '600',
  },
});
