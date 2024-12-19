const COLORS = {
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    error: '#dc3545',
    white: '#ffffff',
    lightGrey: '#f8f9fa',
    darkGrey: '#343a40',
    border: '#ddd',
    // Added this color for better contrast in the payment section
    muted: '#e9ecef', 
  };
  
const FONT_SIZES = {
    small: 14,
    medium: 16,
    large: 18,
    xLarge: 24,
    xxLarge: 28,
    // Added new size for better scalability in large text
    xxxLarge: 32,
  };
  
const SPACING = {
    xs: 5,
    sm: 10,
    md: 15,
    lg: 20,
    xl: 30,
    // Added extra large spacing for wider margins in some sections
    xxl: 40,
  };
  
const RADIUS = {
    small: 5,
    medium: 8,
    large: 10,
    // Added extra radius for large buttons or special rounded corners
    xLarge: 12,
  };
  
const SHADOW = {
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    // Added another shadow for more emphasis on important elements
    strong: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 10,
    },
  };
  
export { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOW };
  