'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

riot.tag2('rg-modal', '<div class="overlay {visible: RgModal.isvisible, ghost: RgModal.ghost, dismissable: RgModal.dismissable}" onclick="{close}"></div> <div class="modal {visible: RgModal.isvisible, ghost: RgModal.ghost, dismissable: RgModal.dismissable}"> <header class="header"> <button if="{RgModal.dismissable}" type="button" class="close" aria-label="Close" onclick="{close}"> <span aria-hidden="true">&times;</span> </button> <h3 class="heading"><rg-raw content="{RgModal.heading}"></rg-raw></h3> </header> <div class="body"> <yield></yield> </div> <footer class="footer"> <button class="button" each="{RgModal.buttons}" type="button" onclick="{action}" riot-style="{style}"> <rg-raw content="{content}"></rg-raw> </button> <div class="clear"></div> </footer> </div>', 'rg-modal .overlay,[riot-tag="rg-modal"] .overlay { display: none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.8); z-index: 100; } rg-modal .overlay.dismissable,[riot-tag="rg-modal"] .overlay.dismissable { cursor: pointer; } rg-modal .modal,[riot-tag="rg-modal"] .modal { display: none; position: absolute; width: 95%; max-width: 500px; font-size: 1.1em; top: 50%; left: 50%; transform: translate3d(-50%, -50%, 0); background-color: white; color: #252519; z-index: 101; } rg-modal .modal.ghost,[riot-tag="rg-modal"] .modal.ghost { background-color: transparent; color: white; } rg-modal .visible,[riot-tag="rg-modal"] .visible { display: block; } rg-modal .header,[riot-tag="rg-modal"] .header { position: relative; text-align: center; } rg-modal .heading,[riot-tag="rg-modal"] .heading { padding: 20px 20px 0 20px; margin: 0; font-size: 1.2em; } rg-modal .modal.ghost .heading,[riot-tag="rg-modal"] .modal.ghost .heading { color: white; } rg-modal .close,[riot-tag="rg-modal"] .close { position: absolute; top: 5px; right: 10px; padding: 0; font-size: 1.2em; border: 0; background-color: transparent; color: #000; cursor: pointer; outline: none; } rg-modal .modal.ghost .close,[riot-tag="rg-modal"] .modal.ghost .close { color: white; } rg-modal .body,[riot-tag="rg-modal"] .body { padding: 20px; } rg-modal .footer,[riot-tag="rg-modal"] .footer { padding: 0 20px 20px 20px; } rg-modal .button,[riot-tag="rg-modal"] .button { float: right; padding: 10px; margin: 0 5px 0 0; border: none; font-size: 0.9em; text-transform: uppercase; cursor: pointer; outline: none; background-color: white; } rg-modal .modal.ghost .button,[riot-tag="rg-modal"] .modal.ghost .button { color: white; background-color: transparent; } rg-modal .clear,[riot-tag="rg-modal"] .clear { clear: both; }', '', function (opts) {
	var _this = this;

	this.on('mount', function () {
		_this.RgModal = opts.modal || new rg.Modal(opts);
		_this.RgModal.on('update', function () {
			_this.update();
		});
		_this.update();
	});

	this.close = function () {
		if (_this.RgModal.dismissable) _this.RgModal.isvisible = false;
	};
}, '{ }');
;(function () {
	window.rg = window.rg || {};
	rg.Modal = (function () {
		function RgModal(opts) {
			_classCallCheck(this, RgModal);

			riot.observable(this);
			this._isvisible = opts.isvisible;
			this._dismissable = opts.dismissable;
			this._ghost = opts.ghost;
			this._heading = opts.heading;
			this._buttons = opts.buttons;
		}

		_createClass(RgModal, [{
			key: 'update',
			value: function update() {
				this.trigger('update');
			}
		}, {
			key: 'dismissable',
			get: function get() {
				if (typeof this._dismissable === 'undefined') this._dismissable = true;
				return this._dismissable == 'true' || this._dismissable === true;
			},
			set: function set(dismissable) {
				this._dismissable = dismissable;
			}
		}, {
			key: 'ghost',
			get: function get() {
				return this._ghost == 'true' || this._ghost === true;
			},
			set: function set(ghost) {
				this._ghost = ghost;
			}
		}, {
			key: 'heading',
			get: function get() {
				return this._heading || '';
			},
			set: function set(heading) {
				this._heading = heading;
			}
		}, {
			key: 'buttons',
			get: function get() {
				if (Array.isArray(this._buttons)) return this._buttons;
				return [];
			},
			set: function set(buttons) {
				this._buttons = buttons;
			}
		}, {
			key: 'isvisible',
			get: function get() {
				return this._isvisible == 'true' || this._isvisible === true;
			},
			set: function set(isvisible) {
				this._isvisible = isvisible;
				if (this.isvisible) this.trigger('open');
				if (!this.isvisible) this.trigger('close');
			}
		}]);

		return RgModal;
	})();
})();