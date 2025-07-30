const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Add support for path aliases
config.resolver.alias = {
  "@": "./src",
};

module.exports = config;
