'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

riot.tag2('rg-tabs', '<div class="headers"> <div each="{RgTabs.tabs}" class="header {active: active, disabled: disabled}" onclick="{parent.open}"> <div class="heading" if="{heading}"> <rg-raw content="{heading}"></rg-raw> </div> </div> </div> <div each="{RgTabs.tabs}" class="tab {active: active}"> <div if="{content}"> {content} </div> <div if="{include}"> <rg-include include="{include}"></rg-include> </div> </div>', 'rg-tabs .headers,[riot-tag="rg-tabs"] .headers { display: -webkit-flex; display: -ms-flexbox; display: flex; } rg-tabs .header,[riot-tag="rg-tabs"] .header { -webkit-flex: 1; -ms-flex: 1; flex: 1; box-sizing: border-box; text-align: center; cursor: pointer; box-shadow: 0 -1px 0 0 #000 inset; } rg-tabs .heading,[riot-tag="rg-tabs"] .heading { padding: 10px; margin: 0; } rg-tabs .header.active,[riot-tag="rg-tabs"] .header.active { background-color: #000; } rg-tabs .header.active .heading,[riot-tag="rg-tabs"] .header.active .heading { color: white; } rg-tabs .header.disabled .heading,[riot-tag="rg-tabs"] .header.disabled .heading { color: #888; } rg-tabs .tab,[riot-tag="rg-tabs"] .tab { display: none; padding: 10px; } rg-tabs .tab.active,[riot-tag="rg-tabs"] .tab.active { display: block; }', '', function (opts) {
	var _this = this;

	this.on('mount', function () {
		_this.RgTabs = opts.tabs || new RgTabs(opts);
		_this.RgTabs.on('update', function () {
			_this.update();
		});
		_this.update();
	});

	this.open = function (e) {
		_this.RgTabs.open(e.item);
	};
}, '{ }');

var RgTabs = (function () {
	function RgTabs(opts) {
		_classCallCheck(this, RgTabs);

		riot.observable(this);
		if (!opts) opts = {};
		this._tabs = opts.tabs;
	}

	_createClass(RgTabs, [{
		key: 'update',
		value: function update() {
			this.trigger('update');
		}
	}, {
		key: 'open',
		value: function open(tab) {
			if (!tab.disabled) {
				this.tabs.forEach(function (tab) {
					tab.active = false;
				});
				this.trigger('open', tab);
				tab.active = true;
			}
		}
	}, {
		key: 'tabs',
		get: function get() {
			var _this2 = this;

			if (Array.isArray(this._tabs)) {
				var _ret = (function () {
					var activeTab = false;
					_this2._tabs.forEach(function (tab, i) {
						tab.index = i;

						if (activeTab) tab.active = false;
						if (tab.active) activeTab = true;
					});
					return {
						v: _this2._tabs
					};
				})();

				if (typeof _ret === 'object') return _ret.v;
			}
			this._tabs = [];
			return this._tabs;
		},
		set: function set(tabs) {
			this._tabs = tabs;
		}
	}]);

	return RgTabs;
})();