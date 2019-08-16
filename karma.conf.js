const UNBUNDLED = {
	frameworks: ['mocha', 'sinon-chai'], // no riot
	files: [
		'node_modules/moment/min/moment.min.js',
		'node_modules/commonmark/dist/commonmark.min.js',
		'node_modules/chart.js/Chart.min.js',
		'node_modules/ace-builds/src-min-noconflict/ace.js',
		'node_modules/jquery/dist/jquery.min.js',
		'node_modules/credit-card-type/dist/js/app.built.min.js',
		'dependencies/js/iframify.js',
		`dependencies/js/riot+compiler-${process.env.RIOT_VERSION}.min.js`,
		'css.js',
		'demo/_charts.js',
		'test-helpers.js',
		'dist/rg.min.js', // use compiled RiotGear
		'tags/**/*.spec.js', // no tags, only tests
		{ pattern: 'demo/inc.html', watched: false, included: false, served: true, nocache: false }
	],
}

module.exports = function (config) {
	config.set({
		basePath: '',
		frameworks: ['mocha', 'sinon-chai', 'riot'],
		files: [
			'node_modules/moment/min/moment.min.js',
			'node_modules/commonmark/dist/commonmark.min.js',
			'node_modules/chart.js/Chart.min.js',
			'node_modules/ace-builds/src-min-noconflict/ace.js',
			'node_modules/jquery/dist/jquery.min.js',
			'node_modules/credit-card-type/dist/js/app.built.min.js',
			'dependencies/js/iframify.js',
			'css.js',
			'demo/_charts.js',
			'test-helpers.js',
			'tags/**/*',
			{ pattern: 'demo/inc.html', watched: false, included: false, served: true, nocache: false }
		],
		preprocessors: {
			'tags/**/*.spec.js': ['babel'],
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
		browsers: ['ChromeHeadless'],
		singleRun: true
	})

  if (process.env.RIOT_VERSION) {
    config.set(UNBUNDLED)
  }
}