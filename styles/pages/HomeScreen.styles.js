import { StyleSheet } from 'react-native';
import sharedStyles from '../shared/sharedStyles';
import { COLORS, SPACING, FONT_SIZES, RADIUS, SHADOW } from '../theme/theme';

export default StyleSheet.create({
  container: {
    ...sharedStyles.container, // Reuse base container style
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightGrey, // Ensure consistency with theme background
  },
  header: {
    ...sharedStyles.title, // Reuse title style
    fontSize: FONT_SIZES.xxLarge, // Corporate font size
    marginBottom: SPACING.lg,
    color: COLORS.primary, // Corporate color
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.border, // Use theme-defined border color
  },
  tab: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderBottomWidth: 4,
    borderBottomColor: COLORS.white, // Default tab bottom color matches white
  },
  activeTab: {
    borderBottomColor: COLORS.primary, // Highlight active tab with corporate primary color
  },
  tabText: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
    color: COLORS.primary, // Use corporate color for tabs
  },
  formWindow: {
    ...sharedStyles.card, // Reuse shared card styling
    width: '100%',
    maxWidth: 600,
    minHeight: 300,
    padding: SPACING.lg,
    backgroundColor: COLORS.white, // Ensure clean form window UI
    borderRadius: RADIUS.medium, // Use corporate radius
    ...SHADOW.default, // Consistent shadow for depth
  },
});
