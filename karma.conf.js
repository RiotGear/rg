module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'sinon-chai', 'riot'],
    files: [
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/commonmark/dist/commonmark.min.js',
      'node_modules/moment/min/moment.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.0/ace.js',
      'tags/**/*',
      { pattern: 'demo/inc.html', watched: false, included: false, served: true, nocache: false }
    ],
    preprocessors: {
      '**/*.spec.js': ['babel'],
      'tags/**/*.class.js': ['babel', 'coverage'],
      'tags/**/*.tag': ['riot', 'coverage']
    },
    riotPreprocessor: {
      options: {
        type: 'es6'
      }
    },
    logLevel: config.LOG_ERROR,
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
