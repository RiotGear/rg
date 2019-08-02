riot.tag2('rg-tags', '<div class="tags"> <span class="tags__container"> <button each="{opts.tags.tags}" onclick="{removeTag}" type="button" class="button button--primary tag"> {text} <span class="tag__close">×</span> </button> </span> <div class="tags__field-container"> <input type="{opts.tags.filter ? \'search\' : \'text\'}" name="selectfield" class="field" placeholder="{opts.tags.placeholder}" onkeydown="{navigate}" oninput="{filterOptions}" onfocus="{open}" __readonly="{!opts.tags.filter}"> <ul class="menu menu--high" if="{opts.tags.isvisible}"> <li each="{options}" no-reorder onclick="{parent.select}" class="menu__item {\'menu__item--active\': selected, \'menu__item--disabled\': disabled, \'menu__item--hover\': active}"> {text} </li> </ul> </div> </div>', 'rg-tags .menu,[riot-tag="rg-tags"] .menu,[data-is="rg-tags"] .menu{ position: absolute; }', '', function(opts) {
var _this = this;

if (!opts.tags) opts.tags = { options: [], tags: [] };
if (!opts.tags.options) opts.tags.options = [];
if (!opts.tags.tags) opts.tags.tags = [];

var handleClickOutside = function handleClickOutside(e) {
	if (!_this.root.contains(e.target)) _this.close();
	_this.update();
};

var applyFieldText = function applyFieldText() {
	var input = _this.root.querySelector("input");
	if (input) {
		input.value = '';
	}
	for (var i = 0; i < opts.tags.options.length; i++) {
		var item = opts.tags.options[i];
		item.selected = false;
	}
};

this.filterOptions = function () {
	_this.options = opts.tags.options;
	if (opts.tags.filter) _this.options = _this.options.filter(function (option) {
		var attr = option[opts.tags.filter];
		return attr && attr.toLowerCase().indexOf(_this.root.querySelector("input").value.toLowerCase()) > -1;
	});
	_this.trigger('filter', _this.root.querySelector("input").value);
};

function getWindowDimensions() {
	var w = window,
	    d = document,
	    e = d.documentElement,
	    g = d.getElementsByTagName('body')[0],
	    x = w.innerWidth || e.clientWidth || g.clientWidth,
	    y = w.innerHeight || e.clientHeight || g.clientHeight;
	return { width: x, height: y };
}

var positionDropdown = function positionDropdown() {
	var w = getWindowDimensions();
	var m = _this.root.querySelector('.menu');
	if (!m) return;
	if (!opts.tags.isvisible) {
		m.style.marginTop = '';
		m.style.marginLeft = '';
		return;
	}
	var pos = m.getBoundingClientRect();
	if (w.width < pos.left + pos.width) {
		m.style.marginLeft = w.width - (pos.left + pos.width) - 20 + 'px';
	}
	if (pos.left < 0) {
		m.style.marginLeft = '20px';
	}
	if (w.height < pos.top + pos.height) {
		m.style.marginTop = w.height - (pos.top + pos.height) - 20 + 'px';
	}
};

this.navigate = function (e) {
	if ([13, 38, 40].includes(e.keyCode) && !opts.tags.isvisible) {
		e.preventDefault();
		_this.open();
		return true;
	}
	var length = _this.options.length;
	if (length > 0 && [13, 38, 40].includes(e.keyCode)) {
		e.preventDefault();

		var activeIndex = null;
		for (var i = 0; i < length; i++) {
			var item = _this.options[i];
			if (item.active) {
				activeIndex = i;
				break;
			}
		}

		if (activeIndex != null) _this.options[activeIndex].active = false;

		if (e.keyCode == 38) {
			if (activeIndex == null || activeIndex == 0) _this.options[length - 1].active = true;else _this.options[activeIndex - 1].active = true;
		} else if (e.keyCode == 40) {
			if (activeIndex == null || activeIndex == length - 1) _this.options[0].active = true;else _this.options[activeIndex + 1].active = true;
		} else if (e.keyCode == 13 && activeIndex != null) {
			_this.select({
				item: _this.options[activeIndex]
			});
		}
	}
	return true;
};

this.open = function () {
	opts.tags.isvisible = true;
	_this.trigger('open');
};

this.close = function () {
	if (opts.tags.isvisible) {
		opts.tags.isvisible = false;
		_this.trigger('close');
	}
};

this.select = function (e) {
	opts.tags.options.forEach(function (i) {
		return i.selected = false;
	});
	e.item.selected = true;
	_this.addTag(e.item);
	applyFieldText();
	_this.filterOptions();
	_this.trigger('select', e.item);
};

this.addTag = function (item) {
	if (opts.tags.tags.indexOf(item) == -1) {
		opts.tags.tags.push(item);
	}
};

this.removeTag = function (e) {
	opts.tags.tags = opts.tags.tags.filter(function (tag) {
		if (tag._id != e.item._id) return tag;
	});
};

this.on('mount', function () {
	applyFieldText();
	_this.filterOptions();
	document.addEventListener('click', handleClickOutside);
	_this.update();
});

this.on('update', function () {
	opts.tags.options.forEach(function (item) {
		item._id = item._id || (Math.floor(Math.random() * 60466175) + 1679615).toString(36);
	});
	opts.tags.tags.forEach(function (tag) {
		tag._id = tag._id || (Math.floor(Math.random() * 60466175) + 1679615).toString(36);
	});

	if (!opts.tags.filter) applyFieldText();
	positionDropdown();
});

this.on('unmount', function () {
	document.removeEventListener('click', handleClickOutside);
});
});
