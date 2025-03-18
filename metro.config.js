const path = require('path');

module.exports = {
  resolver: {
    extraNodeModules: {
      src: path.resolve(__dirname, 'src'), // Alias `src/` as a module
    },
  },
  watchFolders: [path.resolve(__dirname, 'src')], // Watch `src/`
};
