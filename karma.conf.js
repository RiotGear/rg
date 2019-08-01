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
			'dependencies/js/iframify.js',
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
}