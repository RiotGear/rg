'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

riot.tag2('rg-select', '<div class="container {visible: RgSelect.isvisible}" riot-style="width: {width}"> <input if="{!RgSelect.autocomplete}" type="text" name="selectfield" class="field {visible: RgSelect.isvisible}" value="{fieldText}" placeholder="{RgSelect.placeholder}" onkeydown="{handleKeys}" onclick="{toggle}" readonly> <input if="{RgSelect.autocomplete}" type="text" name="autocompletefield" class="field {visible: RgSelect.isvisible}" value="{fieldText}" placeholder="{RgSelect.placeholder}" onkeydown="{handleKeys}" onclick="{toggle}" oninput="{filter}"> <div class="dropdown {isvisible: RgSelect.isvisible} {empty: RgSelect.filtereditems.length == 0}"> <div class="filter" if="{RgSelect.hasfilter && !RgSelect.autocomplete}"> <input type="text" name="filterfield" class="filter-box" placeholder="{RgSelect.filterplaceholder || \'Filter\'}" onkeydown="{handleKeys}" oninput="{filter}"> </div> <ul class="list {empty: RgSelect.filtereditems.length == 0}"> <li each="{RgSelect.filtereditems}" onclick="{parent.select}" class="item {selected: selected, disabled: disabled, active: active}"> {text} </li> </ul> </div> </div>', 'rg-select .container,[riot-tag="rg-select"] .container { position: relative; display: inline-block; cursor: pointer; } rg-select .field,[riot-tag="rg-select"] .field { width: 100%; padding: 10px; border: 1px solid #D3D3D3; box-sizing: border-box; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 1em; line-height: normal; outline: 0; -webkit-appearance: none; -moz-appearance: none; appearance: none; } rg-select .dropdown,[riot-tag="rg-select"] .dropdown { display: none; position: absolute; width: 100%; background-color: white; border-bottom: 1px solid #D3D3D3; box-sizing: border-box; overflow-y: auto; overflow-x: hidden; max-height: 280px; z-index: 10; } rg-select .dropdown.isvisible,[riot-tag="rg-select"] .dropdown.isvisible { display: block; } rg-select .dropdown.empty,[riot-tag="rg-select"] .dropdown.empty { border-bottom: 0; } rg-select .filter-box,[riot-tag="rg-select"] .filter-box { width: 100%; padding: 10px; font-size: 0.9em; border: 0; border-left: 1px solid #D3D3D3; border-right: 1px solid #D3D3D3; border-bottom: 1px solid #E8E8E8; outline: none; color: #555; box-sizing: border-box; } rg-select .list,[riot-tag="rg-select"] .list,rg-select .item,[riot-tag="rg-select"] .item { list-style: none; padding: 0; margin: 0; } rg-select .list.empty,[riot-tag="rg-select"] .list.empty { display: none; } rg-select .item,[riot-tag="rg-select"] .item { padding: 10px; border-left: 1px solid #D3D3D3; border-right: 1px solid #D3D3D3; border-top: 1px solid #E8E8E8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } rg-select .item:first-child,[riot-tag="rg-select"] .item:first-child { border-top: 0; } rg-select .selected,[riot-tag="rg-select"] .selected { font-weight: bold; background-color: #f8f8f8; } rg-select .item:hover,[riot-tag="rg-select"] .item:hover { background-color: #f3f3f3; } rg-select .item.active,[riot-tag="rg-select"] .item.active,rg-select .item:hover.active,[riot-tag="rg-select"] .item:hover.active { background-color: #ededed; }', '', function (opts) {
	var _this = this;

	var handleClickOutside = function handleClickOutside(e) {
		if (!_this.root.contains(e.target)) {
			_this.RgSelect.close();
			_this.update();
		}
	};

	this.handleKeys = function (e) {
		if ([13, 38, 40].indexOf(e.keyCode) > -1 && !_this.RgSelect.isvisible) {
			e.preventDefault();
			_this.toggle();
			return true;
		}
		if (_this.RgSelect.autocomplete && !_this.RgSelect.isvisible) _this.toggle();
		var length = _this.RgSelect.filtereditems.length;
		if (length > 0 && [13, 38, 40].indexOf(e.keyCode) > -1) {
			e.preventDefault();

			var activeIndex = null;
			for (var i = 0; i < length; i++) {
				var item = _this.RgSelect.filtereditems[i];
				if (item.active) {
					activeIndex = i;
					break;
				}
			}

			if (activeIndex != null) _this.RgSelect.filtereditems[activeIndex].active = false;

			if (e.keyCode == 38) {
				if (activeIndex == null || activeIndex == 0) _this.RgSelect.filtereditems[length - 1].active = true;else _this.RgSelect.filtereditems[activeIndex - 1].active = true;
			} else if (e.keyCode == 40) {
				if (activeIndex == null || activeIndex == length - 1) _this.RgSelect.filtereditems[0].active = true;else _this.RgSelect.filtereditems[activeIndex + 1].active = true;
			} else if (e.keyCode == 13 && activeIndex != null) {
				_this.select({ item: _this.RgSelect.filtereditems[activeIndex] });
			}
		}
		return true;
	};

	this.toggle = function () {
		_this.RgSelect.toggle();
	};

	this.filter = function () {
		var text = _this.filterfield.value;
		if (_this.RgSelect.autocomplete) text = _this.autocompletefield.value;
		_this.RgSelect.filter(text);
	};

	this.select = function (item) {
		item = item.item;
		_this.RgSelect.select(item);
	};

	this.on('mount', function () {
		_this.RgSelect = opts.select || new rg.Select(opts);
		_this.RgSelect.on('update', function () {
			if (_this.RgSelect.isvisible) _this.filter();
			_this.update();
		});
		_this.RgSelect.on('select', function (item) {
			_this.selectfield.value = item[_this.RgSelect.filteron];
			_this.autocompletefield.value = item[_this.RgSelect.filteron];
			_this.update();
		});
		document.addEventListener('click', handleClickOutside);

		_this.filter();
		_this.update();
	});

	this.on('unmount', function () {
		document.removeEventListener('click', handleClickOutside);
	});
}, '{ }');

riot.tag2('rg-tags', '<div class="container"> <span class="tags"> <span class="tag" each="{tag in RgTags.tags}" onclick="{parent.removeTag}"> {tag.text} <span class="close">&times;</span> </span> </span> <div class="field-container {isvisible: RgTags.isvisible}"> <input type="text" class="field" name="filterfield" placeholder="{RgTags.placeholder}" onkeydown="{handleKeys}" oninput="{filter}" onfocus="{toggle}"> <div class="dropdown {isvisible: RgTags.isvisible}"> <ul class="list"> <li each="{RgTags.filtereditems}" onclick="{parent.addTag}" class="item {disabled: disabled, active: active}"> {text} </li> </ul> </div> </div> </div>', 'rg-tags .container,[riot-tag="rg-tags"] .container { position: relative; width: 100%; border: 1px solid #D3D3D3; background-color: white; text-align: left; padding: 0; box-sizing: border-box; } rg-tags .field-container,[riot-tag="rg-tags"] .field-container { position: absolute; display: inline-block; cursor: pointer; } rg-tags .field,[riot-tag="rg-tags"] .field { width: 100%; padding: 10px; border: 0; box-sizing: border-box; background-color: transparent; white-space: nowrap; font-size: 1em; line-height: normal; outline: 0; -webkit-appearance: none; -moz-appearance: none; appearance: none; } rg-tags .dropdown,[riot-tag="rg-tags"] .dropdown { display: none; position: absolute; width: 100%; background-color: white; border-bottom: 1px solid #D3D3D3; box-sizing: border-box; overflow-y: auto; overflow-x: hidden; max-height: 280px; margin: -1px 0 0 -1px; } rg-tags .dropdown.isvisible,[riot-tag="rg-tags"] .dropdown.isvisible { display: block; } rg-tags .list,[riot-tag="rg-tags"] .list,rg-tags .item,[riot-tag="rg-tags"] .item { list-style: none; padding: 0; margin: 0; } rg-tags .list.empty,[riot-tag="rg-tags"] .list.empty { display: none; } rg-tags .item,[riot-tag="rg-tags"] .item { padding: 10px; border-left: 1px solid #D3D3D3; border-right: 1px solid #D3D3D3; border-top: 1px solid #E8E8E8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } rg-tags .item:first-child,[riot-tag="rg-tags"] .item:first-child { border-top: 0; } rg-tags .item:hover,[riot-tag="rg-tags"] .item:hover { background-color: #f3f3f3; } rg-tags .item.active,[riot-tag="rg-tags"] .item.active,rg-tags .item:hover.active,[riot-tag="rg-tags"] .item:hover.active { background-color: #ededed; } rg-tags .tags,[riot-tag="rg-tags"] .tags { display: inline-block; max-width: 70%; white-space: nowrap; overflow-y: hidden; overflow-x: auto; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } rg-tags .tag,[riot-tag="rg-tags"] .tag { position: relative; display: inline-block; padding: 8px 20px 8px 5px; margin: 1px; background-color: #000; color: #fff; font-size: 1em; line-height: normal; cursor: pointer; } rg-tags .tag:hover,[riot-tag="rg-tags"] .tag:hover,rg-tags .tag:active,[riot-tag="rg-tags"] .tag:active { background-color: #666; } rg-tags .close,[riot-tag="rg-tags"] .close { position: absolute; right: 5px; top: 7px; color: rgba(255, 255, 255, 0.7); }', '', function (opts) {
	var _this = this;

	var handleClickOutside = function handleClickOutside(e) {
		if (!_this.root.contains(e.target)) {
			_this.RgTags.close();
			_this.update();
		}
	};

	this.handleKeys = function (e) {
		if ([13, 38, 40].indexOf(e.keyCode) > -1 && !_this.RgTags.isvisible) {
			e.preventDefault();
			_this.toggle();
			return true;
		}
		if (!_this.RgTags.isvisible) _this.toggle();
		var length = _this.RgTags.filtereditems.length;
		if (length > 0 && [13, 38, 40].indexOf(e.keyCode) > -1) {
			e.preventDefault();

			var activeIndex = null;
			for (var i = 0; i < length; i++) {
				var item = _this.RgTags.filtereditems[i];
				if (item.active) {
					activeIndex = i;
					break;
				}
			}

			if (activeIndex != null) _this.RgTags.filtereditems[activeIndex].active = false;

			if (e.keyCode == 38) {
				if (activeIndex == null || activeIndex == 0) _this.RgTags.filtereditems[length - 1].active = true;else _this.RgTags.filtereditems[activeIndex - 1].active = true;
			} else if (e.keyCode == 40) {
				if (activeIndex == null || activeIndex == length - 1) _this.RgTags.filtereditems[0].active = true;else _this.RgTags.filtereditems[activeIndex + 1].active = true;
			} else if (e.keyCode == 13 && activeIndex != null) {
				_this.addTag({
					item: _this.RgTags.filtereditems[activeIndex]
				});
			}
		}
		if (e.keyCode == 13) {
			_this.addTag();
		} else if (e.keyCode == 8 && _this.filterfield.value == '' && _this.RgTags.tags.length > 0) {
			var tag = _this.RgTags.tags.pop();
			_this.filterfield.value = tag.text;
		}
		return true;
	};

	this.toggle = function () {
		_this.filter();
		_this.RgTags.toggle();
	};

	this.filter = function () {
		_this.RgTags.filter(_this.filterfield.value);
	};

	this.addTag = function (e) {
		var tag = {
			text: _this.filterfield.value
		};
		if (e) tag = e.item;
		if (tag.text.length > 0) _this.RgTags.addTag(tag);
		_this.filterfield.value = '';
	};

	this.removeTag = function (e) {
		_this.RgTags.removeTag(e.item);
	};

	this.on('mount', function () {
		_this.RgTags = opts.tags || new rg.Tags(opts);
		_this.RgTags.on('update', function () {
			if (_this.RgTags.isvisible) _this.filter();
			_this.update();
		});
		document.addEventListener('click', handleClickOutside);
		document.addEventListener('focus', handleClickOutside, true);
		_this.filterfield.value = _this.RgTags.value;
		_this.update();
	});

	this.on('unmount', function () {
		document.removeEventListener('click', handleClickOutside);
		document.removeEventListener('focus', handleClickOutside, true);
	});

	this.on('update', function () {
		if (_this.isMounted) {
			var container = _this.root.querySelector('.container');
			var containerWidth = container.getBoundingClientRect().width;
			var tagList = _this.root.querySelector('.tags');
			var tagListWidth = tagList.getBoundingClientRect().width;
			tagList.scrollLeft = Number.MAX_VALUE;

			var fieldContainer = _this.root.querySelector('.field-container');
			fieldContainer.style.width = containerWidth - tagListWidth + 'px';
			_this.root.querySelector('.container').style.height = fieldContainer.getBoundingClientRect().height + 'px';
		}
	});
}, '{ }');

riot.tag2('rg-time', '<rg-select select="{RgTime}"></rg-select>', '', '', function (opts) {
	var _this = this;

	var build = function build() {
		_this.RgTime.options = [];

		for (var i = 0; i < 1440; i++) {
			if (i % _this.RgTime.step == 0) {
				var d = new Date(0);
				d.setHours(_this.RgTime.time.getHours());
				d.setMinutes(_this.RgTime.time.getMinutes());
				d = new Date(d.getTime() + i * 60000);

				if (_this.RgTime.min) {
					if (d.getHours() < _this.RgTime.min[0]) continue;
					if (d.getHours() == _this.RgTime.min[0] && d.getMinutes() < _this.RgTime.min[1]) continue;
				}

				if (_this.RgTime.max) {
					if (d.getHours() > _this.RgTime.max[0]) continue;
					if (d.getHours() == _this.RgTime.max[0] && d.getMinutes() > _this.RgTime.max[1]) continue;
				}
				var t = {
					hours: d.getHours(),
					minutes: d.getMinutes()
				};
				var m = t.minutes;
				if (m < 10) m = '0' + m;
				if (_this.RgTime.ampm) {
					var ampm = 'am';
					var h = t.hours;
					if (h >= 12) {
						ampm = 'pm';
						h = h - 12;
					}
					if (h == 0) h = 12;
					t.text = h + ':' + m + ' ' + ampm;
					t.period = ampm;
				} else {
					var h = t.hours;
					if (h < 10) h = '0' + h;
					t.text = h + ':' + m;
				}
				_this.RgTime.options.push(t);
			}
		}
	};

	this.on('mount', function () {
		_this.RgTime = opts.time || new rg.Time(opts);
		_this.RgTime.on('update', function () {
			build();
			_this.update();
		});
		build();
		_this.update();
	});
}, '{ }');
;(function () {
	window.rg = window.rg || {};
	rg.Select = (function () {
		function RgSelect(opts) {
			_classCallCheck(this, RgSelect);

			riot.observable(this);
			if (!opts) opts = {};
			this._isvisible = opts.isvisible;
			this._autocomplete = opts.autocomplete;
			this._filteron = opts.filteron;
			this._options = opts.options;
			this._hasfilter = opts.hasfilter;
			this._placeholder = opts.placeholder;
			this._filterplaceholder = opts.filterplaceholder;
			this._filtereditems = opts.filtereditems;
		}

		_createClass(RgSelect, [{
			key: 'update',
			value: function update() {
				this.trigger('update');
			}
		}, {
			key: 'open',
			value: function open() {
				if (!this.isvisible) this.trigger('open');
				this.isvisible = true;
			}
		}, {
			key: 'close',
			value: function close() {
				if (this.isvisible) this.trigger('close');
				this.isvisible = false;
			}
		}, {
			key: 'toggle',
			value: function toggle() {
				this.isvisible = !this.isvisible;
				if (this.isvisible) this.trigger('open');else if (!this.isvisible) this.trigger('close');
			}
		}, {
			key: 'filter',
			value: function filter(text) {
				var _this2 = this;

				this.filtereditems = this.options.filter(function (item) {
					item.active = false;
					var f = item[_this2.filteron];
					if (typeof f === 'undefined') return false;
					if (text.length == 0 || f.toString().toLowerCase().indexOf(text.toString().toLowerCase()) > -1) return true;
				});
				this.trigger('filter', text);
			}
		}, {
			key: 'select',
			value: function select(item) {
				this.options.forEach(function (i) {
					return i.selected = false;
				});
				item.selected = true;
				this.isvisible = false;
				if (this.autocomplete) this.filter(item[this.filteron]);
				this.trigger('select', item);
			}
		}, {
			key: 'isvisible',
			get: function get() {
				return this._isvisible == 'true' || this._isvisible === true;
			},
			set: function set(isvisible) {
				this._isvisible = isvisible;
			}
		}, {
			key: 'autocomplete',
			get: function get() {
				return this._autocomplete == 'true' || this._autocomplete === true;
			},
			set: function set(autocomplete) {
				this._autocomplete = autocomplete;
			}
		}, {
			key: 'filteron',
			get: function get() {
				return this._filteron || 'text';
			},
			set: function set(filteron) {
				this._filteron = filteron;
			}
		}, {
			key: 'placeholder',
			get: function get() {
				return this._placeholder;
			},
			set: function set(placeholder) {
				this._placeholder = placeholder;
			}
		}, {
			key: 'filterplaceholder',
			get: function get() {
				return this._filterplaceholder;
			},
			set: function set(filterplaceholder) {
				this._filterplaceholder = filterplaceholder;
			}
		}, {
			key: 'hasfilter',
			get: function get() {
				return this._hasfilter == 'true' || this._hasfilter === true;
			},
			set: function set(hasfilter) {
				this._hasfilter = hasfilter;
			}
		}, {
			key: 'options',
			get: function get() {
				if (Array.isArray(this._options)) return this._options;
				this._options = [];
				return this._options;
			},
			set: function set(options) {
				var _this3 = this;

				if (!Array.isArray(options)) options = [];
				options.forEach(function (item, i) {
					item.id = item.id || (Math.floor(Math.random() * 60466175) + 1679615).toString(36);
					if (item.selected) _this3.select(item);
				});
				this._options = options;
			}
		}, {
			key: 'filtereditems',
			get: function get() {
				if (Array.isArray(this._filtereditems)) return this._filtereditems;
				this._filtereditems = [];
				return this._filtereditems;
			},
			set: function set(filtereditems) {
				this._filtereditems = filtereditems;
			}
		}]);

		return RgSelect;
	})();
})();(function () {
	window.rg = window.rg || {};
	rg.Tags = (function (_rg$Select) {
		_inherits(RgTags, _rg$Select);

		function RgTags(opts) {
			_classCallCheck(this, RgTags);

			_get(Object.getPrototypeOf(RgTags.prototype), 'constructor', this).call(this, opts);
			this._tags = opts.tags;
			this._value = opts.value;
		}

		_createClass(RgTags, [{
			key: 'addTag',
			value: function addTag(tag) {
				tag.id = tag.id || (Math.floor(Math.random() * 60466175) + 1679615).toString(36);
				this.tags.push(tag);
				this.isvisible = false;
				this.trigger('add', this.tags[this.tags.length - 1]);
			}
		}, {
			key: 'removeTag',
			value: function removeTag(tag) {
				this.tags.splice(this.tags.indexOf(tag), 1);
				this.isvisible = false;
				this.trigger('remove', tag);
			}
		}, {
			key: 'value',
			get: function get() {
				return this._value || '';
			},
			set: function set(val) {
				this._value = val;
			}
		}, {
			key: 'tags',
			get: function get() {
				if (Array.isArray(this._tags)) return this._tags;
				this._tags = [];
				return this._tags;
			},
			set: function set(tags) {
				if (!Array.isArray(tags)) tags = [];
				tags.forEach(function (item, i) {
					item.id = item.id || (Math.floor(Math.random() * 60466175) + 1679615).toString(36);
				});
				this._tags = tags;
			}
		}]);

		return RgTags;
	})(rg.Select);
})();(function () {
	window.rg = window.rg || {};
	rg.Time = (function (_rg$Select2) {
		_inherits(RgTime, _rg$Select2);

		function RgTime(opts) {
			_classCallCheck(this, RgTime);

			_get(Object.getPrototypeOf(RgTime.prototype), 'constructor', this).call(this, opts);
			this._min = opts.min;
			this._max = opts.max;
			this._time = opts.time;
			this._step = opts.step;
			this._ampm = opts.ampm;
		}

		_createClass(RgTime, [{
			key: 'min',
			get: function get() {
				if (this._min) return this._min.split(':');
				return this._min;
			},
			set: function set(min) {
				this._min = min;
			}
		}, {
			key: 'max',
			get: function get() {
				if (this._max) return this._max.split(':');
				return this._max;
			},
			set: function set(max) {
				this._max = max;
			}
		}, {
			key: 'time',
			get: function get() {
				if (toString.call(this._time) === '[object Date]') return this._time;
				return new Date();
			},
			set: function set(time) {
				this._time = time;
			}
		}, {
			key: 'step',
			get: function get() {
				return this._step || 1;
			},
			set: function set(step) {
				this._step = step;
			}
		}, {
			key: 'ampm',
			get: function get() {
				return this._ampm == 'true' || this._ampm === true;
			},
			set: function set(ampm) {
				this._ampm = ampm;
			}
		}]);

		return RgTime;
	})(rg.Select);
})();