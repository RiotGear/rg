riot.tag2('rg-select', '<input type="text" name="selectfield" class="field" value="{fieldText}" placeholder="{opts.select.placeholder}" onkeydown="{handleKeys}" onclick="{toggle}" readonly> <ul class="menu menu--high" if="{opts.select.isvisible}"> <li each="{opts.select.options}" onclick="{parent.select}" class="menu__item {\'menu__item--active\': selected, \'menu__item--disabled\': disabled, \'menu__item--hover\': active}"> {text} </li> </ul>', 'rg-select .menu,[riot-tag="rg-select"] .menu { position: absolute; }', '', function(opts) {
var _this = this;

if (!opts.select) opts.select = { options: [] };

var handleClickOutside = function handleClickOutside(e) {
	if (!_this.root.contains(e.target)) _this.close();
	_this.update();
};

this.handleKeys = function (e) {
	if ([13, 38, 40].indexOf(e.keyCode) > -1 && !opts.select.isvisible) {
		e.preventDefault();
		_this.open();
		return true;
	}
	if (!opts.select.isvisible) _this.open();
	var length = opts.select.options.length;
	if (length > 0 && [13, 38, 40].indexOf(e.keyCode) > -1) {
		e.preventDefault();

		var activeIndex = null;
		for (var i = 0; i < length; i++) {
			var item = opts.select.options[i];
			if (item.active) {
				activeIndex = i;
				break;
			}
		}

		if (activeIndex != null) opts.select.options[activeIndex].active = false;

		if (e.keyCode == 38) {
			if (activeIndex == null || activeIndex == 0) opts.select.options[length - 1].active = true;else opts.select.options[activeIndex - 1].active = true;
		} else if (e.keyCode == 40) {
			if (activeIndex == null || activeIndex == length - 1) opts.select.options[0].active = true;else opts.select.options[activeIndex + 1].active = true;
		} else if (e.keyCode == 13 && activeIndex != null) {
			_this.select({
				item: opts.select.options[activeIndex]
			});
		}
	}
	return true;
};

this.open = function () {
	opts.select.isvisible = true;
	_this.trigger('open');
};

this.close = function () {
	if (opts.select.isvisible) {
		opts.select.isvisible = false;
		_this.trigger('close');
	}
};

this.toggle = function () {
	if (opts.select.isvisible) _this.close();else _this.open();
};

this.select = function (e) {
	opts.select.options.forEach(function (i) {
		return i.selected = false;
	});
	e.item.selected = true;
	opts.select.isvisible = false;
	_this.trigger('select', e.item);
};

this.on('mount', function () {
	document.addEventListener('click', handleClickOutside);
	_this.update();
});

this.on('update', function () {
	for (var i = 0; i < opts.select.options.length; i++) {
		var item = opts.select.options[i];
		if (item.selected) {
			_this.selectfield.value = item.text;
			break;
		}
	}
});

this.on('unmount', function () {
	document.removeEventListener('click', handleClickOutside);
});
}, '{ }');
