'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

riot.tag2('rg-alerts', '<div each="{RgAlerts.alerts}" class="alert {type} {isvisible: isvisible}" onclick="{select}"> <a class="close" aria-label="Close" onclick="{parent.dismiss}" if="{dismissable != false}"> <span aria-hidden="true">&times;</span> </a> <rg-raw content="{content}"></rg-raw> </div>', 'rg-alerts,[riot-tag="rg-alerts"] { font-size: 0.9em; position: relative; top: 0; right: 0; left: 0; width: 100%; } rg-alerts .alert,[riot-tag="rg-alerts"] .alert { display: none; position: relative; margin-bottom: 15px; padding: 15px 35px 15px 15px; } rg-alerts .isvisible,[riot-tag="rg-alerts"] .isvisible { display: block; } rg-alerts .close,[riot-tag="rg-alerts"] .close { position: absolute; top: 50%; right: 20px; line-height: 12px; font-size: 1.1em; border: 0; background-color: transparent; color: rgba(0, 0, 0, 0.5); cursor: pointer; outline: none; transform: translate3d(0, -50%, 0); } rg-alerts .danger,[riot-tag="rg-alerts"] .danger { color: #8f1d2e; background-color: #ffced8; } rg-alerts .information,[riot-tag="rg-alerts"] .information { color: #31708f; background-color: #d9edf7; } rg-alerts .success,[riot-tag="rg-alerts"] .success { color: #2d8f40; background-color: #ccf7d4; } rg-alerts .warning,[riot-tag="rg-alerts"] .warning { color: #c06329; background-color: #f7dfd0; }', '', function (opts) {
	var _this2 = this;

	this.on('mount', function () {
		var _this = this;

		this.RgAlerts = opts.alerts || new RgAlerts(opts);
		this.RgAlerts.on('update', function () {
			_this.update();
		});
		this.update();
	});

	this.dismiss = function (e) {
		var alert = e.item;
		_this2.RgAlerts.dismiss(alert);
	};

	this.select = function (e) {
		var alert = e.item;
		_this2.RgAlerts.select(alert);
	};
}, '{ }');

var RgAlerts = (function () {
	function RgAlerts(opts) {
		var _this3 = this;

		_classCallCheck(this, RgAlerts);

		riot.observable(this);
		if (!opts) opts = {};
		this.alerts = [];
		if (!Array.isArray(opts.alerts)) return;
		opts.alerts.forEach(function (alert) {
			_this3.add(alert);
		});
	}

	_createClass(RgAlerts, [{
		key: 'update',
		value: function update() {
			this.trigger('update');
		}
	}, {
		key: 'add',
		value: function add(alert) {
			var _this4 = this;

			alert._id = alert._id || (Math.floor(Math.random() * 60466175) + 1679615).toString(36);
			if (typeof alert.isvisible === 'undefined') alert.isvisible = true;
			if (alert.timeout) {
				alert.startTimer = function () {
					alert.timer = setTimeout(function () {
						_this4.dismiss(alert);
						_this4.update();
					}, alert.timeout);
				};
				alert.startTimer();
			}
			this.alerts.push(alert);
			this.trigger('add', alert);
		}
	}, {
		key: 'dismiss',
		value: function dismiss(alert) {
			alert.isvisible = false;
			clearTimeout(alert.timer);
			this.trigger('dismiss', alert);
		}
	}, {
		key: 'select',
		value: function select(alert) {
			if (alert.onclick) alert.onclick(alert);
			this.trigger('select', alert);
		}
	}]);

	return RgAlerts;
})();