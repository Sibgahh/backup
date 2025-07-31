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
  success2: "#FFF5F3",
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

  // Design System Colors - New additions from the image
  designSystem: {
    // Text Colors
    text: {
      primary: "#313131",
      secondary: "#7A7A7A",
      tertiary: "#9C9C9C",
      accent: "#DADADA",
    },

    // Grey Scale
    grey: {
      50: "#FFFFFF",
      100: "#FAFAFA",
      200: "#EAEAED",
      300: "#DADAEA",
      400: "#969363",
      500: "#807865",
      600: "#575407",
      700: "#434854",
      800: "#1D2939",
      900: "#101828",
    },

    // Primary Blue Scale
    primaryBlue: {
      50: "#EAEFF7",
      100: "#D0C776",
      200: "#86A2DB",
      300: "#4A68D5",
      400: "#3358BD",
      500: "#0044AD",
      600: "#063580",
      700: "#063878",
      800: "#083349",
      900: "#091649",
    },

    // Secondary Light Blue Scale
    secondaryBlue: {
      50: "#E8F7FC",
      100: "#DEEF4",
      200: "#BDC4EA",
      300: "#59A8E1",
      400: "#369BD8",
      500: "#077ED2",
      600: "#063BF",
      700: "#055968",
      800: "#043570",
      900: "#03358",
    },

    // Error Red Scale
    errorRed: {
      100: "#FFEEE3",
      200: "#FFEBE5",
      300: "#FFD1CB",
      400: "#FF5CA3",
      500: "#EEA49F",
      600: "#FF6B7C",
      700: "#FF624F",
      800: "#D03824",
      900: "#BD210E",
    },

    // Warning Orange/Yellow Scale
    warningOrange: {
      100: "#FFFSE3",
      200: "#FFEBE5",
      300: "#FFD1CB",
      400: "#FF5CA3",
      500: "#EEA49F",
      600: "#FF6B7C",
      700: "#FF624F",
      800: "#D03824",
      900: "#BD210E",
    },

    // Success Green Scale
    successGreen: {
      100: "#FFF5F3",
      200: "#FFE8E5",
      300: "#FFD1CB",
      400: "#F5ACA3",
      500: "#EE9A8F",
      600: "#F98B7C",
      700: "#F9624F",
      800: "#D63824",
      900: "#B0210E",
    },

    // Info Blue Scale
    infoBlue: {
      100: "#FFFSF3",
      200: "#FFEBE5",
      300: "#FFD1CB",
      400: "#FF5CA3",
      500: "#EEA49F",
      600: "#FF6B7C",
      700: "#FF624F",
      800: "#D03824",
      900: "#BD210E",
    },
  },
};

export default Colors;
