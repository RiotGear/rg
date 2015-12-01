'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

riot.tag2('rg-markdown', '<div class="markdown"></div>', '', '', function (opts) {
	var _this = this;

	this.on('mount', function () {
		_this.RgMarkdown = opts.markdown || new RgMarkdown(opts);
		_this.RgMarkdown.on('update', function () {
			_this.RgMarkdown.fetch();
		});
		_this.RgMarkdown.on('fetch', function (md) {
			_this.RgMarkdown.parse(md);
		});
		_this.RgMarkdown.on('parse', function (content) {
			_this.root.innerHTML = content;
			_this.update();
		});
		_this.RgMarkdown.fetch();
	});
});

var RgMarkdown = (function () {
	function RgMarkdown(opts) {
		_classCallCheck(this, RgMarkdown);

		riot.observable(this);
		if (!opts) opts = {};
		if (commonmark) {
			this.reader = new commonmark.Parser();
			this.writer = new commonmark.HtmlRenderer();
		}
		this._url = opts.url;
	}

	_createClass(RgMarkdown, [{
		key: 'update',
		value: function update() {
			this.trigger('update');
		}
	}, {
		key: 'parse',
		value: function parse(md) {
			var parsed = this.reader.parse(md);
			this.trigger('parse', this.writer.render(parsed));
			return this.writer.render(parsed);
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
		key: 'url',
		get: function get() {
			return this._url || '';
		},
		set: function set(url) {
			this._url = url;
		}
	}]);

	return RgMarkdown;
})();