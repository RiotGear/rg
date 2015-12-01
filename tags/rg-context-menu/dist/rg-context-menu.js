'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

riot.tag2('rg-context-menu', '<div class="menu {isvisible: RgContextMenu.isvisible}"> <div class="list"> <div each="{RgContextMenu.items}" class="item {inactive: inactive}" onclick="{selectItem}"> <rg-raw content="{content}"></rg-raw> </div> <yield></yield> </div> </div>', 'rg-context-menu .menu,[riot-tag="rg-context-menu"] .menu { display: none; position: absolute; background-color: white; border: 1px solid #D3D3D3; text-align: left; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; box-sizing: border-box; z-index: 2; } rg-context-menu .menu.isvisible,[riot-tag="rg-context-menu"] .menu.isvisible { display: block; } rg-context-menu .item,[riot-tag="rg-context-menu"] .item { cursor: pointer; padding: 10px; border-top: 1px solid #E8E8E8; background-color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } rg-context-menu .item:first-child,[riot-tag="rg-context-menu"] .item:first-child { border-top: 0; } rg-context-menu .item:hover,[riot-tag="rg-context-menu"] .item:hover { background-color: #f3f3f3; } rg-context-menu .item.inactive,[riot-tag="rg-context-menu"] .item.inactive { color: #8a8a8a; font-style: italic; } rg-context-menu .item.inactive:hover,[riot-tag="rg-context-menu"] .item.inactive:hover { background-color: #fff; }', '', function (opts) {
	var _this = this;

	var handleClickOutside = function handleClickOutside(e) {
		if (!_this.root.contains(e.target)) {
			if (_this.RgContextMenu.isvisible) _this.RgContextMenu.trigger('close');
			_this.RgContextMenu.isvisible = false;
			_this.update();
		}
	};

	var openMenu = function openMenu(e) {
		e.preventDefault();
		_this.RgContextMenu.isvisible = true;
		_this.RgContextMenu.trigger('open');

		var x = e.pageX;
		var y = e.pageY;
		var dd = _this.root.querySelector('.menu');
		var ddRect = dd.getBoundingClientRect();

		if (x > window.innerWidth + window.scrollX - ddRect.width) x = window.innerWidth + window.scrollX - ddRect.width;

		dd.style.left = x + 'px';

		if (y > window.innerHeight + window.scrollY - ddRect.height) y = window.innerHeight + window.scrollY - ddRect.height;

		dd.style.top = y + 'px';
		_this.update();
	};

	this.on('mount', function () {
		_this.RgContextMenu = opts.menu || new RgContextMenu(opts);
		_this.RgContextMenu.on('update', function () {
			_this.update();
		});
		document.addEventListener('click', handleClickOutside);
		var targets = document.querySelectorAll('[rg-context-menu]');
		for (var i = 0, target; target = targets[i]; i++) {
			if (target.attributes['rg-context-menu'].value == _this.RgContextMenu.name) target.addEventListener('contextmenu', openMenu);else target.addEventListener('contextmenu', _this.closeMenu);
		}
		_this.update();
	});

	this.on('unmount', function () {
		document.removeEventListener('click', handleClickOutside);
		var targets = document.querySelectorAll('[rg-context-menu]');
		for (var i = 0, target; target = targets[i]; i++) {
			if (target.attributes['rg-context-menu'].value == _this.RgContextMenu.name) target.removeEventListener('contextmenu', openMenu);else target.removeEventListener('contextmenu', _this.closeMenu);
		}
	});

	this.closeMenu = function () {
		_this.RgContextMenu.isvisible = false;
	};

	this.selectItem = function (item) {
		item = item.item;
		_this.RgContextMenu.select(item);
	};
}, '{ }');

var RgContextMenu = (function () {
	function RgContextMenu(opts) {
		_classCallCheck(this, RgContextMenu);

		riot.observable(this);
		if (!opts) opts = {};
		this.name = opts.name;
		this._isvisible = opts.isvisible;
		this._items = opts.items;
	}

	_createClass(RgContextMenu, [{
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
		key: 'select',
		value: function select(item) {
			if (!item.inactive) {
				this.trigger('select', item);
				this.isvisible = false;
			}
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
		key: 'isvisible',
		get: function get() {
			return this._isvisible == 'true' || this._isvisible === true;
		},
		set: function set(isvisible) {
			this._isvisible = isvisible == 'true' || isvisible === true;
		}
	}]);

	return RgContextMenu;
})();