'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

riot.tag2('rg-toggle', '<div class="wrapper"> <label class="toggle"> <input type="checkbox" __checked="{RgToggle.checked}" onclick="{toggle}"> <div class="track"> <div class="handle"></div> </div> </label> </div>', 'rg-toggle .wrapper,[riot-tag="rg-toggle"] .wrapper { width: 60px; height: 20px; margin: 0; display: inline-block; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } rg-toggle .toggle,[riot-tag="rg-toggle"] .toggle { position: absolute; cursor: pointer; } rg-toggle input[type=checkbox],[riot-tag="rg-toggle"] input[type=checkbox] { display: none; } rg-toggle .track,[riot-tag="rg-toggle"] .track { position: absolute; top: 0; bottom: 0; left: 0; right: 0; width: 60px; height: 20px; padding: 2px; background-color: #b6c0c7; transition: background-color 0.1s linear; box-sizing: border-box; } rg-toggle input[type=checkbox]:checked + .track,[riot-tag="rg-toggle"] input[type=checkbox]:checked + .track { background-color: #000; } rg-toggle .handle,[riot-tag="rg-toggle"] .handle { position: relative; left: 0; width: 50%; height: 100%; background-color: white; transition: transform 0.1s linear; } rg-toggle input[type=checkbox]:checked + .track .handle,[riot-tag="rg-toggle"] input[type=checkbox]:checked + .track .handle { transform: translate3d(100%, 0, 0); }', '', function (opts) {
	var _this = this;

	this.on('mount', function () {
		_this.RgToggle = opts.toggle || new RgToggle();
		_this.RgToggle.on('update', function () {
			_this.update();
		});
		_this.update();
	});

	this.toggle = function () {
		_this.RgToggle.toggle();
	};
}, '{ }');

var RgToggle = (function () {
	function RgToggle(opts) {
		_classCallCheck(this, RgToggle);

		riot.observable(this);
		if (!opts) opts = {};
		this._checked = opts.checked;
	}

	_createClass(RgToggle, [{
		key: 'update',
		value: function update() {
			this.trigger('update');
		}
	}, {
		key: 'toggle',
		value: function toggle() {
			this.checked = !this.checked;
			this.trigger('toggle', this.checked);
		}
	}, {
		key: 'checked',
		get: function get() {
			return this._checked == 'true' || this._checked === true;
		},
		set: function set(checked) {
			this._checked = checked;
		}
	}]);

	return RgToggle;
})();