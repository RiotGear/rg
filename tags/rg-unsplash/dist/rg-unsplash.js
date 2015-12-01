'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

riot.tag2('rg-unsplash', '<img riot-src="https://unsplash.it/{greyscale}{RgUnsplash.width}/{RgUnsplash.height}/?{options}">', '', '', function (opts) {
	var _this = this;

	this.on('mount', function () {
		_this.RgUnsplash = opts.unsplash || new RgUnsplash();
		_this.RgUnsplash.on('update', function () {
			_this.update();
		});
		_this.on('update', function () {
			_this.options = '';
			if (_this.RgUnsplash.greyscale) _this.greyscale = 'g/';
			if (_this.RgUnsplash.random) _this.options += 'random&';
			if (_this.RgUnsplash.blur) _this.options += 'blur&';
			if (_this.RgUnsplash.image) _this.options += 'image=' + _this.RgUnsplash.image + '&';
			if (typeof _this.RgUnsplash.gravity !== 'undefined') _this.options += 'gravity=' + _this.RgUnsplash.gravity;
		});
		_this.update();
	});
}, '{ }');

var RgUnsplash = (function () {
	function RgUnsplash(opts) {
		_classCallCheck(this, RgUnsplash);

		riot.observable(this);
		if (!opts) opts = {};
		this._width = opts.width;
		this._height = opts.height;
		this._greyscale = opts.greyscale || opts.grayscale;
		this._random = opts.random;
		this._blur = opts.blur;
		this._image = opts.image;
		this._gravity = opts.gravity;
	}

	_createClass(RgUnsplash, [{
		key: 'update',
		value: function update() {
			this.trigger('update');
		}
	}, {
		key: 'width',
		get: function get() {
			return this._width || 450;
		},
		set: function set(width) {
			this._width = width;
			this.trigger('change');
		}
	}, {
		key: 'height',
		get: function get() {
			return this._height || 250;
		},
		set: function set(height) {
			this._height = height;
			this.trigger('change');
		}
	}, {
		key: 'greyscale',
		get: function get() {
			return this._greyscale == 'true' || this._greyscale === true;
		},
		set: function set(greyscale) {
			this._greyscale = greyscale;
			this.trigger('change');
		}
	}, {
		key: 'grayscale',
		get: function get() {
			return this.greyscale;
		},
		set: function set(grayscale) {
			this.greyscale = grayscale;
		}
	}, {
		key: 'random',
		get: function get() {
			return this._random == 'true' || this._random === true;
		},
		set: function set(random) {
			this._random = random;
			this.trigger('change');
		}
	}, {
		key: 'blur',
		get: function get() {
			return this._blur == 'true' || this._blur === true;
		},
		set: function set(blur) {
			this._blur = blur;
			this.trigger('change');
		}
	}, {
		key: 'image',
		get: function get() {
			return this._image;
		},
		set: function set(image) {
			this._image = image;
			this.trigger('change');
		}
	}, {
		key: 'gravity',
		get: function get() {
			return this._gravity;
		},
		set: function set(gravity) {
			this._gravity = gravity;
			this.trigger('change');
		}
	}]);

	return RgUnsplash;
})();