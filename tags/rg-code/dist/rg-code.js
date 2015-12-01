'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

riot.tag2('rg-code', '<div class="editor"></div>', 'rg-code .editor,[riot-tag="rg-code"] .editor { position: absolute; top: 0; right: 0; bottom: 0; left: 0; }', '', function (opts) {
	var _this = this;

	var editor = undefined;

	var setupEditor = function setupEditor() {
		editor.setTheme('ace/theme/' + _this.RgCode.theme);
		editor.getSession().setMode('ace/mode/' + _this.RgCode.mode);
		editor.getSession().setTabSize(_this.RgCode.tabsize);
		editor.getSession().setUseSoftTabs(_this.RgCode.softtabs);
		editor.getSession().setUseWrapMode(_this.RgCode.wordwrap);
		editor.setReadOnly(_this.RgCode.readonly);
	};

	this.on('mount', function () {
		editor = ace.edit(_this.root.querySelector('.editor'));
		editor.$blockScrolling = Infinity;

		_this.RgCode = opts.editor || new RgCode(opts);
		_this.RgCode.on('update', function () {
			_this.update();
		});
		_this.on('update', function () {
			setupEditor();
			if (_this.RgCode.code != editor.getValue()) editor.setValue(_this.RgCode.code, 1);
		});
		if (_this.RgCode.url) {

			var req = new XMLHttpRequest();
			req.onload = function (resp) {
				_this.RgCode.code = resp;
				_this.update();
			};
			req.open('get', _this.RgCode.url, true);
			req.send();
		}
		editor.setValue(_this.RgCode.code, 1);
		editor.getSession().on('change', function (e) {
			_this.RgCode.code = editor.getValue();
			_this.RgCode.trigger('onchange', editor.getValue());
		});
		setupEditor();
		_this.update();
	});
});

var RgCode = (function () {
	function RgCode(opts) {
		_classCallCheck(this, RgCode);

		riot.observable(this);
		if (!opts) opts = {};
		this._url = opts.url;
		this._code = opts.code;
		this._theme = opts.theme;
		this._mode = opts.mode;
		this._tabsize = opts.tabsize;
		this._softtabs = opts.softtabs;
		this._wordwrap = opts.wordwrap;
		this._readonly = opts.readonly;
	}

	_createClass(RgCode, [{
		key: 'update',
		value: function update() {
			this.trigger('update');
		}
	}, {
		key: 'url',
		get: function get() {
			return this._url;
		},
		set: function set(url) {
			this._url = url;
		}
	}, {
		key: 'code',
		get: function get() {
			return this._code || '';
		},
		set: function set(code) {
			this._code = code;
			this.trigger('change', code);
		}
	}, {
		key: 'theme',
		get: function get() {
			return this._theme || 'monokai';
		},
		set: function set(theme) {
			this._theme = theme;
		}
	}, {
		key: 'mode',
		get: function get() {
			return this._mode || 'html';
		},
		set: function set(mode) {
			this._mode = mode;
		}
	}, {
		key: 'tabsize',
		get: function get() {
			return this._tabsize || 2;
		},
		set: function set(tabsize) {
			this._tabsize = tabsize;
		}
	}, {
		key: 'softtabs',
		get: function get() {
			return this._softtabs == 'true' || this._softtabs === true;
		},
		set: function set(softtabs) {
			this._softtabs = softtabs;
		}
	}, {
		key: 'wordwrap',
		get: function get() {
			return this._wordwrap == 'true' || this._wordwrap === true;
		},
		set: function set(wordwrap) {
			this._wordwrap = wordwrap;
		}
	}, {
		key: 'readonly',
		get: function get() {
			return this._readonly == 'true' || this._readonly === true;
		},
		set: function set(readonly) {
			this._readonly = readonly;
		}
	}]);

	return RgCode;
})();