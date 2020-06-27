riot.tag2('rg-drawer', '<div class="c-overlay" if="{opts.drawer.isvisible}" onclick="{close}"></div> <div class="c-drawer {\'c-drawer--\' + opts.drawer.position || \'c-drawer--bottom\'} {\'c-drawer--visible\': opts.drawer.isvisible}"> <h4 class="c-heading c-heading--xsmall">{opts.drawer.header}</h4> <ul class="c-menu"> <li class="c-menu__item {\'c-menu__item--active\': active}" each="{opts.drawer.items}" onclick="{parent.select}"> {text} </li> </ul> <div class="c-drawer__body"> <yield></yield> </div> </div>', '', '', function(opts) {
var _this = this;

this.on('mount', function () {
	if (!opts.drawer) opts.drawer = {};
});

this.close = function () {
	opts.drawer.isvisible = false;
	_this.trigger('close');
};

this.select = function (e) {
	opts.drawer.items.forEach(function (item) {
		return item.active = false;
	});
	e.item.active = true;
	_this.trigger('select', e.item);
};
});
