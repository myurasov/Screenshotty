/**
 * Shotty
 * @copyright 2015 Mikhail Yurasov <me@yurasov.me>
 */

var _ = require('lodash');
var webdriverio = require('webdriverio');
var utils = require('./utils');

module.exports = function Shotty(config, options) {

  var self = this;

  init();

  function init() {
    config = undefined === config ? {} : config;
    options = undefined === options ? {} : options;

    // apply default options
    self.options = _.merge({
      debug: false
    }, options);

    // apply default config
    self.config = _.merge({
      remote: {
        logLevel: 'verbose'
      },
      outputDir: '.'
    }, config);
  }

  function test(testConfig, setConfig, outputDir) {

    var remoteOptions;
    var client;

    // iterate through selectors

    for (var s = 0; s < testConfig.selectors.length; s++) {

      var selector = testConfig.selectors[s];

      // take reference shot

      remoteOptions = _.merge(self.config.remote, {
        desiredCapabilities: setConfig.reference
      });

      client = webdriverio.remote(remoteOptions).init();

      client.url(testConfig.url)
        .moveToObject(selector)
        .saveScreenshot(outputDir + '/ref.png')
        .end();

      // take comparisons

      // iterate through compareTo browsers
      for (var c = 0; c < setConfig.compareTo.length; c++) {

        var compareToCapabilities = setConfig.compareTo[c];

        remoteOptions = _.merge(self.config.remote, {
          desiredCapabilities: compareToCapabilities
        });

        client = webdriverio.remote(remoteOptions).init();

        client.url(testConfig.url)
          .moveToObject(selector)
          .saveScreenshot(outputDir + '/cmp-' + c + '.png')
          .end();
      }
    }

  }

  self.run = function () {
    // iterate throgh the platforms
    for (var s = 0; s < self.config.sets.length; s++) {

      // iterate through the tests
      for (var t = 0; t < self.config.tests.length; t++) {

        // create output directory
        var outputDir = self.config.outputDir + '/set-' + s + '/test-' + t;
        utils.createDirSync(outputDir);

        test(
          self.config.tests[t],
          self.config.sets[s],
          outputDir
        );
      }
    }
  }
};