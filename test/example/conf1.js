module.exports = {

  outputDir: '_shots_sl',

  remote /* webdriverio.remote() options */: {
    host: 'ondemand.saucelabs.com',
    port: 80,
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY
  },

  // items to checks
  tests: [
    {
      url: 'http://www.agilefusion.com/',
      selectors /* webdriverio selectors */: [
        'body > section.reviews > div > article:nth-child(3) > div.company'
      ]
    }
  ],

  // browser sets
  sets : [
    {
      name: 'Chrome vs. Firefox',

      reference /* passed as desiredCapabilities to webdriverio.remote() */: {
        browserName: 'chrome',
        version: '42',
      },

      compareTo /* passed as desiredCapabilities to webdriverio.remote() */: [
        {
          browserName: 'firefox',
          version    : '36'
        }
      ]
    },
    {
      name: 'IEs',

      reference /* passed as desiredCapabilities to webdriverio.remote() */: {
        browserName: 'internet explorer',
        version: '11',
      },

      compareTo /* passed as desiredCapabilities to webdriverio.remote() */: [
        {
          browserName: 'internet explorer',
          version    : '10'
        },
        {
          browserName: 'internet explorer',
          version    : '9'
        }
      ]
    }
  ]
};