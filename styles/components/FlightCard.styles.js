// src/styles/components/FlightCard.styles.js
import { StyleSheet } from 'react-native';
import sharedStyles from '../shared/sharedStyles'; // Reuse shared styles
import { FONT_SIZES, COLORS, SPACING, RADIUS, SHADOW } from '../theme/theme';

export default StyleSheet.create({
  ...sharedStyles, // Extend shared styles

  card: {
    ...sharedStyles.card,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  label: {
    ...sharedStyles.label,
    fontSize: FONT_SIZES.medium,
    marginBottom: SPACING.xs,
  },
  price: {
    fontSize: FONT_SIZES.large,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: SPACING.sm,
  },
  selectText: {
    marginTop: SPACING.sm,
    textAlign: 'center',
    color: COLORS.secondary,
    fontWeight: '700',
    fontSize: FONT_SIZES.medium,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.muted,
    ...SHADOW.strong,
  },
  selectedText: {
    color: COLORS.success,
  },
});
