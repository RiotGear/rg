'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

riot.tag2('rg-loading', '<div class="loading {visible: RgLoading.isvisible}"> <div class="overlay"></div> <div class="content"> <yield></yield> </div> </div>', 'rg-loading .loading,[riot-tag="rg-loading"] .loading { display: none; } rg-loading .visible,[riot-tag="rg-loading"] .visible { display: block; } rg-loading .overlay,[riot-tag="rg-loading"] .overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.8); z-index: 200; } rg-loading .content,[riot-tag="rg-loading"] .content { position: absolute; width: 95%; max-width: 420px; top: 50%; left: 50%; transform: translate3d(-50%, -50%, 0); background-color: transparent; color: #fff; text-align: center; z-index: 201; }', '', function (opts) {
	var _this = this;

	this.on('mount', function () {
		_this.RgLoading = opts.loading || new rg.Loading(opts);
		_this.RgLoading.on('update', function () {
			_this.update();
		});
		_this.update();
	});
}, '{ }');
;(function () {
	window.rg = window.rg || {};
	rg.Loading = (function () {
		function RgLoading(opts) {
			_classCallCheck(this, RgLoading);

			riot.observable(this);
			if (!opts) opts = {};
			this._isvisible = opts.isvisible;
		}

		_createClass(RgLoading, [{
			key: 'update',
			value: function update() {
				this.trigger('update');
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

		return RgLoading;
	})();
})();