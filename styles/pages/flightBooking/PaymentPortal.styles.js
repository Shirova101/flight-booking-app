import { StyleSheet } from 'react-native';
import sharedStyles from '../../shared/sharedStyles'; // Importing shared styles
import { COLORS, FONT_SIZES, SPACING } from '../../theme/theme'; // Importing theme values

export default StyleSheet.create({
  container: {
    ...sharedStyles.container, // Extending the shared container style
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  header: {
    ...sharedStyles.title, // Extending shared title style
    fontSize: FONT_SIZES.xxLarge,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  subheader: {
    fontSize: FONT_SIZES.large,
    marginBottom: SPACING.md,
    color: COLORS.darkGrey,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginTop: SPACING.md,
  },
  successMessage: {
    marginTop: SPACING.md,
    color: COLORS.success,
    fontSize: FONT_SIZES.large,
  },
  errorMessage: {
    marginTop: SPACING.md,
    color: COLORS.error,
    fontSize: FONT_SIZES.large,
  },
  loaderContainer: {
    ...sharedStyles.container, // Reuse container for loader
    justifyContent: 'center',
    alignItems: 'center',
  },
});
