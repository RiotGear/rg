'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

riot.tag2('rg-include', '<div> {responseText} </div>', '', '', function (opts) {
	var _this = this;

	this.on('mount', function () {
		_this.RgInclude = opts.include || new RgInclude(opts);
		_this.RgInclude.on('update', function () {
			_this.RgInclude.fetch();
		});
		_this.RgInclude.on('fetch', function (content) {
			if (_this.RgInclude.unsafe) _this.root.innerHTML = content;else _this.responseText = content;
			_this.update();
		});
		_this.RgInclude.fetch();
	});
}, '{ }');

var RgInclude = (function () {
	function RgInclude(opts) {
		_classCallCheck(this, RgInclude);

		riot.observable(this);
		if (!opts) opts = {};
		this._unsafe = opts.unsafe;
		this._url = opts.url;
	}

	_createClass(RgInclude, [{
		key: 'update',
		value: function update() {
			this.trigger('update');
		}
	}, {
		key: 'fetch',
		value: function fetch() {
			var _this2 = this;

			var req = new XMLHttpRequest();
			req.onload = function (resp) {
				_this2.trigger('fetch', req.responseText);
			};
			req.open('get', this.url, true);
			req.send();
		}
	}, {
		key: 'unsafe',
		get: function get() {
			return this._unsafe == 'true' || this._unsafe === true;
		},
		set: function set(unsafe) {
			this._unsafe = unsafe;
		}
	}, {
		key: 'url',
		get: function get() {
			return this._url || '';
		},
		set: function set(url) {
			if (this.url != url) {
				this._url = url;
			}
		}
	}]);

	return RgInclude;
})();