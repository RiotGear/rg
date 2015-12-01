'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

riot.tag2('rg-placeholdit', '<img riot-src="https://placeholdit.imgix.net/~text?bg={RgPlaceholdit.background}&txtclr={RgPlaceholdit.color}&txt={RgPlaceholdit.text}&txtsize={RgPlaceholdit.textsize}&w={RgPlaceholdit.width}&h={RgPlaceholdit.height}&fm={RgPlaceholdit.format}">', '', '', function (opts) {
	var _this = this;

	this.on('mount', function () {
		_this.RgPlaceholdit = opts.placeholdit || new RgPlaceholdit(opts);
		_this.RgPlaceholdit.on('update', function () {
			_this.update();
		});
		_this.update();
	});
}, '{ }');

var RgPlaceholdit = (function () {
	function RgPlaceholdit(opts) {
		_classCallCheck(this, RgPlaceholdit);

		riot.observable(this);
		if (!opts) opts = {};
		this._width = opts.width;
		this._height = opts.height;
		this._background = opts.background;
		this._color = opts.color;
		this._text = opts.text;
		this._textsize = opts.textsize;
		this._format = opts.format;
	}

	_createClass(RgPlaceholdit, [{
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
		}
	}, {
		key: 'height',
		get: function get() {
			return this._height || 250;
		},
		set: function set(height) {
			this._height = height;
		}
	}, {
		key: 'background',
		get: function get() {
			return this._background || 'f01e52';
		},
		set: function set(background) {
			this._background = background;
		}
	}, {
		key: 'color',
		get: function get() {
			return this._color || 'fff';
		},
		set: function set(color) {
			this._color = color;
		}
	}, {
		key: 'text',
		get: function get() {
			return this._text || this.width + ' x ' + this.height;
		},
		set: function set(text) {
			this._text = text;
		}
	}, {
		key: 'textsize',
		get: function get() {
			return this._textsize || 30;
		},
		set: function set(textsize) {
			this._textsize = textsize;
		}
	}, {
		key: 'format',
		get: function get() {
			return this._format || 'png';
		},
		set: function set(format) {
			this._format = format;
		}
	}]);

	return RgPlaceholdit;
})();