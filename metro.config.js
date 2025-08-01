const { getSentryExpoConfig } = require('@sentry/react-native/metro');
const { withNativeWind } = require('nativewind/metro');

const config = getSentryExpoConfig(__dirname);

// Add CSS to asset extensions to ensure Metro processes .css files
config.resolver.assetExts = [...(config.resolver.assetExts || []), 'css'];

// Optionally, ensure sourceExts includes tsx for TypeScript
config.resolver.sourceExts = [...(config.resolver.sourceExts || []), 'js', 'jsx', 'ts', 'tsx', 'css'];

module.exports = withNativeWind(config, {
  input: './app/globals.css', // Path to your global.css file
  inlineRem: 16, // Optional: Adjust rem unit for NativeWind (default is 16)
});