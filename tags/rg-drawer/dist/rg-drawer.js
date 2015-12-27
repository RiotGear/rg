'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

riot.tag2('rg-drawer', '<div class="overlay {visible: RgDrawer.isvisible}" onclick="{close}"></div> <div class="drawer {RgDrawer.position} {visible: RgDrawer.isvisible}"> <h4 class="header">{RgDrawer.header}</h4> <ul class="items"> <li class="item {active: active}" each="{RgDrawer.items}" onclick="{parent.select}"> <rg-raw content="{content}"></rg-raw> </li> </ul> <div class="body"> <yield></yield> </div> </div>', 'rg-drawer .overlay,[riot-tag="rg-drawer"] .overlay { display: none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); cursor: pointer; z-index: 50; } rg-drawer .overlay.visible,[riot-tag="rg-drawer"] .overlay.visible { display: block; } rg-drawer .drawer,[riot-tag="rg-drawer"] .drawer { position: absolute; overflow-y: auto; overflow-x: hidden; -webkit-overflow-scrolling: touch; background-color: white; color: black; transition: transform 0.5s ease; z-index: 51; } rg-drawer .drawer.bottom,[riot-tag="rg-drawer"] .drawer.bottom { top: 100%; left: 0; height: auto; width: 80%; margin-left: 10%; transform: translate3d(0, 0, 0); } rg-drawer .drawer.bottom.visible,[riot-tag="rg-drawer"] .drawer.bottom.visible { transform: translate3d(0, -100%, 0); } rg-drawer .drawer.top,[riot-tag="rg-drawer"] .drawer.top { bottom: 100%; left: 0; height: auto; width: 80%; margin-left: 10%; transform: translate3d(0, 0, 0); } rg-drawer .drawer.top.visible,[riot-tag="rg-drawer"] .drawer.top.visible { transform: translate3d(0, 100%, 0); } rg-drawer .drawer.left,[riot-tag="rg-drawer"] .drawer.left { top: 0; left: 0; height: 100%; width: 260px; transform: translate3d(-100%, 0, 0); } rg-drawer .drawer.left.visible,[riot-tag="rg-drawer"] .drawer.left.visible { transform: translate3d(0, 0, 0); } rg-drawer .drawer.right,[riot-tag="rg-drawer"] .drawer.right { top: 0; left: 100%; height: 100%; width: 260px; transform: translate3d(0, 0, 0); } rg-drawer .drawer.right.visible,[riot-tag="rg-drawer"] .drawer.right.visible { transform: translate3d(-100%, 0, 0); } rg-drawer .header,[riot-tag="rg-drawer"] .header { padding: 1.2rem; margin: 0; text-align: center; } rg-drawer .items,[riot-tag="rg-drawer"] .items { padding: 0; margin: 0; list-style: none; } rg-drawer .item,[riot-tag="rg-drawer"] .item { padding: 1rem 0.5rem; box-sizing: border-box; border-top: 1px solid #E8E8E8; } rg-drawer .item:last-child,[riot-tag="rg-drawer"] .item:last-child { border-bottom: 1px solid #E8E8E8; } rg-drawer .item:hover,[riot-tag="rg-drawer"] .item:hover { cursor: pointer; background-color: #E8E8E8; } rg-drawer .item.active,[riot-tag="rg-drawer"] .item.active { cursor: pointer; background-color: #EEE; }', '', function (opts) {
	var _this = this;

	this.on('mount', function () {
		_this.RgDrawer = opts.drawer || new rg.Drawer(opts);
		_this.RgDrawer.on('update', function () {
			_this.update();
		});
		_this.update();
	});

	this.close = function () {
		_this.RgDrawer.close();
	};

	this.select = function (e) {
		_this.RgDrawer.select(e.item);
	};
}, '{ }');
;(function () {
	window.rg = window.rg || {};
	rg.Drawer = (function () {
		function RgDrawer(opts) {
			_classCallCheck(this, RgDrawer);

			riot.observable(this);
			if (!opts) opts = {};
			this._isvisible = opts.isvisible;
			this._header = opts.header;
			this._items = opts.items;
			this._position = opts.position;
		}

		_createClass(RgDrawer, [{
			key: 'update',
			value: function update() {
				this.trigger('update');
			}
		}, {
			key: 'open',
			value: function open() {
				this.trigger('open');
				this.isvisible = true;
			}
		}, {
			key: 'close',
			value: function close() {
				this.trigger('close');
				this.isvisible = false;
			}
		}, {
			key: 'toggle',
			value: function toggle() {
				this.isvisible = !this.isvisible;
				if (this.isvisible) this.trigger('open');else if (!this.isvisible) this.trigger('close');
			}
		}, {
			key: 'select',
			value: function select(item) {
				this.items.forEach(function (item) {
					return item.active = false;
				});
				item.active = true;
				this.trigger('select', item);
			}
		}, {
			key: 'isvisible',
			get: function get() {
				return this._isvisible == 'true' || this._isvisible === true;
			},
			set: function set(isvisible) {
				this._isvisible = isvisible == 'true' || isvisible === true;
			}
		}, {
			key: 'header',
			get: function get() {
				return this._header;
			},
			set: function set(header) {
				this._header = header;
			}
		}, {
			key: 'items',
			get: function get() {
				if (Array.isArray(this._items)) return this._items;
				this._items = [];
				return this._items;
			},
			set: function set(items) {
				this._items = items;
			}
		}, {
			key: 'position',
			get: function get() {
				return this._position || 'bottom';
			},
			set: function set(position) {
				this._position = position;
			}
		}]);

		return RgDrawer;
	})();
})();