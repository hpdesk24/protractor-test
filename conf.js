var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

var reporter = new HtmlScreenshotReporter({
  dest: './screenshots',
  filename: 'my-report.html'
});

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    suites: {
      filter: 'specs/filter_spec.js',
      mock: 'specs/mockmodule_spec.js'
    },
    directConnect: true,
    capabilities: {
      browserName: 'chrome',
    
      chromeOptions: {
         //args: [ "--headless", "--disable-gpu" ]
       }
    },

    SELENIUM_PROMISE_MANAGER: false,

  // Setup the report before any tests start
  beforeLaunch: function() {
    return new Promise(function(resolve){
      reporter.beforeLaunch(resolve);
    });
  },

  // Assign the test reporter to each running instance
  onPrepare: function() {
    jasmine.getEnv().addReporter(reporter);
  },

  // Close the report after all tests finish
  afterLaunch: function(exitCode) {
    return new Promise(function(resolve){
      reporter.afterLaunch(resolve.bind(this, exitCode));
    });
  }
};