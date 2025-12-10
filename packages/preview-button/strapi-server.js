'use strict';

try {
  module.exports = require('./server');
} catch (e) {
  // Fallback to dist if server source is not available
  module.exports = require('./dist/server');
}
