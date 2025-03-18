const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Ensure Metro watches the parent `src` folder
config.watchFolders = [path.resolve(__dirname, '../src')];

// Alias the `src/` folder as a module so you can import using `src/...`
config.resolver.extraNodeModules = {
  'src': path.resolve(__dirname, '../src'),
  'react-native-chessboard': path.resolve(__dirname, '../src'),
};

module.exports = config;
