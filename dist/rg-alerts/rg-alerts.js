riot.tag2('rg-alerts', '<div class="alerts"> <div each="{opts.alerts}" class="alerts__alert {\'alerts__alert--\' + type}" if="{isvisible}" onclick="{select}"> <button class="button button--close" if="{dismissable != false}" onclick="{parent.dismiss}"> &times; </button> {text} </div> </div>', '', '', function(opts) {
var _this = this;

this.on('update', function () {
	if (!opts.alerts) return;
	opts.alerts.forEach(function (alert) {
		alert._id = alert._id || (Math.floor(Math.random() * 60466175) + 1679615).toString(36);
		if (typeof alert.isvisible === 'undefined') alert.isvisible = true;
		if (alert.timeout) {
			alert.startTimer = function () {
				alert.timer = setTimeout(function () {
					_this.dismiss({
						item: alert
					});
				}, alert.timeout);
			};
			alert.startTimer();
		}
	});
});

this.dismiss = function (e) {
	var alert = e.item;
	alert.isvisible = false;
	clearTimeout(alert.timer);
	_this.trigger('dismiss', alert);
	_this.update();
};

this.select = function (e) {
	var alert = e.item;
	if (alert.onclick) alert.onclick(alert);
	_this.trigger('select', alert);
};
}, '{ }');
