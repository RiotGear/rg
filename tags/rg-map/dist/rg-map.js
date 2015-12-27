'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

riot.tag2('rg-map', '<div class="rg-map"></div>', 'rg-map .rg-map,[riot-tag="rg-map"] .rg-map { margin: 0; padding: 0; width: 100%; height: 100%; } rg-map .rg-map img,[riot-tag="rg-map"] .rg-map img { max-width: inherit; }', '', function (opts) {
	var _this = this;

	this.on('mount', function () {
		_this.RgMap = opts.map || new rg.Map(opts);

		rg.gmap.on('initialize', function () {
			_this.RgMap.obj = new google.maps.Map(_this.root.querySelector('.rg-map'), _this.RgMap.options);
		});

		if (!document.getElementById('gmap_script')) {
			var script = document.createElement('script');
			script.setAttribute('id', 'gmap_script');
			script.type = 'text/javascript';
			script.src = 'https://maps.googleapis.com/maps/api/js?callback=rg.gmap.initialize';
			document.body.appendChild(script);
		}
	});
});
;(function () {
	window.rg = window.rg || {};
	var gmap = {
		initialize: function initialize() {
			gmap.trigger('initialize');
		}
	};
	riot.observable(gmap);
	window.rg.gmap = gmap;

	rg.Map = (function () {
		function RgMap(opts) {
			_classCallCheck(this, RgMap);

			riot.observable(this);
			this._options = opts;
		}

		_createClass(RgMap, [{
			key: 'update',
			value: function update() {
				this.trigger('update');
			}
		}, {
			key: 'options',
			get: function get() {
				if (!this._options) {
					this._options = {
						center: {
							lat: 53.806,
							lng: -1.535
						},
						zoom: 7
					};
				}

				return this._options;
			}
		}]);

		return RgMap;
	})();
})();