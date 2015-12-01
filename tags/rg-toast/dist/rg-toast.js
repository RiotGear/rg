'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

riot.tag2('rg-toasts', '<div class="toasts {RgToasts.position} {isvisible: RgToasts.isvisible}"> <div each="{RgToasts.toasts}" class="toast {isvisible: isvisible}" onclick="{parent.toastClicked}"> <rg-raw content="{content}"></rg-raw> </div> </div>', 'rg-toasts .toasts,[riot-tag="rg-toasts"] .toasts { display: none; position: fixed; width: 250px; max-height: 100%; overflow-y: auto; background-color: transparent; z-index: 101; } rg-toasts .toasts.isvisible,[riot-tag="rg-toasts"] .toasts.isvisible { display: block; } rg-toasts .toasts.topleft,[riot-tag="rg-toasts"] .toasts.topleft { top: 0; left: 0; } rg-toasts .toasts.topright,[riot-tag="rg-toasts"] .toasts.topright { top: 0; right: 0; } rg-toasts .toasts.bottomleft,[riot-tag="rg-toasts"] .toasts.bottomleft { bottom: 0; left: 0; } rg-toasts .toasts.bottomright,[riot-tag="rg-toasts"] .toasts.bottomright { bottom: 0; right: 0; } rg-toasts .toast,[riot-tag="rg-toasts"] .toast { display: none; padding: 20px; margin: 20px; background-color: #000; color: white; font-size: 0.9em; cursor: pointer; } rg-toasts .toast.isvisible,[riot-tag="rg-toasts"] .toast.isvisible { display: block; }', '', function (opts) {
	var _this = this;

	this.toastClicked = function (e) {
		var toast = e.item;
		_this.RgToasts.select(toast);
	};

	this.on('mount', function () {
		_this.RgToasts = opts.toasts || new RgToasts(opts);
		_this.RgToasts.on('update', function () {
			_this.update();
		});
		_this.update();
	});
}, '{ }');

var RgToasts = (function () {
	function RgToasts(opts) {
		_classCallCheck(this, RgToasts);

		riot.observable(this);
		if (!opts) opts = {};
		this._uid = 1;
		this._toasts = opts.toasts;
		this._position = opts.position;
		this._isvisible = opts.isvisible;
	}

	_createClass(RgToasts, [{
		key: 'update',
		value: function update() {
			this.trigger('update');
		}
	}, {
		key: 'uid',
		value: function uid() {
			return this._uid++;
		}
	}, {
		key: 'add',
		value: function add(toast) {
			this.toasts.push(toast);
			this.trigger('add', toast);
		}
	}, {
		key: 'select',
		value: function select(toast) {
			window.clearTimeout(toast.timer);
			toast.isvisible = false;
			this.trigger('select', toast);
		}
	}, {
		key: 'toasts',
		get: function get() {
			var _this2 = this;

			if (Array.isArray(this._toasts)) {
				this._toasts.forEach(function (toast) {
					if (typeof toast.isvisible == 'undefined') toast.isvisible = true;
					toast.id = toast.id || _this2.uid();
					if (!toast.timer && !toast.sticky) {
						toast.startTimer = function () {
							toast.timer = window.setTimeout(function () {
								toast.isvisible = false;
								_this2.trigger('close', toast);
								_this2.update();
							}, toast.timeout || 6000);
						};
						toast.startTimer();
					}
				});
				this.isvisible = this._toasts.filter(function (toast) {
					return toast.isvisible;
				}).length > 0;
				return this._toasts;
			}
			this._toats = [];
			return this._toasts;
		},
		set: function set(toasts) {
			this._toasts = toasts;
		}
	}, {
		key: 'position',
		get: function get() {
			return this._position || 'topright';
		},
		set: function set(position) {
			this._position = position;
		}
	}, {
		key: 'isvisible',
		get: function get() {
			return this._isvisible == 'true' || this._isvisible === true;
		},
		set: function set(isvisible) {
			this._isvisible = isvisible;
		}
	}]);

	return RgToasts;
})();