riot.tag2('rg-toasts', '<div if="{opts.toasts.isvisible}" class="toasts {opts.toasts.position || \'bottomright\'}"> <div each="{opts.toasts.toasts}" class="toast {isvisible: isvisible}" onclick="{parent.toastClicked}"> {text} </div> </div>', 'rg-toasts .toasts,[riot-tag="rg-toasts"] .toasts { position: fixed; width: 250px; max-height: 100%; overflow-y: auto; background-color: transparent; z-index: 101; } rg-toasts .toasts.topleft,[riot-tag="rg-toasts"] .toasts.topleft { top: 0; left: 0; } rg-toasts .toasts.topright,[riot-tag="rg-toasts"] .toasts.topright { top: 0; right: 0; } rg-toasts .toasts.bottomleft,[riot-tag="rg-toasts"] .toasts.bottomleft { bottom: 0; left: 0; } rg-toasts .toasts.bottomright,[riot-tag="rg-toasts"] .toasts.bottomright { bottom: 0; right: 0; } rg-toasts .toast,[riot-tag="rg-toasts"] .toast { display: none; padding: 20px; margin: 20px; background-color: #000; color: white; font-size: 0.9em; cursor: pointer; } rg-toasts .toast.isvisible,[riot-tag="rg-toasts"] .toast.isvisible { display: block; }', '', function(opts) {
var _this = this;

this.toastClicked = function (e) {
	var toast = e.item;
	window.clearTimeout(toast.timer);
	toast.isvisible = false;
	_this.trigger('select', toast);
};

var _uid = 1;
var uid = function uid() {
	return _uid++;
};

this.on('update', function () {
	if (!opts.toasts || !Array.isArray(opts.toasts.toasts)) return;

	opts.toasts.toasts.forEach(function (toast) {
		if (typeof toast.isvisible == 'undefined') toast.isvisible = true;
		toast.id = toast.id || uid();
		if (!toast.timer && !toast.sticky) {
			toast.startTimer = function () {
				toast.timer = window.setTimeout(function () {
					toast.isvisible = false;
					_this.trigger('close', toast);
					_this.update();
				}, toast.timeout || 6000);
			};
			toast.startTimer();
		}
	});
	opts.toasts.isvisible = opts.toasts.toasts.filter(function (toast) {
		return toast.isvisible;
	}).length > 0;
});
}, '{ }');
