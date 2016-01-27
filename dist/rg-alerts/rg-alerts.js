riot.tag2('rg-alerts', '<div each="{opts.alerts}" class="alert {type} {isvisible: isvisible}" onclick="{select}"> <a class="close" aria-label="Close" onclick="{parent.dismiss}" if="{dismissable != false}"> <span aria-hidden="true">&times;</span> </a> {content} </div>', 'rg-alerts,[riot-tag="rg-alerts"] { font-size: 0.9em; position: relative; top: 0; right: 0; left: 0; width: 100%; } rg-alerts .alert,[riot-tag="rg-alerts"] .alert { display: none; position: relative; margin-bottom: 15px; padding: 15px 35px 15px 15px; } rg-alerts .isvisible,[riot-tag="rg-alerts"] .isvisible { display: block; } rg-alerts .close,[riot-tag="rg-alerts"] .close { position: absolute; top: 50%; right: 20px; line-height: 12px; font-size: 1.1em; border: 0; background-color: transparent; color: rgba(0, 0, 0, 0.5); cursor: pointer; outline: none; transform: translate3d(0, -50%, 0); } rg-alerts .danger,[riot-tag="rg-alerts"] .danger { color: #8f1d2e; background-color: #ffced8; } rg-alerts .information,[riot-tag="rg-alerts"] .information { color: #31708f; background-color: #d9edf7; } rg-alerts .success,[riot-tag="rg-alerts"] .success { color: #2d8f40; background-color: #ccf7d4; } rg-alerts .warning,[riot-tag="rg-alerts"] .warning { color: #c06329; background-color: #f7dfd0; }', '', function(opts) {
var _this = this;

this.on('update', function () {
	if (!opts.alerts) return;
	opts.alerts.forEach(function (alert) {
		alert._id = alert._id || (Math.floor(Math.random() * 60466175) + 1679615).toString(36);
		if (typeof alert.isvisible === 'undefined') alert.isvisible = true;
		if (alert.timeout) {
			alert.startTimer = function () {
				alert.timer = setTimeout(function () {
					_this.dismiss({ item: alert });
					_this.update();
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
};

this.select = function (e) {
	var alert = e.item;
	if (alert.onclick) alert.onclick(alert);
	_this.trigger('select', alert);
};
}, '{ }');
