module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'riot'],
    files: [
      'node_modules/jquery/dist/jquery.min.js',
      'lib/**/*',
      'components/**/*'
    ],
    preprocessors: {
      'lib/**/*': ['babel'],
      'components/**/*.spec.js': ['babel'],
      'components/**/*.tag': ['riot', 'coverage']
    },
    riotPreprocessor: {
      options: {
        type: 'es6'
      }
    },
    reporters: ['mocha', 'coverage'],
    coverageReporter: {
      reporters: [{
        type: 'html',
        dir: 'coverage/'
      }, {
        type: 'text-summary'
      }],
    },
    browsers: ['PhantomJS'],
    singleRun: true
  });
};
