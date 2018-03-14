var path = require('path');

module.exports = {
  appPath: function() {
    switch (process.platform) {
      case 'darwin':
        return path.join(__dirname, '..', '.tmp', 'mac', 'Syght.app', 'Contents', 'MacOS', 'Syght');
      case 'linux':
        return path.join(__dirname, '..', '.tmp', 'linux', 'Syght');
      default:
        throw 'Unsupported platform';
    }
  }
};
