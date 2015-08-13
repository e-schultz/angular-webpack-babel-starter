var webpackConfig = require('./webpack.test');

// Reference: http://karma-runner.github.io/0.12/config/configuration-file.html
module.exports = function karmaConfig(config) {
  config.set({
    frameworks: [
      'mocha',
      'chai',
      'sinon'
    ],
    reporters: [
      'spec',
      'coverage'
    ],
    files: [
      'src/tests.webpack.js'
    ],
    preprocessors: {
      'src/tests.webpack.js': [
        'webpack',
        'sourcemap'
      ]
    },
    browsers: [
      'PhantomJS'
    ],
    singleRun: true,
    coverageReporter: {
      reporters: [{
          type: 'html'
      },
        {
          type: 'json'
      },
        {
          type: 'text-summary'
      }],
      dir: 'build/coverage/'

    },
    webpack: webpackConfig
  });
};

