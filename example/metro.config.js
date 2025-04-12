const { getDefaultConfig } = require('@expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '..');

const config = getDefaultConfig(projectRoot);

// Watch both example and react-native-chessboard
config.watchFolders = [projectRoot, monorepoRoot];

// Map react-native-chessboard to its source
const monorepoPackages = {
  'react-native-chessboard': path.resolve(monorepoRoot, 'src'),
};

// Resolve all critical dependencies from example/node_modules
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  ...monorepoPackages,
  'react': path.resolve(projectRoot, 'node_modules', 'react'),
  'react-native': path.resolve(projectRoot, 'node_modules', 'react-native'),
  'react-native-gesture-handler': path.resolve(
    projectRoot,
    'node_modules',
    'react-native-gesture-handler'
  ),
  'react-native-reanimated': path.resolve(
    projectRoot,
    'node_modules',
    'react-native-reanimated'
  ),
  'chess.js': path.resolve(monorepoRoot, 'node_modules', 'chess.js'),
};

// Restrict node_modules lookup to example, with fallback for chess.js
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'), // Only for chess.js
];

// Prevent parent node_modules creeping in
config.resolver.disableHierarchicalLookup = true;

// Asset and source extensions
config.resolver.assetExts = ['png', 'jpg', 'jpeg', 'ttf', 'otf', 'mp3', 'wav'];
config.resolver.sourceExts = [
  ...(config.resolver.sourceExts || []),
  'cjs',
  'tsx',
  'ts',
];

// Transformer for assets and Reanimated
config.transformer = {
  ...config.transformer,
  assetPlugins: ['expo-asset/tools/hashAssetFiles'],
  getTransformOptions: async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  }),
};

config.transformer.sourceMaps = true;

module.exports = config;
