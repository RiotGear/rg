'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

riot.tag2('rg-bubble', '<div class="context"> <div class="bubble {isvisible: RgBubble.isvisible}"> <rg-raw content="{RgBubble.content}"></rg-raw> </div> <div class="content" onmouseover="{showBubble}" onmouseout="{hideBubble}" onclick="{toggleBubble}"> <yield></yield> </div> </div>', 'rg-bubble .context,[riot-tag="rg-bubble"] .context,rg-bubble .content,[riot-tag="rg-bubble"] .content { display: inline-block; position: relative; } rg-bubble .bubble,[riot-tag="rg-bubble"] .bubble { position: absolute; top: -50px; left: 50%; transform: translate3d(-50%, 0, 0); padding: 10px 15px; background-color: #000; color: white; text-align: center; font-size: 0.9em; line-height: 1; white-space: nowrap; display: none; } rg-bubble .isvisible,[riot-tag="rg-bubble"] .isvisible { display: block; } rg-bubble .bubble:after,[riot-tag="rg-bubble"] .bubble:after { content: \'\'; position: absolute; display: block; bottom: -20px; left: 50%; transform: translate3d(-50%, 0, 0); width: 0; height: 0; border: 10px solid transparent; border-top-color: #000; }', '', function (opts) {
	var _this = this;

	this.on('mount', function () {
		_this.RgBubble = opts.bubble || new RgBubble(opts);
		_this.RgBubble.on('update', function () {
			_this.update();
		});
		_this.update();
	});

	this.showBubble = function () {
		_this.RgBubble.showBubble();
	};

	this.hideBubble = function () {
		_this.RgBubble.hideBubble();
	};

	this.toggleBubble = function () {
		_this.RgBubble.toggleBubble();
	};
}, '{ }');

var RgBubble = (function () {
	function RgBubble(opts) {
		_classCallCheck(this, RgBubble);

		riot.observable(this);
		if (!opts) opts = {};
		this._isvisible = opts.isvisible;
		this._content = opts.content;
	}

	_createClass(RgBubble, [{
		key: 'update',
		value: function update() {
			this.trigger('update');
		}
	}, {
		key: 'showBubble',
		value: function showBubble() {
			clearTimeout(this._timer);
			this.isvisible = true;
		}
	}, {
		key: 'hideBubble',
		value: function hideBubble() {
			var _this2 = this;

			this._timer = setTimeout(function () {
				_this2.isvisible = false;
				_this2.update();
			}, 1000);
		}
	}, {
		key: 'toggleBubble',
		value: function toggleBubble() {
			this.isvisible = !this.isvisible;
		}
	}, {
		key: 'isvisible',
		get: function get() {
			return this._isvisible == 'true' || this._isvisible === true;
		},
		set: function set(isvisible) {
			this._isvisible = isvisible;
		}
	}, {
		key: 'content',
		get: function get() {
			return this._content || '';
		},
		set: function set(content) {
			this._content = content;
		}
	}]);

	return RgBubble;
})();