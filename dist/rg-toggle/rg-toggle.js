riot.tag2('rg-toggle', '<div class="toggle {\'toggle--\' + opts.toggle.type}"> <label class="toggle__wrapper"> <input type="checkbox" __checked="{opts.toggle.checked}" onclick="{toggle}"> <div class="toggle__track"> <div class="toggle__handle"></div> </div> </label> </div>', '', '', function(opts) {
var _this = this;

this.on('mount', function () {
	if (!opts.toggle) opts.toggle = {
		checked: false
	};
});

this.toggle = function () {
	opts.toggle.checked = !opts.toggle.checked;
	_this.trigger('toggle', opts.toggle.checked);
};
});
