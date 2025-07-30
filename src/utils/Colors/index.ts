// Color palette for the application

const Colors = {
  // Primary Colors
  primary: {
    main: "#004AAD",
    light: "#3B6FCA",
    dark: "#003580",
    contrast: "#FFFFFF",
  },
  primary2: "#004AAD",
  secondary2: "#077ED2",

  // Secondary Colors
  secondary: {
    main: "#077ED2",
    light: "#E6EDF7",
    dark: "#0562A3",
    contrast: "#FFFFFF",
  },

  error: "#dc3545",
  success: "#28a745",
  warning: "#ffc107",
  info: "#17a2b8",

  // Neutral Colors
  neutral: {
    white: "#FFFFFF",
    black: "#000000",
    grey100: "#F5F5F5",
    grey200: "#EEEEEE",
    grey300: "#E0E0E0",
    grey400: "#BDBDBD",
    grey500: "#9E9E9E",
    grey600: "#757575",
    grey700: "#616161",
    grey800: "#424242",
    grey900: "#212121",
  },

  // Functional Colors
  status: {
    success: "#4CAF50",
    warning: "#FFC107",
    error: "#F44336",
    info: "#2196F3",
  },

  // Background Colors
  background: {
    default: "#FFFFFF",
    paper: "#F5F5F5",
    card: "#FFFFFF",
  },

  // Text Colors
  text: {
    primary: "#212121",
    secondary: "#757575",
    disabled: "#9E9E9E",
    hint: "#9E9E9E",
  },

  // Border Colors
  border: {
    light: "#E0E0E0",
    main: "#BDBDBD",
    dark: "#9E9E9E",
  },

  // Transparent Colors
  transparent: {
    primary: "rgba(0, 74, 173, 0.1)", // Primary with 10% opacity
    secondary: "rgba(7, 126, 210, 0.1)", // Secondary with 10% opacity
    black: "rgba(0, 0, 0, 0.1)",
    white: "rgba(255, 255, 255, 0.1)",
  },

  // Gradient Colors
  gradient: {
    primaryToSecondary: ["#004AAD", "#077ED2"],
    lightToDark: ["#3B6FCA", "#003580"],
  },
};

export default Colors;
