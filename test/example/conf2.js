module.exports = {

  outputDir: '_shots',

  remote /* webdriverio.remote() options */: {
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
        version: '36',
      },

      compareTo /* passed as desiredCapabilities to webdriverio.remote() */: [
        {
          browserName: 'firefox',
          version    : '36'
        },
        {
          browserName: 'chrome',
          version    : '42'
        }
      ]

    }
  ]
};