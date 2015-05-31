/**
 * Command-line interface for Shotty
 * @copyright 2015 Mikhail Yurasov <me@yurasov.me>
 */

'use strict';

var packageJson = require('../package');
var Shotty = require('./shotty');
var fs = require('fs');
var path = require('path');

// startup options
var options = {
  debug: false,
  version: false
};

// config file
var configFile = undefined;

// read args
process.argv.slice(2).forEach(function (arg) {
  switch (arg.split('=')[0]) {
    case '-d':
    case '--debug':
      options.debug = true;
      break;
    case '-v':
    case '--version':
      options.version = true;
      break;
    default:
      configFile = arg;
      break;
  }
});

// show version
if (options.version) {
  console.log(packageJson.version);
  process.exit(0);
}

// check for the correctness of the args
if (undefined === configFile) {
  console.error('Usage: shooter [--debug|-d] [--version|-v] config_file');
  process.exit(1);
}

// read config

configFile = path.resolve('.', configFile);

if (fs.existsSync(configFile)) {
  var config = require(configFile);
  var shotty = new Shotty(config, options);
  shotty.run();
} else {
  console.error('Config file ' + configFile + ' not found');
  process.exit(1);
}