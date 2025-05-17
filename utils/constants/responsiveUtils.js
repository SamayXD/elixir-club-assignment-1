import { Dimensions, Platform } from "react-native";

// Get screen dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Define font family constants for easy access
export const FONTS = {
  // Uncomment if you need Italiana
  // ITALIANA: 'Italiana',
  MONTSERRAT: {
    BLACK: "MontserratBlack",
    REGULAR: "MontserratRegular",
    MEDIUM: "MontserratMedium",
    SEMI_BOLD: "MontserratSemiBold",
    LIGHT: "MontserratLight",
  },
};

// Font family references for direct use in styles
export const montserrat = {
  black: FONTS.MONTSERRAT.BLACK,
  regular: FONTS.MONTSERRAT.REGULAR,
  medium: FONTS.MONTSERRAT.MEDIUM,
  semiBold: FONTS.MONTSERRAT.SEMI_BOLD,
  light: FONTS.MONTSERRAT.LIGHT,
};

/**
 * Converts a percentage of screen width to pixel value
 * @param {number} percent - Percentage of screen width (0-100)
 * @return {number} - Calculated width in pixels
 */
export const widthPercentage = (percent) => {
  return (percent / 100) * SCREEN_WIDTH;
};

/**
 * Converts a percentage of screen height to pixel value
 * @param {number} percent - Percentage of screen height (0-100)
 * @return {number} - Calculated height in pixels
 */
export const heightPercentage = (percent) => {
  return (percent / 100) * SCREEN_HEIGHT;
};

/**
 * Returns responsive width based on percentage of screen width
 * @param {number} percent - Percentage of screen width (0-100)
 * @return {number} - Calculated width in pixels
 */
export const width = (percent) => {
  return Math.round(widthPercentage(percent));
};

/**
 * Returns responsive height based on percentage of screen height
 * @param {number} percent - Percentage of screen height (0-100)
 * @return {number} - Calculated height in pixels
 */
export const height = (percent) => {
  return Math.round(heightPercentage(percent));
};

/**
 * Returns font size based on screen dimensions
 * Uses the smaller of width/height percentage to ensure text isn't too large on any dimension
 * @param {number} percent - Percentage relative to screen size
 * @return {number} - Calculated font size in pixels
 */
export const fontSize = (percent) => {
  // Use the smaller percentage of width or height to ensure text fits well
  // Use a smaller base value since fonts generally need to be smaller than layout elements
  const size = Math.min(widthPercentage(percent), heightPercentage(percent));
  return Math.round(size);
};

/**
 * Returns spacing value (margin, padding) based on screen dimensions
 * @param {number} widthPercent - Percentage of screen width
 * @param {number} heightPercent - Optional percentage of screen height (defaults to widthPercent)
 * @return {number} - Calculated spacing in pixels
 */
export const spacing = (widthPercent, heightPercent = null) => {
  // If only one value is provided, use it for both dimensions
  if (heightPercent === null) {
    return Math.round(widthPercentage(widthPercent));
  }
  // If two values are provided, return an object with horizontal and vertical spacing
  return {
    horizontal: Math.round(widthPercentage(widthPercent)),
    vertical: Math.round(heightPercentage(heightPercent)),
  };
};

/**
 * Returns an object with horizontal and vertical spacing
 * Useful for padding and margin that need different values for horizontal and vertical
 * @param {number} horizontalPercent - Percentage of screen width for horizontal spacing
 * @param {number} verticalPercent - Percentage of screen height for vertical spacing
 * @return {object} - Object with horizontal and vertical spacing values
 */
export const spacingXY = (horizontalPercent, verticalPercent) => {
  return {
    horizontal: Math.round(widthPercentage(horizontalPercent)),
    vertical: Math.round(heightPercentage(verticalPercent)),
  };
};

/**
 * Helper to create padding style object with percentage-based values
 * @param {number} top - Top padding percentage of screen height
 * @param {number} right - Right padding percentage of screen width
 * @param {number} bottom - Bottom padding percentage of screen height
 * @param {number} left - Left padding percentage of screen width
 * @return {object} - Padding style object
 */
export const padding = (top, right, bottom, left) => {
  return {
    paddingTop: height(top),
    paddingRight: width(right),
    paddingBottom: height(bottom),
    paddingLeft: width(left),
  };
};

/**
 * Helper to create margin style object with percentage-based values
 * @param {number} top - Top margin percentage of screen height
 * @param {number} right - Right margin percentage of screen width
 * @param {number} bottom - Bottom margin percentage of screen height
 * @param {number} left - Left margin percentage of screen width
 * @return {object} - Margin style object
 */
export const margin = (top, right, bottom, left) => {
  return {
    marginTop: height(top),
    marginRight: width(right),
    marginBottom: height(bottom),
    marginLeft: width(left),
  };
};

/**
 * Helper for creating padding shorthand (similar to CSS padding shorthand)
 * @param {Array} args - Percentage values following CSS shorthand patterns
 * @return {object} - Padding style object
 *
 * Usage patterns:
 * paddings(all)
 * paddings(vertical, horizontal)
 * paddings(top, horizontal, bottom)
 * paddings(top, right, bottom, left)
 */
export const paddings = (...args) => {
  if (args.length === 1) {
    // All sides same value
    return {
      padding: spacing(args[0]),
    };
  } else if (args.length === 2) {
    // Vertical, Horizontal
    return {
      paddingVertical: height(args[0]),
      paddingHorizontal: width(args[1]),
    };
  } else if (args.length === 3) {
    // Top, Horizontal, Bottom
    return {
      paddingTop: height(args[0]),
      paddingHorizontal: width(args[1]),
      paddingBottom: height(args[2]),
    };
  } else if (args.length === 4) {
    // Top, Right, Bottom, Left
    return padding(args[0], args[1], args[2], args[3]);
  }
  return {};
};

/**
 * Helper for creating margin shorthand (similar to CSS margin shorthand)
 * @param {Array} args - Percentage values following CSS shorthand patterns
 * @return {object} - Margin style object
 *
 * Usage patterns:
 * margins(all)
 * margins(vertical, horizontal)
 * margins(top, horizontal, bottom)
 * margins(top, right, bottom, left)
 */
export const margins = (...args) => {
  if (args.length === 1) {
    // All sides same value
    return {
      margin: spacing(args[0]),
    };
  } else if (args.length === 2) {
    // Vertical, Horizontal
    return {
      marginVertical: height(args[0]),
      marginHorizontal: width(args[1]),
    };
  } else if (args.length === 3) {
    // Top, Horizontal, Bottom
    return {
      marginTop: height(args[0]),
      marginHorizontal: width(args[1]),
      marginBottom: height(args[2]),
    };
  } else if (args.length === 4) {
    // Top, Right, Bottom, Left
    return margin(args[0], args[1], args[2], args[3]);
  }
  return {};
};

/**
 * Get current screen dimensions and orientation information
 * @return {object} - Object containing screen dimensions and orientation data
 */
export const getScreenDimensions = () => {
  return {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    isLandscape: SCREEN_WIDTH > SCREEN_HEIGHT,
    isSmallDevice: SCREEN_WIDTH < 375,
    isMediumDevice: SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 768,
    isLargeDevice: SCREEN_WIDTH >= 768,
  };
};

/**
 * Handle screen rotation and dimension changes
 * @param {function} callback - Function to call when dimensions change
 * @return {function} - Cleanup function to remove the event listener
 */
export const listenToScreenDimensionChanges = (callback) => {
  const dimensionsChangeHandler = ({ window }) => {
    const { width, height } = window;
    callback({ width, height });
  };

  Dimensions.addEventListener("change", dimensionsChangeHandler);

  // Return a cleanup function
  return () => {
    // Check if the remove method exists (for older RN versions)
    if (Dimensions.removeEventListener) {
      Dimensions.removeEventListener("change", dimensionsChangeHandler);
    }
  };
};

/**
 * Helper function to create complete font style objects if needed
 * @param {number} sizePercent - Font size as percentage of screen dimension
 * @param {string} fontFamily - Font family name
 * @param {object} extraStyles - Additional text styling properties
 * @return {object} - Text style object with font properties
 */
export const getFontStyle = (sizePercent, fontFamily, extraStyles = {}) => {
  return {
    fontSize: fontSize(sizePercent),
    fontFamily: fontFamily,
    ...extraStyles,
  };
};

/*
Example usage:

import { StyleSheet } from 'react-native';
import { width, height, fontSize, paddings, margins, montserrat } from './utils/responsiveUtils';

const styles = StyleSheet.create({
  container: {
    width: width(90),           // 90% of screen width
    height: height(40),         // 40% of screen height
    ...paddings(2, 3),          // 2% vertical padding, 3% horizontal padding
  },
  title: {
    fontSize: fontSize(5),
    fontFamily: montserrat.semiBold,  // direct reference to font family
    ...margins(2),
  },
  bodyText: {
    fontSize: fontSize(3.5),
    fontFamily: montserrat.regular,   // direct reference to font family
    lineHeight: height(5),
  }
});

// Or in inline styles:
// <Text style={{ fontSize: fontSize(4), fontFamily: montserrat.medium, marginTop: height(2) }}>...</Text>
*/
