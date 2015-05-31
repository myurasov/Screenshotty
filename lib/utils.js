/**
 * Utils
 * @copyright 2015 Mikhail Yurasov <me@yurasov.me>
 */

var mkdirp = require('mkdirp');
var fs = require('fs');
var path = require('path');

/**
 * Create dir with all subdirs (sync)
 */
exports.createDirSync = function(dir) {
  dir = path.resolve('.', dir);
  if (!fs.existsSync(dir) || !fs.lstatSync(dir).isDirectory()) {
    mkdirp.sync(dir);
  }
}