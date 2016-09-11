riot.tag2('rg-toggle', '<div class="c-toggle {\'c-toggle--\' + opts.toggle.type}"> <label class="c-toggle__wrapper"> <input type="checkbox" __checked="{opts.toggle.checked}" onclick="{toggle}"> <div class="c-toggle__track"> <div class="c-toggle__handle"></div> </div> </label> </div>', '', '', function(opts) {
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
