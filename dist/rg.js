/*
jQuery Credit Card Validator 1.0

Copyright 2012-2015 Pawel Decowski

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software
is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
 */

'use strict';

;(function () {
	'use strict';

	function validateCreditCard(input) {
		var __indexOf = [].indexOf || function (item) {
			for (var i = 0, l = this.length; i < l; i++) {
				if (i in this && this[i] === item) return i;
			}return -1;
		};
		var bind, card, card_type, card_types, get_card_type, is_valid_length, is_valid_luhn, normalize, validate, validate_number, _i, _len, _ref;
		card_types = [{
			name: 'amex',
			icon: 'images/amex.png',
			pattern: /^3[47]/,
			valid_length: [15]
		}, {
			name: 'diners_club',
			icon: 'images/diners_club.png',
			pattern: /^30[0-5]/,
			valid_length: [14]
		}, {
			name: 'diners_club',
			icon: 'images/diners_club.png',
			pattern: /^36/,
			valid_length: [14]
		}, {
			name: 'jcb',
			icon: 'images/jcb.png',
			pattern: /^35(2[89]|[3-8][0-9])/,
			valid_length: [16]
		}, {
			name: 'laser',
			pattern: /^(6304|670[69]|6771)/,
			valid_length: [16, 17, 18, 19]
		}, {
			name: 'visa_electron',
			pattern: /^(4026|417500|4508|4844|491(3|7))/,
			valid_length: [16]
		}, {
			name: 'visa',
			icon: 'images/visa.png',
			pattern: /^4/,
			valid_length: [16]
		}, {
			name: 'mastercard',
			icon: 'images/mastercard.png',
			pattern: /^5[1-5]/,
			valid_length: [16]
		}, {
			name: 'maestro',
			pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
			valid_length: [12, 13, 14, 15, 16, 17, 18, 19]
		}, {
			name: 'discover',
			icon: 'images/discover.png',
			pattern: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,
			valid_length: [16]
		}];

		var options = {};

		if (options.accept == null) {
			options.accept = (function () {
				var _i, _len, _results;
				_results = [];
				for (_i = 0, _len = card_types.length; _i < _len; _i++) {
					card = card_types[_i];
					_results.push(card.name);
				}
				return _results;
			})();
		}
		_ref = options.accept;
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			card_type = _ref[_i];
			if (__indexOf.call((function () {
				var _j, _len1, _results;
				_results = [];
				for (_j = 0, _len1 = card_types.length; _j < _len1; _j++) {
					card = card_types[_j];
					_results.push(card.name);
				}
				return _results;
			})(), card_type) < 0) {
				throw "Credit card type '" + card_type + "' is not supported";
			}
		}

		get_card_type = function (number) {
			var _j, _len1, _ref1;
			_ref1 = (function () {
				var _k, _len1, _ref1, _results;
				_results = [];
				for (_k = 0, _len1 = card_types.length; _k < _len1; _k++) {
					card = card_types[_k];
					if ((_ref1 = card.name, __indexOf.call(options.accept, _ref1) >= 0)) {
						_results.push(card);
					}
				}
				return _results;
			})();
			for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
				card_type = _ref1[_j];
				if (number.match(card_type.pattern)) {
					return card_type;
				}
			}
			return null;
		};

		is_valid_luhn = function (number) {
			var digit, n, sum, _j, _len1, _ref1;
			sum = 0;
			_ref1 = number.split('').reverse();
			for (n = _j = 0, _len1 = _ref1.length; _j < _len1; n = ++_j) {
				digit = _ref1[n];
				digit = +digit;
				if (n % 2) {
					digit *= 2;
					if (digit < 10) {
						sum += digit;
					} else {
						sum += digit - 9;
					}
				} else {
					sum += digit;
				}
			}
			return sum % 10 === 0;
		};

		is_valid_length = function (number, card_type) {
			var _ref1;
			return (_ref1 = number.length, __indexOf.call(card_type.valid_length, _ref1) >= 0);
		};

		validate_number = (function (_this) {
			return function (number) {
				var length_valid, luhn_valid;
				card_type = get_card_type(number);
				luhn_valid = false;
				length_valid = false;
				if (card_type != null) {
					luhn_valid = is_valid_luhn(number);
					length_valid = is_valid_length(number, card_type);
				}
				return {
					card_type: card_type,
					valid: luhn_valid && length_valid,
					luhn_valid: luhn_valid,
					length_valid: length_valid
				};
			};
		})(this);

		normalize = function (number) {
			return number.replace(/[ -]/g, '');
		};

		validate = (function (_this) {
			return function () {
				return validate_number(normalize(input));
			};
		})(this);

		return validate(input);
	};

	riot.mixin('rg.creditcard', {
		creditcard: {
			validate: validateCreditCard
		}
	});

	if (!window.rg) window.rg = {};
	window.rg.creditcard = {
		validate: validateCreditCard
	};
})();
;
(function () {
	var map = {
		initialize: function initialize() {
			map.trigger('initialize');
		}
	};

	riot.observable(map);
	if (!window.rg) window.rg = {};
	window.rg.map = map;
})();
(function () {
	if (!window.rg) window.rg = {};
	rg.isUndefined = function (val) {
		return typeof val === 'undefined';
	};
	rg.isDefined = function (val) {
		return typeof val !== 'undefined';
	};
	rg.isBoolean = function (val) {
		return typeof val === 'boolean';
	};
	rg.isObject = function (val) {
		return val !== null && typeof val === 'object';
	};
	rg.isString = function (val) {
		return typeof val === 'string';
	};
	rg.isNumber = function (val) {
		return typeof val === "number" && !isNaN(val);
	};
	rg.isDate = function (val) {
		return toString.call(val) === '[object Date]';
	};
	rg.isArray = Array.isArray;
	rg.isFunction = function (val) {
		return typeof val === 'function';
	};
	rg.isRegExp = function (val) {
		return toString.call(val) === '[object RegExp]';
	};
	rg.isPromise = function (val) {
		return val && isFunction(val.then);
	};
	rg.toBoolean = function (val) {
		return val == 'true' || val == true;
	};
	rg.toNumber = function (val) {
		val = Number(val);
		return rg.isNumber(val) ? val : 0;
	};
	rg.xhr = function (method, src, onload) {
		var req = new XMLHttpRequest();
		req.onload = function () {
			onload(req.responseText);
		};
		req.open(method, src, true);
		req.send();
	};
})();
riot.tag('rg-alert', '<div each="{ opts.alerts }" class="alert { type } { visible: visible }" onclick="{ onclick }"> <a class="close" aria-label="Close" onclick="{ parent.dismiss }" if="{ dismissable != false }"> <span aria-hidden="true">&times;</span> </a> <div class="body"> { msg } </div> </div>', 'rg-alert, [riot-tag="rg-alert"]{ font-size: 0.9em; position: relative; top: 0; right: 0; left: 0; width: 100%; } rg-alert .alert, [riot-tag="rg-alert"] .alert{ display: none; position: relative; margin-bottom: 15px; } rg-alert .visible, [riot-tag="rg-alert"] .visible{ display: block; } rg-alert .body, [riot-tag="rg-alert"] .body{ padding: 15px 35px 15px 15px; } rg-alert .close, [riot-tag="rg-alert"] .close{ position: absolute; top: 50%; right: 20px; line-height: 12px; margin-top: -6px; font-size: 18px; border: 0; background-color: transparent; color: rgba(0, 0, 0, 0.5); cursor: pointer; outline: none; } rg-alert .danger, [riot-tag="rg-alert"] .danger{ color: #8f1d2e; background-color: #ffced8; } rg-alert .information, [riot-tag="rg-alert"] .information{ color: #31708f; background-color: #d9edf7; } rg-alert .success, [riot-tag="rg-alert"] .success{ color: #2d8f40; background-color: #ccf7d4; } rg-alert .warning, [riot-tag="rg-alert"] .warning{ color: #c06329; background-color: #f7dfd0; }', function (opts) {
	this.on('update', function () {
		var _this = this;

		opts.alerts.forEach(function (alert) {
			if (rg.isUndefined(alert.visible)) {
				alert.visible = true;
			}
			if (!alert.timer && alert.timeout) {
				alert.startTimer = function () {
					alert.timer = window.setTimeout(function () {
						remove(alert);
						_this.update();
					}, rg.toNumber(alert.timeout));
				};
				alert.startTimer();
			}
		});
		this.update();
	});

	this.dismiss = function (e) {
		remove(e.item);
	};

	function remove(alert) {
		alert.visible = false;
		if (rg.isFunction(alert.onclose)) alert.onclose();
		window.clearTimeout(alert.timer);
	}
});

riot.tag('rg-autocomplete', '<div class="container { visible: visible }" riot-style="width: { width }"> <input type="{ opts.type || \'text\' }" class="field" name="textbox" placeholder="{ opts.placeholder }" onkeydown="{ handleKeys }" oninput="{ filterItems }" onfocus="{ filterItems }"> <div class="dropdown { visible: visible }"> <ul class="list"> <li each="{ filteredItems }" onclick="{ parent.select }" class="item { active: active }"> { text } </li> </ul> </div> </div>', 'rg-autocomplete .container, [riot-tag="rg-autocomplete"] .container{ position: relative; display: inline-block; cursor: pointer; } rg-autocomplete .field, [riot-tag="rg-autocomplete"] .field{ width: 100%; padding: 10px; border: 1px solid #D3D3D3; box-sizing: border-box; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 1em; line-height: normal; outline: 0; } rg-autocomplete .dropdown, [riot-tag="rg-autocomplete"] .dropdown{ display: none; position: relative; width: 100%; background-color: white; border: 1px solid #D3D3D3; border-top: 0; box-sizing: border-box; overflow-y: auto; overflow-x: hidden; max-height: 280px; z-index: 1; } rg-autocomplete .dropdown.visible, [riot-tag="rg-autocomplete"] .dropdown.visible{ display: block; } rg-autocomplete .list, [riot-tag="rg-autocomplete"] .list,rg-autocomplete .item, [riot-tag="rg-autocomplete"] .item{ list-style: none; padding: 0; margin: 0; } rg-autocomplete .item, [riot-tag="rg-autocomplete"] .item{ padding: 10px; border-top: 1px solid #E8E8E8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } rg-autocomplete .item:first-child, [riot-tag="rg-autocomplete"] .item:first-child{ border-top: 0; } rg-autocomplete .selected, [riot-tag="rg-autocomplete"] .selected{ font-weight: bold; background-color: #f8f8f8; } rg-autocomplete .item:hover, [riot-tag="rg-autocomplete"] .item:hover{ background-color: #f3f3f3; } rg-autocomplete .item.active, [riot-tag="rg-autocomplete"] .item.active,rg-autocomplete .item:hover.active, [riot-tag="rg-autocomplete"] .item:hover.active{ background-color: #ededed; }', function (opts) {
	var _this = this;

	this.visible = true;
	this.textbox.value = rg.isDefined(opts.value) ? opts.value : '';

	this.filterItems = function () {
		_this.filteredItems = opts.items.filter(function (item) {
			item.active = false;
			if (_this.textbox.value.length == 0 || item.text.toString().toLowerCase().indexOf(_this.textbox.value.toString().toLowerCase()) > -1) {
				return true;
			}
		});
		_this.visible = _this.filteredItems.length > 0;
		if (rg.isFunction(opts.onfilter)) opts.onfilter();
		_this.update();
	};

	this.handleKeys = function (e) {
		var length = _this.filteredItems.length;
		if (length > 0 && [13, 38, 40].indexOf(e.keyCode) > -1) {
			_this.visible = true;
			e.preventDefault();
			// Get the currently selected item
			var activeIndex = null;
			for (var i = 0; i < length; i++) {
				var item = _this.filteredItems[i];
				if (item.active) {
					activeIndex = i;
					break;
				}
			}

			// We're leaving this item
			if (activeIndex != null) _this.filteredItems[activeIndex].active = false;

			if (e.keyCode == 38) {
				// Move the active state to the next item lower down the index
				if (activeIndex == null || activeIndex == 0) _this.filteredItems[length - 1].active = true;else _this.filteredItems[activeIndex - 1].active = true;
			} else if (e.keyCode == 40) {
				// Move the active state to the next item higher up the index
				if (activeIndex == null || activeIndex == length - 1) _this.filteredItems[0].active = true;else _this.filteredItems[activeIndex + 1].active = true;
			} else if (e.keyCode == 13 && activeIndex != null) _this.select({
				item: _this.filteredItems[activeIndex]
			});
		}
		return true;
	};

	this.select = function (item) {
		item = item.item;
		if (rg.isFunction(opts.onselect)) opts.onselect(item);
		_this.textbox.value = item.text;
		_this.visible = false;
	};

	this.closeDropdown = function (e) {
		if (!_this.root.contains(e.target)) {
			if (rg.isFunction(opts.onclose) && _this.visible) opts.onclose();
			_this.visible = false;
			_this.update();
		}
	};

	this.on('mount', function () {
		document.addEventListener('click', _this.closeDropdown);
		document.addEventListener('focus', _this.closeDropdown, true);
		_this.width = _this.textbox.getBoundingClientRect().width + 'px';
		var dd = _this.root.querySelector('.dropdown');
		dd.style.width = _this.width;
		dd.style.position = 'absolute';
		_this.visible = opts.visible;
		_this.update();
	});

	this.on('unmount', function () {
		document.removeEventListener('click', _this.closeDropdown);
		document.removeEventListener('focus', _this.closeDropdown, true);
	});
});

riot.tag('rg-behold', '<div class="container"> <div class="controls"> <input type="range" class="ranger" name="diff" value="0" min="0" max="1" step="0.01" oninput="{ updateDiff }" onchange="{ updateDiff }"> </div> <div class="images"> <div class="image"> <img class="image-2" riot-src="{ opts.image2 }"> </div> <div class="image fallback"> <img class="image-1" riot-src="{ opts.image1 }"> </div> </div> </div>', 'rg-behold .controls, [riot-tag="rg-behold"] .controls{ text-align: center; } rg-behold .ranger, [riot-tag="rg-behold"] .ranger{ width: 90%; max-width: 300px; } rg-behold .images, [riot-tag="rg-behold"] .images{ position: relative; } rg-behold .image, [riot-tag="rg-behold"] .image{ position: absolute; width: 100%; text-align: center; } rg-behold .image img, [riot-tag="rg-behold"] .image img{ max-width: 90%; }', function (opts) {
	var _this2 = this;

	opts.mode = opts.mode || 'fade';

	var image1, image2, fallback;

	this.on('mount', function () {
		image1 = _this2.root.querySelector('.image-1');
		image2 = _this2.root.querySelector('.image-2');
		fallback = typeof image1.style.webkitClipPath == 'undefined';
		if (opts.mode == 'fade') {
			_this2.root.querySelector('.controls').style.direction = 'rtl';
			_this2.diff.value = 1;
		}

		var img1Loaded = undefined,
		    img2Loaded = undefined,
		    img1H = undefined,
		    img2H = undefined;
		var img1 = new Image();
		var img2 = new Image();
		img1.onload = function () {
			img1Loaded = true;
			img1H = this.height;
			calculateMaxHeight();
		};
		img2.onload = function () {
			img2Loaded = true;
			img2H = this.height;
			calculateMaxHeight();
		};
		img1.src = opts.image1;
		img2.src = opts.image2;

		var _this = _this2;
		function calculateMaxHeight() {
			if (img1Loaded && img2Loaded) {
				var container = _this.root.querySelector('.container');
				container.style.height = container.getBoundingClientRect().height + Math.max(img1H, img2H) + 'px';
				_this.updateDiff();
			}
		}
	});

	this.updateDiff = function (e) {
		if (opts.mode == 'fade') {
			image1.style.opacity = _this2.diff.value;
		} else if (opts.mode == 'swipe') {
			if (!fallback) {
				image1.style.clipPath = image1.style.webkitClipPath = 'inset(0 0 0 ' + (image1.clientWidth * _this2.diff.value - 1) + 'px)';
			} else {
				var fallbackImg = _this2.root.querySelector('.fallback');
				fallbackImg.style.clip = 'rect(auto, auto, auto, ' + fallbackImg.clientWidth * _this2.diff.value + 'px)';
			}
		}
	};
});

riot.tag('rg-bubble', '<div class="context"> <div class="bubble { visible: visible }"> { text } </div> <div class="content" onmouseover="{ showBubble }" onmouseout="{ hideBubble }" onclick="{ toggleBubble }"> <yield></yield> </div> </div>', 'rg-bubble .context, [riot-tag="rg-bubble"] .context,rg-bubble .content, [riot-tag="rg-bubble"] .content{ display: inline-block; position: relative; } rg-bubble .bubble, [riot-tag="rg-bubble"] .bubble{ position: absolute; top: -30px; left: 50%; -webkit-transform: translate3d(-50%, 0, 0); transform: translate3d(-50%, 0, 0); padding: 5px 10px; background-color: #000; color: white; text-align: center; font-size: 12px; line-height: 1; white-space: nowrap; opacity: 0; } rg-bubble .visible, [riot-tag="rg-bubble"] .visible{ display: block; opacity: 1; } rg-bubble .bubble:after, [riot-tag="rg-bubble"] .bubble:after{ content: \'\'; position: absolute; display: block; bottom: -10px; left: 50%; -webkit-transform: translate3d(-50%, 0, 0); transform: translate3d(-50%, 0, 0); width: 0; height: 0; border: 5px solid transparent; border-top-color: #000; }', function (opts) {
	var _this = this;

	this.text = opts.text;
	this.visible = false;
	this.showBubble = function () {
		clearTimeout(_this.timer);
		_this.visible = true;
	};
	this.hideBubble = function () {
		_this.timer = setTimeout(function () {
			_this.visible = false;
			_this.update();
		}, 1000);
	};
	this.toggleBubble = function () {
		_this.visible = !_this.visible;
	};
});

riot.tag('rg-code', '<div class="editor"></div>', 'rg-code .editor, [riot-tag="rg-code"] .editor{ position: absolute; top: 0; right: 0; bottom: 0; left: 0; }', function (opts) {
	var _this = this;

	this.on('mount', function () {
		var editor = ace.edit(_this.root.querySelector('.editor'));
		if (opts.theme) editor.setTheme('ace/theme/' + opts.theme);
		if (opts.mode) editor.getSession().setMode('ace/mode/' + opts.mode);
		editor.getSession().setTabSize(opts.tabsize || 2);
		if (opts.softtabs == "true") editor.getSession().setUseSoftTabs(true);
		if (opts.wordwrap == "true") editor.getSession().setUseWrapMode(true);
		if (opts.readonly == "true") editor.setReadOnly(true);
		editor.$blockScrolling = Infinity;

		editor.getSession().on('change', function (e) {
			if (rg.isFunction(opts.onchange) opts.onchange(editor.getValue());
		});

		/* istanbul ignore next */
		if (opts.src) {
			rg.xhr('get', opts.src, function (resp) {
				editor.setValue(resp, -1);
				_this.update();
			});
		} else {
			editor.setValue(opts.code);
		}
	});
});

riot.tag('rg-context-menu-item', '<div class="item { inactive: opts.inactive }" onclick="{ selectItem }"> <yield></yield> </div>', function (opts) {
	var _this = this;

	this.selectItem = function () {
		if (!opts.inactive) {
			if (rg.isFunction(opts.onselect)) opts.onselect(opts);

			_this.parent.opts.menu.opened = false;
			_this.parent.update();
		}
	};
});

riot.tag('rg-context-menu', '<div class="menu { visible: visible }"> <div class="list"> <div each="{ opts.items }" class="item { inactive: inactive }" onclick="{ selectItem }"> <rg-raw if="{ content && !text }" content="{ content }"></rg-raw> <span if="{ text }">{ text }</span> </div> <yield></yield> </div> </div>', 'rg-context-menu .menu, [riot-tag="rg-context-menu"] .menu{ display: none; position: absolute; background-color: white; border: 1px solid #D3D3D3; border-top: 0; text-align: left; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; box-sizing: border-box; z-index: 2; } rg-context-menu .menu.visible, [riot-tag="rg-context-menu"] .menu.visible{ display: block; } rg-context-menu .item, [riot-tag="rg-context-menu"] .item{ cursor: pointer; padding: 10px; border-top: 1px solid #E8E8E8; background-color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } rg-context-menu .item:hover, [riot-tag="rg-context-menu"] .item:hover{ background-color: #f3f3f3; } rg-context-menu .item.inactive, [riot-tag="rg-context-menu"] .item.inactive{ color: #8a8a8a; font-style: italic; } rg-context-menu .item.inactive:hover, [riot-tag="rg-context-menu"] .item.inactive:hover{ background-color: #fff; }', function (opts) {
	var _this = this;

	var handleClickOutside = function handleClickOutside(e) {
		if (!_this.root.contains(e.target)) {
			if (rg.isFunction(opts.onclose) && _this.visible) opts.onclose(e);
			_this.visible = false;
			_this.update();
		}
	};

	var openMenu = function openMenu(e) {
		e.preventDefault();
		if (rg.isFunction(opts.onopen)) opts.onopen(e);
		_this.visible = true;
		_this.update();

		var x = e.pageX;
		var y = e.pageY;
		var dd = _this.root.querySelector('.menu');
		var ddRect = dd.getBoundingClientRect();
		// Handle horizontal boundary
		if (x > window.innerWidth + window.scrollX - ddRect.width) // Its too close to the edge!
			x = window.innerWidth + window.scrollX - ddRect.width;

		dd.style.left = x + 'px';

		// Handle vertical boundary
		if (y > window.innerHeight + window.scrollY - ddRect.height) // Its too close to the edge!
			y = window.innerHeight + window.scrollY - ddRect.height;

		dd.style.top = y + 'px';
		_this.update();
	};

	this.on('mount', function () {
		document.addEventListener('click', handleClickOutside);
		var targets = document.querySelectorAll('[rg-context-menu]');
		for (var i = 0, target; target = targets[i]; i++) {
			if (target.attributes['rg-context-menu'].value == opts.id) target.addEventListener('contextmenu', openMenu);else target.addEventListener('contextmenu', _this.closeMenu);
		}
	});

	this.on('unmount', function () {
		document.removeEventListener('click', handleClickOutside);
		var targets = document.querySelectorAll('[rg-context-menu]');
		for (var i = 0, target; target = targets[i]; i++) {
			if (target.attributes['rg-context-menu'].value == opts.id) target.removeEventListener('contextmenu', openMenu);else target.removeEventListener('contextmenu', _this.closeMenu);
		}
	});

	this.closeMenu = function () {
		_this.visible = false;
		_this.update();
	};

	this.selectItem = function (e) {
		if (!e.item.inactive) {
			if (e.item.onselect) e.item.onselect(e.item);

			_this.visible = false;
		}
	};
});

riot.tag('rg-credit-card', '<input type="text" name="cardNo" class="field card-no { icon } { valid: validationResult.valid == true }" oninput="{ validate }" placeholder="{ opts.placeholder || \'Card no.\' }">', 'rg-credit-card .field, [riot-tag="rg-credit-card"] .field{ font-size: 1em; padding: 10px; border: 1px solid #D3D3D3; box-sizing: border-box; outline: none; } rg-credit-card .card-no, [riot-tag="rg-credit-card"] .card-no{ padding-right: 60px; background-repeat: no-repeat; background-position: right center; background-size: 60px; } rg-credit-card .amex, [riot-tag="rg-credit-card"] .amex{ background-image: url(img/amex.png); } rg-credit-card .diners_club, [riot-tag="rg-credit-card"] .diners_club{ background-image: url(img/diners_club.png); } rg-credit-card .discover, [riot-tag="rg-credit-card"] .discover{ background-image: url(img/discover.png); } rg-credit-card .jcb, [riot-tag="rg-credit-card"] .jcb{ background-image: url(img/jcb.png); } rg-credit-card .mastercard, [riot-tag="rg-credit-card"] .mastercard{ background-image: url(img/mastercard.png); } rg-credit-card .visa, [riot-tag="rg-credit-card"] .visa{ background-image: url(img/visa.png); }', function (opts) {
	var _this = this;

	this.on('mount', function () {
		_this.mixin('rg.creditcard');
		_this.cardNo.value = opts.cardno || '';
		_this.validate();
		_this.update();
	});

	this.validate = function () {
		_this.validationResult = _this.creditcard.validate(_this.cardNo.value);
		_this.icon = _this.validationResult.valid ? _this.validationResult.card_type.name : '';
	};
});

riot.tag('rg-date', '{ opts.months} <div class="container { open: opened }"> <input type="text" class="field" onclick="{ show }" value="{ date.format(opts.format || \'LL\') }" readonly> <div class="calendar" show="{ opened }"> <div class="grid grid-row" if="{ opts.years != \'false\' }"> <div class="selector" onclick="{ prevYear }">&lsaquo;</div> <span class="year">{ date.format(\'YYYY\') }</span> <div class="selector" onclick="{ nextYear }">&rsaquo;</div> </div> <div class="grid grid-row" if="{ opts.years == \'false\' }"> <span class="year fill">{ date.format(\'YYYY\') }</span> </div> <div class="grid grid-row" if="{ opts.months != \'false\' }"> <div class="selector" onclick="{ prevMonth }">&lsaquo;</div> <span class="month">{ date.format(\'MMMM\') }</span> <div class="selector" onclick="{ nextMonth }">&rsaquo;</div> </div> <div class="grid grid-row" if="{ opts.months == \'false\' }"> <span class="month fill">{ date.format(\'MMMM\') }</span> </div> <div class="grid grid-row"> <span class="day-name" each="{ day in dayNames }">{ day }</span> </div> <div class="grid grid-wrap"> <div each="{ day in days }" onclick="{ changeDate }" class="date { in: day.inMonth, selected: day.selected, today: day.today }"> { day.date.format(\'DD\') } </div> </div> <div class="grid grid-row"> <a class="shortcut" onclick="{ setToday }">Today</a> </div> </div> </div>', 'rg-date .container, [riot-tag="rg-date"] .container{ position: relative; display: inline-block; cursor: pointer; } rg-date .field, [riot-tag="rg-date"] .field{ font-size: 1em; padding: 10px; border: 1px solid #D3D3D3; cursor: pointer; box-sizing: border-box; outline: none; } rg-date .calendar, [riot-tag="rg-date"] .calendar{ position: absolute; text-align: center; background-color: white; border: 1px solid #D3D3D3; padding: 5px; width: 330px; margin-top: 10px; left: 50%; -webkit-transform: translateX(-50%); -moz-transform: translateX(-50%); -ms-transform: translateX(-50%); -o-transform: translateX(-50%); transform: translateX(-50%); -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; box-sizing: border-box; z-index: 1; } rg-date .grid, [riot-tag="rg-date"] .grid{ display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-align-items: center; -ms-flex-align: center; align-items: center; } rg-date .grid-wrap, [riot-tag="rg-date"] .grid-wrap{ width: 100%; -webkit-flex-wrap: wrap; -ms-flex-wrap: wrap; flex-wrap: wrap; } rg-date .grid-row, [riot-tag="rg-date"] .grid-row{ height: 35px; } rg-date .selector, [riot-tag="rg-date"] .selector{ font-size: 2em; font-weight: 100; padding: 0; -webkit-flex: 0 0 15%; -ms-flex: 0 0 15%; flex: 0 0 15%; } rg-date .year, [riot-tag="rg-date"] .year,rg-date .month, [riot-tag="rg-date"] .month{ text-transform: uppercase; font-weight: normal; -webkit-flex: 0 0 70%; -ms-flex: 0 0 70%; flex: 0 0 70%; } rg-date .fill, [riot-tag="rg-date"] .fill{ -webkit-flex: 0 0 100%; -ms-flex: 0 0 100%; flex: 0 0 100%; } rg-date .day-name, [riot-tag="rg-date"] .day-name{ font-weight: bold; -webkit-flex: 0 0 14.28%; -ms-flex: 0 0 14.28%; flex: 0 0 14.28%; } rg-date .date, [riot-tag="rg-date"] .date{ -webkit-flex: 0 0 14.28%; -ms-flex: 0 0 14.28%; flex: 0 0 14.28%; padding: 12px 10px; box-sizing: border-box; font-size: 0.8em; font-weight: normal; border: 1px solid transparent; color: #cacaca; } rg-date .date:hover, [riot-tag="rg-date"] .date:hover{ background-color: #f3f3f3; } rg-date .date.in, [riot-tag="rg-date"] .date.in{ color: inherit; } rg-date .today, [riot-tag="rg-date"] .today{ border-color: #ededed; } rg-date .selected, [riot-tag="rg-date"] .selected,rg-date .selected:hover, [riot-tag="rg-date"] .selected:hover{ background-color: #ededed; border-color: #dedede; } rg-date .shortcut, [riot-tag="rg-date"] .shortcut{ -webkit-flex: 0 0 100%; -ms-flex: 0 0 100%; flex: 0 0 100%; color: #6495ed; }', function (opts) {
	var _this = this;

	this.date = moment(opts.date || new Date());

	var handleClickOutside = function handleClickOutside(e) {
		if (!_this.root.contains(e.target) && _this.opened) {
			if (rg.isFunction(opts.onclose) opts.onclose(_this.date);
			_this.opened = false;
			_this.update();
		}
	};

	var buildCalendar = function buildCalendar() {
		var cursor = moment(_this.date);
		var end = moment(cursor);

		// Set cursor to start of the month and start of the week
		cursor.startOf('month');
		cursor.day(0);
		// end of month and end of week
		end.endOf('month');
		end.day(6);

		_this.dayNames = [];
		_this.days = [];

		while (cursor.isBefore(end)) {
			if (_this.dayNames.length < 7) _this.dayNames.push(cursor.format('dd'));

			_this.days.push({
				date: moment(cursor),
				selected: _this.date.isSame(cursor, 'day'),
				today: moment().isSame(cursor, 'day'),
				inMonth: _this.date.isSame(cursor, 'month')
			});

			cursor = cursor.add(1, 'days');
		}
		_this.opts.date = _this.date.toDate();
		_this.update();
	};

	this.on('mount', function () {
		document.addEventListener('click', handleClickOutside);
	});

	this.on('unmount', function () {
		document.removeEventListener('click', handleClickOutside);
	});

	// Handle the clicks on dates
	this.changeDate = function (e) {
		_this.date = e.item.day.date;
		if (rg.isFunction(opts.onselect)) opts.onselect(_this.date);
		buildCalendar();
	};

	// Handle today shortcur
	this.setToday = function () {
		_this.date = opts.date = moment();
		if (rg.isFunction(opts.onselect)) opts.onselect(_this.date);
		buildCalendar();
	};

	// Handle the previous year change
	this.prevYear = function () {
		_this.date.subtract(1, 'year');
		buildCalendar();
	};

	// Handle the next month change
	this.nextYear = function () {
		_this.date.add(1, 'year');
		buildCalendar();
	};

	// Handle the previous month change
	this.prevMonth = function () {
		_this.date.subtract(1, 'month');
		buildCalendar();
	};

	// Handle the next month change
	this.nextMonth = function () {
		_this.date.add(1, 'month');
		buildCalendar();
	};

	// Show/hide the datepicker
	this.show = function () {
		if (rg.isFunction(opts.onopen) opts.onopen();
		buildCalendar();
		_this.opened = true;
	};
});

riot.tag('rg-ga', '', function (opts) {
	/* istanbul ignore next */
	(function (i, s, o, g, r, a, m) {
		i['GoogleAnalyticsObject'] = r;i[r] = i[r] || function () {
			(i[r].q = i[r].q || []).push(arguments);
		}, i[r].l = 1 * new Date();a = s.createElement(o), m = s.getElementsByTagName(o)[0];a.async = 1;a.src = g;m.parentNode.insertBefore(a, m);
	})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

	ga('create', opts.property, 'auto');
	ga('send', 'pageview');
});

riot.tag('rg-include', '{{ responseText }}', function (opts) {
	var _this = this;

	rg.xhr('get', opts.src, function (resp) {
		if (opts.unsafe) _this.root.innerHTML = resp;else _this.responseText = resp;
		_this.update();
	});
});

riot.tag('rg-loading', '<div class="loading { visible: opts.visible }"> <div class="overlay"></div> <div class="content"> <yield></yield> </div> </div>', 'rg-loading .loading, [riot-tag="rg-loading"] .loading{ display: none; } rg-loading .visible, [riot-tag="rg-loading"] .visible{ display: block; } rg-loading .overlay, [riot-tag="rg-loading"] .overlay{ position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.8); z-index: 200; } rg-loading .content, [riot-tag="rg-loading"] .content{ position: absolute; width: 95%; max-width: 420px; top: 50%; left: 50%; -webkit-transform: translate3d(-50%, -50%, 0); -moz-transform: translate3d(-50%, -50%, 0); -ms-transform: translate3d(-50%, -50%, 0); -o-transform: translate3d(-50%, -50%, 0); transform: translate3d(-50%, -50%, 0); background-color: transparent; color: #fff; text-align: center; z-index: 201; }', function (opts) {});

riot.tag('rg-map', '<div class="rg-map"></div>', 'rg-map .rg-map, [riot-tag="rg-map"] .rg-map{ margin: 0; padding: 0; width: 100%; height: 100%; } rg-map .rg-map img, [riot-tag="rg-map"] .rg-map img{ max-width: inherit; }', function (opts) {
	var _this = this;

	var defaultOptions = {
		center: { lat: 53.806, lng: -1.535 },
		zoom: 5
	};
	var mapOptions = opts.map || defaultOptions;

	/* istanbul ignore next */
	rg.map.on('initialize', function () {
		rg.map.obj = new google.maps.Map(_this.root.querySelector('.rg-map'), mapOptions);
	});

	(function () {
		if (!document.getElementById('gmap_script')) {
			var script = document.createElement('script');
			script.setAttribute('id', 'gmap_script');
			script.type = 'text/javascript';
			script.src = 'https://maps.googleapis.com/maps/api/js?sensor=false&callback=rg.map.initialize';
			document.body.appendChild(script);
		}
	})();
});

riot.tag('rg-markdown', '<div class="markdown"></div>', function (opts) {
	var _this = this;

	var reader = new commonmark.Parser();
	var writer = new commonmark.HtmlRenderer();

	var markItDown = function markItDown(content) {
		var parsed = reader.parse(content);
		_this.root.innerHTML = writer.render(parsed);
	};

	/* istanbul ignore next */
	if (opts.src) {
		rg.xhr('get', opts.src, function (resp) {
			markItDown(resp);
			_this.update();
		});
	} else {
		markItDown(opts.content);
	}
});

riot.tag('rg-modal', '<div class="overlay { visible: visible, ghost: ghost, dismissable: dismissable }" onclick="{ close }"></div> <div class="modal { visible: visible, ghost: ghost, dismissable: dismissable }"> <header class="header"> <button if="{ dismissable }" type="button" class="close" aria-label="Close" onclick="{ close }"> <span aria-hidden="true">&times;</span> </button> <h3 class="heading">{ opts.heading }</h3> </header> <div class="body"> <yield></yield> </div> <footer class="footer"> <button class="button" each="{ opts.buttons }" type="button" onclick="{ action }" riot-style="{ style }"> { text } </button> <div class="clear"></div> </footer> </div>', 'rg-modal .overlay, [riot-tag="rg-modal"] .overlay{ display: none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.8); z-index: 50; } rg-modal .overlay.dismissable, [riot-tag="rg-modal"] .overlay.dismissable{ cursor: pointer; } rg-modal .modal, [riot-tag="rg-modal"] .modal{ display: none; position: absolute; width: 95%; max-width: 500px; font-size: 1.1em; top: 50%; left: 50%; -webkit-transform: translate3d(-50%, -50%, 0); -moz-transform: translate3d(-50%, -50%, 0); -ms-transform: translate3d(-50%, -50%, 0); -o-transform: translate3d(-50%, -50%, 0); transform: translate3d(-50%, -50%, 0); background-color: white; color: #252519; z-index: 101; } rg-modal .modal.ghost, [riot-tag="rg-modal"] .modal.ghost{ background-color: transparent; color: white; } rg-modal .visible, [riot-tag="rg-modal"] .visible{ display: block; } rg-modal .header, [riot-tag="rg-modal"] .header{ position: relative; text-align: center; } rg-modal .heading, [riot-tag="rg-modal"] .heading{ padding: 20px 20px 0 20px; margin: 0; font-size: 1.2em; } rg-modal .modal.ghost .heading, [riot-tag="rg-modal"] .modal.ghost .heading{ color: white; } rg-modal .close, [riot-tag="rg-modal"] .close{ position: absolute; top: 5px; right: 5px; padding: 0; height: 25px; width: 25px; line-height: 25px; font-size: 25px; border: 0; background-color: transparent; color: #ef424d; cursor: pointer; outline: none; } rg-modal .modal.ghost .close, [riot-tag="rg-modal"] .modal.ghost .close{ color: white; } rg-modal .body, [riot-tag="rg-modal"] .body{ padding: 20px; } rg-modal .footer, [riot-tag="rg-modal"] .footer{ padding: 0 20px 20px 20px; } rg-modal .button, [riot-tag="rg-modal"] .button{ float: right; padding: 10px; margin: 0 5px 0 0; border: none; font-size: 0.9em; text-transform: uppercase; cursor: pointer; outline: none; background-color: white; } rg-modal .modal.ghost .button, [riot-tag="rg-modal"] .modal.ghost .button{ color: white; background-color: transparent; } rg-modal .clear, [riot-tag="rg-modal"] .clear{ clear: both; }', function (opts) {
	this.on('update', function () {
		this.visible = rg.toBoolean(opts.visible);
		this.ghost = rg.toBoolean(opts.ghost);
		this.dismissable = rg.toBoolean(opts.dismissable);
	});

	this.close = function () {
		opts.visible = false;
		if (rg.isFunction(opts.onclose) opts.onclose();
	};
});

riot.tag('rg-phone-sim', '<div class="emulator"> <iframe class="screen" riot-src="{ opts.src }"></iframe> </div>', 'rg-phone-sim .emulator, [riot-tag="rg-phone-sim"] .emulator{ position: relative; width: 365px; height: 792px; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAW0AAAMYCAMAAAA3r0ZLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRFMDk6+vr6KTM0lJucMz4/PklKJS8wLTg5Qk1OxsjILzo7gomJ2NvbdH5/ho2O9fb2KzY3ztHRPEdIOkVGZWxtjJSVOEJDkpeYWGRluL2+KTQ1vcHBoaWlPUZHcnp6nKKjOkRF1NfXqa2tp62tZnBxanV2VmFiZ29wVl1eaXJzbXR04uTktbq7QElK1tnZipKTi5CRTlZXpKioo6mqXmlqUVlaOEFCSVFSUFxdISssT1tcTlpbJC4vIiwtTVlaJjAxIy0uTFhZS1dYJzEyKDIzSlZXPUhJOURFO0ZHSVVWKzU2P0pLKjQ1OENEND0+QEtMLDY3SFRVN0JDQ05PLTc4ND9ANUBBQUxNNkFCR1NUMTo7RE9QLjg5N0BBR1JTRlJTLzk6RVFSMjs8RVBRRlFSNj9AMzw9SFNUMj0+IissMTs8MDo7SVRVRFBRMDs8MTw9IiwsMz0+Mjw9SlVWQ09QLjk6NT4/S1ZXND4/JC4uQU1OIy0tQk5PTFdYTVhZQExNTllaJS8vJzIyP0tMLzg5LDc4KDMzNT9AKjU1N0FCNkBBJjAwIywtMDs7Mj09NkFBJjExLjk5LDc3N0JCNUBAKjU2MTw8LDU2Ljc4OUNEKDEyQU1NPEhIPEhJO0dHOkZGND8/Qk5ORFBQQ09PLTY3OUREPkpKPkpLPUlJT1pbP0tLJTAwPUlKJzAxKjM07u/vKTIzsbW2YGprtLm50tXWPkhJo6endn+A3d/f6uvreoOEg4yN2tvc/Pz8n6am8/T0VFtcm6CgJS4v4OLi5ufnYGdncnt8dHp7gYaHJC0uu8DAjJGRQkxNxMfHKzQ1YGtsS1NUaXN0bnh5yMzMyszMy83Oy8/PdoCAKDIy7O3tT1dYuLu70NTUbXd46Onq6erreoCA2dzc8PHx8vPz5OXlnaSkn6Wmqq6ucHZ2t7y8o6eoeoSEkJaWm5+gW2ZnZG5vqa+wOEFB09bWtru7qrCwcXd4t7u83eDgzM7O7/DwNT4+7e7uwMPDwcPEeH5/////70wnUQAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAA+NSURBVHja7N13nBTlGcDxEQI5AmJQBAkcnqhEDIhoWMt5iogmQbOaYNrqYrJh16gplmTVkILJpYCmF+DSE1JIcjRR7L333ntPYjQxvTl55tnr7N7t7uw+vDP3+/0x3G3hs5+vr++8M7s7eH75Xb5x+rOjN017aeq+tO++U1+atmn0s9M3Xl6BoFfm466ZOPROhIt259CJ19RS++7LdgW133a97O7aaI/a+VE0y+jRnUeF1p6wqfvvaz6+YVjT0jMyJ3rkeSdmzljaNKzh+OZuoE0TQmmvv67zLzrwmMY8wkXLNx5zYCfTdeur1p6wdeegblgKar8tbegc4lv/rirtjTMLT99/UVMKzgFLNS3avwA2c2Pl2n8tPHV1QxLJMks2rC6g/alC7ScvKozrhhyIFZRrKIzvi56sRHt94b/RIsZ1xeN7UYFuffna4/UJB68Er4rGHax648vUfmqkPnxBBrmqyixQv5FPlaP9Dz2eWdIEW9U1LdFjnQsG1n5ETz4dyowdavY+VE9XPTKQ9phddPfICjvk6lt3lruM6V97j132l26BK3S3BJAv79Gf9jN3BY85HKsadHhAedebSmtf+ofgEcOQqknDAsyLLi2pPTq4/0icatSRAefoUto7Bvc2oFSzGgLQHYtr3xTct5DVSA1XJgsD0puKaa99s9wzlwPImh5WzhXTl/5TRHt7uaN5GUI1bVmzqL64ufZfgkF/GD417rCA9e99tf8VzCPHoVPzjhPXaVv10d5bblzCyZE6nDIJ5pKde2u/Egz487Cp1zHlHr20h8otp50ETT2WgaeL7dCe2vcF/uOQqUsrA9z7emgHQ3thdEZLLpeL0kHYwq7BrdqjAv2ofEAnlU0EZaPjvTTgHdWlvXeEhnYu0VkuUoN7707tbW6X35oiciyc6C4yZxmaxPf2bTq0z5VfTo/IC8/20M5GZnAHy5JzO7Tvj85bCKlEzyIzdQdvLNxf0L4wmMQjMgnmemlHZubOBcQXqvb0CO0jk720o3OmIdhPTlft4FTrth5ju55tK8bbq/YG+emUiLzqTC/t6Lz1cYoYbwi0r47QisTz0j2w0xE6ngxWJVeLdrD+WxCZVx3J9ba0QNeAnj9T/twuOi87GcF9pLSdKM8U7Q2rV6+O0jcQMoXJJB2t96tzorzB99Y2NzfPjdQL9zLJZDJynw2YK85rvZ1ku9Cjuq+4xXknb4Js+XxU/WsQ5wnec7LlDcn6d544P+ddLFu+zlT/Vorzxd5k2fIJqfq3TJwney/Lls+RGBwniPPL3g6y5aOWBstWcd7BmypbLjhS/1LiPNWTTTMWBik02mijTWijTWijjTbFVTuZTqSTRW8OUzqJdpGyxT89mU2ELYv25kO4+LvnyUT4kmj3LV38YzjpGmin3dReIm2pF9BlU+LmMDmnrdBbUntQje0trj2o5m2FPlBiTWKQQm9R7cG03nZAexCFNtpoE9poE9poo01oo01oo01oo4021VT7MxIUBik02mijTeG1D5agMEih0UYbbUIbbUIbbbQJbbQJbbQJbbTRplppf1qCwiCFRhtttCm89lwJCoMUGm200Sa00Sa00Uab0Eab0Eab0EY73tqnS1AYpNBoo402hdc+VILCIIVGG220CW20CW200Sa00Sa00aYC9GkSFAYpNNpoo01oR0v7bRIUBik02mijTWijTWijjTahjTah7bL2hyUoDFJotNFGm9BGm0ppv0OCwiCFRhtttAlttAlttNEmtOOhfbwEhUEKjTbaaBPaaBPaLmi/T4LCIIVGG220CW20CW200ab6aS+UoDBIodFGG21CG21C2wXt4yQoDFJotNFGm9BGm9BGe7BpL5KgMEih0UYbbUIbbULbBe0PSFAYpNBoo402oY02oY32YNP+oASFQQqNNtpoE9poE9poDzbtj0hQGKTQaKONNqGNNpXS/qkEhUEKfYwEhUEKjTbaaBPaaBPaaA827Y9LUBik0GijjTahHS3tn0lQGKTQCyQoDFJotNFGm9BGm9BGG22qn/anJCgMUmi00Uabwmv/RILCIIVukKAwSKHRRhttQhttQhtttKl+2p+UoDBIodFGG20Kr/09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\'); background-repeat: no-repeat; background-position: center; background-size: cover; } rg-phone-sim .screen, [riot-tag="rg-phone-sim"] .screen{ position: absolute; top: 105px; left: 22px; background-color: white; width: 320px; height: 568px; border: 0; }', function (opts) {});

riot.tag('rg-placeholdit', '<img riot-src="https://placeholdit.imgix.net/~text?bg={ background }&txtclr={ color }&txt={ text }&txtsize={ textSize }&w={ width }&h={ height }&fm={ format }">', function (opts) {
	this.width = opts.width || 450;
	this.height = opts.height || 250;
	this.background = opts['background-color'] || 'f01e52';
	this.color = opts.color || 'fff';
	this.text = opts.text || this.width + ' x ' + this.height;
	this.textSize = opts['font-size'] || '30';
	this.format = opts.format || 'png';
});

riot.tag('rg-raw', '<span></span>', function (opts) {
	this.on('mount', function () {
		this.root.innerHTML = opts.content;
	});
});

riot.tag('rg-select', '<div class="container { visible: visible }" riot-style="width: { width }"> <input if="{ !autocomplete }" type="text" class="field { visible: visible }" value="{ fieldText }" placeholder="{ opts.placeholder }" onkeydown="{ handleKeys }" onclick="{ toggle }" readonly> <input if="{ autocomplete }" type="text" class="field { visible: visible }" value="{ fieldText }" placeholder="{ opts.placeholder }" onkeydown="{ handleKeys }" onclick="{ toggle }" oninput="{ filterItems }"> <div class="dropdown { visible: visible }"> <div class="filter" if="{ filter }"> <input type="text" name="filterfield" class="filter-box" placeholder="{ opts[\'filter-placeholder\'] || \'Filter\' }" onkeydown="{ handleKeys }" oninput="{ filterItems }"> </div> <div class="list"> <ul> <li each="{ filteredItems }" onclick="{ parent.select }" class="item { selected: selected, disabled: disabled, active: active }"> { text } </li> </ul> </div> </div> </div>', 'rg-select .container, [riot-tag="rg-select"] .container{ position: relative; display: inline-block; cursor: pointer; } rg-select .field, [riot-tag="rg-select"] .field{ width: 100%; padding: 10px; border: 1px solid #D3D3D3; box-sizing: border-box; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 1em; line-height: normal; outline: 0; } rg-select .dropdown, [riot-tag="rg-select"] .dropdown{ display: none; position: relative; width: 100%; background-color: white; border: 1px solid #D3D3D3; border-top: 0; box-sizing: border-box; overflow-y: auto; overflow-x: hidden; max-height: 280px; } rg-select .dropdown.visible, [riot-tag="rg-select"] .dropdown.visible{ display: block; } rg-select .filter-box, [riot-tag="rg-select"] .filter-box{ width: 100%; padding: 10px; font-size: 0.9rem; border: 0; border-bottom: 1px solid #E8E8E8; outline: none; color: #555; box-sizing: border-box; } rg-select ul, [riot-tag="rg-select"] ul,rg-select li, [riot-tag="rg-select"] li{ list-style: none; padding: 0; margin: 0; } rg-select li, [riot-tag="rg-select"] li{ padding: 10px; border-top: 1px solid #E8E8E8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } rg-select li:first-child, [riot-tag="rg-select"] li:first-child{ border-top: 0; } rg-select .selected, [riot-tag="rg-select"] .selected{ font-weight: bold; background-color: #f8f8f8; } rg-select li:hover, [riot-tag="rg-select"] li:hover{ background-color: #f3f3f3; } rg-select li.active, [riot-tag="rg-select"] li.active,rg-select li:hover.active, [riot-tag="rg-select"] li:hover.active{ background-color: #ededed; }', function (opts) {
	var _this = this;

	this.visible = true;

	/* istanbul ignore next */
	var handleClickOutside = function handleClickOutside(e) {
		if (!_this.root.contains(e.target)) {
			if (rg.isFunction(opts.onclose) && _this.visible) opts.onclose();
			_this.visible = false;
			_this.update();
		}
	};

	this.handleKeys = function (e) {
		if ([13, 38, 40].indexOf(e.keyCode) > -1 && !_this.visible) {
			_this.toggle();
			return true;
		}
		var length = _this.filteredItems.length;
		if (length > 0 && [13, 38, 40].indexOf(e.keyCode) > -1) {
			e.preventDefault();
			// Get the currently selected item
			var activeIndex = null;
			for (var i = 0; i < length; i++) {
				var item = _this.filteredItems[i];
				if (item.active) {
					activeIndex = i;
					break;
				}
			}

			// We're leaving this item
			if (activeIndex != null) _this.filteredItems[activeIndex].active = false;

			if (e.keyCode == 38) {
				// Move the active state to the next item lower down the index
				if (activeIndex == null || activeIndex == 0) _this.filteredItems[length - 1].active = true;else _this.filteredItems[activeIndex - 1].active = true;
			} else if (e.keyCode == 40) {
				// Move the active state to the next item higher up the index
				if (activeIndex == null || activeIndex == length - 1) _this.filteredItems[0].active = true;else _this.filteredItems[activeIndex + 1].active = true;
			} else if (e.keyCode == 13 && activeIndex != null) {
				_this.select({ item: _this.filteredItems[activeIndex] });
			}
		}
		return true;
	};

	this.toggle = function () {
		_this.visible = !_this.visible;
		if (rg.isFunction(opts.onopen) && _this.visible) opts.onopen();else if (rg.isFunction(opts.onclose) && !_this.visible) opts.onclose();
	};

	this.filterItems = function () {
		_this.filteredItems = opts.options.filter(function (item) {
			item.active = false;
			var filterField = item[opts['filter-on'] || 'text'];
			var filterInput = _this.filterfield.value;
			if (_this.autocomplete) filterInput = _this.autocompletefield.value;
			if (filterInput.length == 0 || filterField.toString().toLowerCase().indexOf(filterInput.toString().toLowerCase()) > -1) return true;
		});
		if (rg.isFunction(opts.onfilter)) opts.onfilter();
		_this.update();
	};

	this.select = function (item) {
		item = item.item;
		opts.options.forEach(function (i) {
			return i.selected = false;
		});
		item.selected = true;
		if (rg.isFunction(opts.onselect)) opts.onselect(item);
		_this.fieldText = item.text;
		_this.visible = false;
	};

	this.on('mount', function () {
		// Filter items
		_this.filterItems();

		// Give each dropdown item an index and select one if applicable
		opts.options.forEach(function (item, i) {
			item.index = i;
			if (item.selected) _this.select({ item: item });
		});

		// Setup listeners and style component given content
		document.addEventListener('click', handleClickOutside);
		var dd = _this.root.querySelector('.dropdown');
		_this.width = dd.getBoundingClientRect().width + 20 + 'px';
		dd.style.position = 'absolute';

		_this.autocomplete = rg.toBoolean(opts.autocomplete);
		_this.visible = rg.toBoolean(opts.visible);
		_this.filter = rg.toBoolean(opts.filter);
		_this.fieldText = opts.value;

		_this.update();
	});

	this.on('unmount', function () {
		return document.removeEventListener('click', handleClickOutside);
	});
});

riot.tag('rg-sidemenu', '<div class="overlay { visible: visible }" onclick="{ close }"></div> <div class="sidemenu { visible: visible }"> <h4 class="header">{ opts.header }</h4> <ul class="items"> <li class="item { active: active }" each="{ opts.items }" onclick="{ selected }"> { text } </li> </ul> <div class="body"> <yield></yield> </div> </div>', 'rg-sidemenu .overlay, [riot-tag="rg-sidemenu"] .overlay{ display: none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.8); cursor: pointer; z-index: 50; } rg-sidemenu .overlay.visible, [riot-tag="rg-sidemenu"] .overlay.visible{ display: block; } rg-sidemenu .sidemenu, [riot-tag="rg-sidemenu"] .sidemenu{ position: absolute; top: 0; left: 0; height: 100%; width: 260px; overflow-y: auto; overflow-x: hidden; -webkit-overflow-scrolling: touch; background-color: black; color: white; -webkit-transform: translate3d(-100%, 0, 0); -moz-transform: translate3d(-100%, 0, 0); -ms-transform: translate3d(-100%, 0, 0); -o-transform: translate3d(-100%, 0, 0); transform: translate3d(-100%, 0, 0); transition: transform 0.5s ease; z-index: 51; } rg-sidemenu .sidemenu.visible, [riot-tag="rg-sidemenu"] .sidemenu.visible{ -webkit-transform: translate3d(0, 0, 0); -moz-transform: translate3d(0, 0, 0); -ms-transform: translate3d(0, 0, 0); -o-transform: translate3d(0, 0, 0); transform: translate3d(0, 0, 0); } rg-sidemenu .header, [riot-tag="rg-sidemenu"] .header{ padding: 1.2rem; margin: 0; text-align: center; color: white; } rg-sidemenu .items, [riot-tag="rg-sidemenu"] .items{ padding: 0; margin: 0; list-style: none; } rg-sidemenu .item, [riot-tag="rg-sidemenu"] .item{ padding: 1rem 0.5rem; box-sizing: border-box; border-top: 1px solid #1a1a1a; color: white; } rg-sidemenu .item:last-child, [riot-tag="rg-sidemenu"] .item:last-child{ border-bottom: 1px solid #1a1a1a; } rg-sidemenu .item:hover, [riot-tag="rg-sidemenu"] .item:hover{ cursor: pointer; background-color: #2a2a2a; } rg-sidemenu .item.active, [riot-tag="rg-sidemenu"] .item.active{ cursor: pointer; background-color: #444; }', function (opts) {
	this.on('update', function () {
		this.visible = rg.toBoolean(opts.visible);
	});

	this.close = function () {
		return opts.visible = false;
	};

	this.selected = function (item) {
		item = item.item;
		opts.items.forEach(function (item) {
			return item.active = false;
		});
		item.active = true;
		if (item.action) item.action(item);
	};
});

riot.tag('rg-tab-heading', '<yield></yield>', 'rg-tab-heading, [riot-tag="rg-tab-heading"]{ display: none; }', function (opts) {});

riot.tag('rg-tab', '<div class="tab { active: active }"> <yield></yield> </div>', '.tab { display: none; padding: 10px; } .tab.active { display: block; }', function (opts) {
	this.active = opts.active == 'true';
	this.disabled = opts.disabled == 'true';
});

riot.tag('rg-tabs', '<div class="tabs"> <div class="headers"> <div each="{ tab in tabs }" class="header { active: tab.active, disabled: tab.disabled }" onclick="{ activate }"> <h4 class="heading" if="{ tab.opts.heading && !tab.heading }">{ tab.opts.heading }</h4> <div class="heading" if="{ tab.heading }"> <rg-raw content="{ tab.heading }"></rg-raw> </div> </div> </div> <yield></yield> </div>', 'rg-tabs .tabs, [riot-tag="rg-tabs"] .tabs{ background-color: white; } rg-tabs .headers, [riot-tag="rg-tabs"] .headers{ display: -webkit-flex; display: -ms-flexbox; display: flex; } rg-tabs .header, [riot-tag="rg-tabs"] .header{ -webkit-flex: 1; -ms-flex: 1; flex: 1; box-sizing: border-box; text-align: center; cursor: pointer; box-shadow: 0 -1px 0 0 #000 inset; } rg-tabs .heading, [riot-tag="rg-tabs"] .heading{ padding: 10px; margin: 0; } rg-tabs .header.active, [riot-tag="rg-tabs"] .header.active{ background-color: #000; } rg-tabs .header.active .heading, [riot-tag="rg-tabs"] .header.active .heading{ color: white; } rg-tabs .header.disabled .heading, [riot-tag="rg-tabs"] .header.disabled .heading{ color: #888; }', function (opts) {
	var _this = this;

	this.onopen = opts.onopen;
	this.tabs = this.tags['rg-tab'];
	var deselectTabs = function deselectTabs() {
		return _this.tabs.forEach(function (tab) {
			return tab.active = false;
		});
	};

	// If more than one tab set to active honor the first one
	this.on('mount', function () {
		var activeTab = false;
		_this.tabs.forEach(function (tab, i) {
			// Give each tab an index
			tab.index = i;

			var tabHeading = tab.tags['rg-tab-heading'];
			if (tabHeading) {
				/* istanbul ignore next */
				if (Object.prototype.toString.call(tabHeading) !== '[object Array]') tab.heading = tabHeading.root.innerHTML;
			}

			if (activeTab) tab.active = false;
			if (tab.active) activeTab = true;
		});
		_this.update();
	});

	// Deactivate all tabs and active selected one
	this.activate = function (e) {
		var tab = e.item.tab;
		if (!tab.disabled) {
			deselectTabs();
			if (_this.onopen) _this.onopen(tab);
			tab.active = true;
		}
	};
});

riot.tag('rg-tags', '<div class="container"> <span class="tags"> <span class="tag" each="{ opts.tags }" onclick="{ parent.removeTag }"> { text } <span class="close">&times;</span> </span> </span> <div class="field-container { visible: visible }"> <input type="{ opts.type || \'text\' }" class="field" name="textbox" placeholder="{ opts.placeholder }" onkeydown="{ handleKeys }" oninput="{ filterItems }" onfocus="{ filterItems }"> <div class="dropdown { visible: visible }"> <div class="list"> <ul> <li each="{ filteredItems }" onclick="{ parent.select }" class="item { active: active }"> { text } </li> </ul> </div> </div> </div> </div>', 'rg-tags .container, [riot-tag="rg-tags"] .container{ position: relative; width: 100%; border: 1px solid #D3D3D3; background-color: white; text-align: left; padding: 0; box-sizing: border-box; } rg-tags .field-container, [riot-tag="rg-tags"] .field-container{ position: absolute; display: inline-block; cursor: pointer; } rg-tags .field, [riot-tag="rg-tags"] .field{ width: 100%; padding: 10px; border: 0; box-sizing: border-box; background-color: transparent; white-space: nowrap; font-size: 1em; line-height: normal; outline: 0; } rg-tags .dropdown, [riot-tag="rg-tags"] .dropdown{ display: none; position: absolute; width: 100%; background-color: white; border: 1px solid #D3D3D3; box-sizing: border-box; overflow-y: auto; overflow-x: hidden; max-height: 280px; } rg-tags .dropdown.visible, [riot-tag="rg-tags"] .dropdown.visible{ display: block; } rg-tags ul, [riot-tag="rg-tags"] ul,rg-tags li, [riot-tag="rg-tags"] li{ list-style: none; padding: 0; margin: 0; } rg-tags li, [riot-tag="rg-tags"] li{ padding: 10px; border-top: 1px solid #E8E8E8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } rg-tags li:hover, [riot-tag="rg-tags"] li:hover{ background-color: #f3f3f3; } rg-tags li.active, [riot-tag="rg-tags"] li.active,rg-tags li:hover.active, [riot-tag="rg-tags"] li:hover.active{ background-color: #ededed; } rg-tags .tags, [riot-tag="rg-tags"] .tags{ display: inline-block; max-width: 70%; white-space: nowrap; overflow-y: hidden; overflow-x: auto; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } rg-tags .tag, [riot-tag="rg-tags"] .tag{ position: relative; display: inline-block; padding: 8px 20px 8px 5px; margin: 1px; background-color: #000; color: #fff; cursor: pointer; } rg-tags .tag:hover, [riot-tag="rg-tags"] .tag:hover,rg-tags .tag:active, [riot-tag="rg-tags"] .tag:active{ background-color: #666; } rg-tags .close, [riot-tag="rg-tags"] .close{ position: absolute; right: 5px; top: 7px; color: rgba(255, 255, 255, 0.7); }', function (opts) {
	var _this = this;

	this.visible = false;
	this.textbox.value = opts.value || '';
	opts.options = opts.options || [];
	opts.tags = opts.tags || [];
	opts.tags.forEach(function (tag, i) {
		return tag.index = i;
	});

	this.filterItems = function () {
		_this.filteredItems = opts.options.filter(function (item) {
			item.active = false;
			if (_this.textbox.value.length == 0 || item.text.toString().toLowerCase().indexOf(_this.textbox.value.toString().toLowerCase()) > -1) return true;
		});
		_this.visible = _this.filteredItems.length > 0;
		if (rg.isFunction(opts.onfilter) opts.onfilter();
		_this.update();
	};

	this.handleKeys = function (e) {
		var length = _this.filteredItems.length;
		if (length > 0 && [13, 38, 40].indexOf(e.keyCode) > -1) {
			_this.visible = true;
			e.preventDefault();
			// Get the currently selected item
			var activeIndex = null;
			for (var i = 0; i < length; i++) {
				var item = _this.filteredItems[i];
				if (item.active) {
					activeIndex = i;
					break;
				}
			}

			// We're leaving this item
			if (activeIndex != null) _this.filteredItems[activeIndex].active = false;

			if (e.keyCode == 38) {
				// Move the active state to the next item lower down the index
				if (activeIndex == null || activeIndex == 0) _this.filteredItems[length - 1].active = true;else _this.filteredItems[activeIndex - 1].active = true;
			} else if (e.keyCode == 40) {
				// Move the active state to the next item higher up the index
				if (activeIndex == null || activeIndex == length - 1) _this.filteredItems[0].active = true;else _this.filteredItems[activeIndex + 1].active = true;
			} else if (e.keyCode == 13 && activeIndex != null) {
				_this.select({ item: _this.filteredItems[activeIndex] });
			}
		}
		if (e.keyCode == 13) {
			_this.addTag();
		} else if (e.keyCode == 8 && _this.textbox.value == '' && opts.tags.length > 0) {
			var tag = opts.tags.pop();
			_this.textbox.value = tag.text;
		}
		return true;
	};

	this.addTag = function (item) {
		var tag = item || { text: _this.textbox.value };
		if (tag.text.length > 0) {
			tag.index = opts.tags.length;
			opts.tags.push(tag);
			_this.textbox.value = '';
			_this.filteredItems = opts.options;
			_this.visible = false;
		}
		_this.update();
	};

	this.removeTag = function (e) {
		opts.tags.splice(opts.tags.indexOf(e.item), 1);
		_this.visible = false;
	};

	this.select = function (item) {
		item = item.item;
		if (rg.isFunction(opts.onselect)) opts.onselect(item);
		_this.addTag(item);
	};

	this.closeDropdown = function (e) {
		if (!_this.root.contains(e.target)) {
			if (rg.isFunction(opts.onclose && _this.visible) opts.onclose();
			_this.visible = false;
			_this.update();
		}
	};

	this.on('mount', function () {
		document.addEventListener('click', _this.closeDropdown);
		document.addEventListener('focus', _this.closeDropdown, true);
		_this.visible = opts.visible;
		_this.update();
	});

	this.on('unmount', function () {
		document.removeEventListener('click', _this.closeDropdown);
		document.removeEventListener('focus', _this.closeDropdown, true);
	});

	this.on('update', function () {
		var container = _this.root.querySelector('.container');
		if (container) {
			var containerWidth = container.getBoundingClientRect().width;
			var tagList = _this.root.querySelector('.tags');
			var tagListWidth = tagList.getBoundingClientRect().width;
			tagList.scrollLeft = Number.MAX_VALUE;

			var fieldContainer = _this.root.querySelector('.field-container');
			fieldContainer.style.width = containerWidth - tagListWidth + 'px';
			_this.root.querySelector('.container').style.height = fieldContainer.getBoundingClientRect().height + 'px';
		}
	});
});

riot.tag('rg-time', '<rg-select placeholder="{ opts.placeholder || \'Select a time\' }" filter-placeholder="Filter times" options="{ times }" onopen="{ opts.onopen }" onclose="{ opts.onclose }" onselect="{ opts.onselect }"> </rg-select>', function (opts) {
	opts.time = opts.time || 'now';
	if (opts.time == 'now') opts.time = new Date();
	if (opts.min) opts.min = opts.min.split(':');
	if (opts.max) opts.max = opts.max.split(':');
	var step = parseInt(opts.step) || 1;
	this.times = [];

	for (var i = 0; i < 1440; i++) {
		if (i % step == 0) {
			var d = new Date(0);
			d.setHours(opts.time.getHours());
			d.setMinutes(opts.time.getMinutes());
			d = new Date(d.getTime() + i * 60000);
			// Check min range
			if (opts.min) {
				if (d.getHours() < opts.min[0]) continue;
				if (d.getHours() == opts.min[0] && d.getMinutes() < opts.min[1]) continue;
			}
			// Check max range
			if (opts.max) {
				if (d.getHours() > opts.max[0]) continue;
				if (d.getHours() == opts.max[0] && d.getMinutes() > opts.max[1]) continue;
			}
			var t = {
				hours: d.getHours(),
				minutes: d.getMinutes()
			};
			var m = t.minutes;
			if (m < 10) m = '0' + m;
			if (opts.ampm) {
				// 12h
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
				// 24h
				var h = t.hours;
				if (h < 10) h = '0' + h;
				t.text = h + ':' + m;
			}
			this.times.push(t);
		}
	}
});

riot.tag('rg-toast', '<div class="toasts { opts.position } { active: active }"> <div each="{ opts.toasts }" class="toast { visible: visible }" onclick="{ parent.toastClicked }"> { text } </div> </div>', 'rg-toast .toasts, [riot-tag="rg-toast"] .toasts{ display: none; position: absolute; width: 250px; max-height: 100%; overflow-y: auto; background-color: transparent; z-index: 101; } rg-toast .toasts.active, [riot-tag="rg-toast"] .toasts.active{ display: block; } rg-toast .toasts.topleft, [riot-tag="rg-toast"] .toasts.topleft{ top: 0; left: 0; } rg-toast .toasts.topright, [riot-tag="rg-toast"] .toasts.topright{ top: 0; right: 0; } rg-toast .toasts.bottomleft, [riot-tag="rg-toast"] .toasts.bottomleft{ bottom: 0; left: 0; } rg-toast .toasts.bottomright, [riot-tag="rg-toast"] .toasts.bottomright{ bottom: 0; right: 0; } rg-toast .toast, [riot-tag="rg-toast"] .toast{ display: none; padding: 20px; margin: 20px; background-color: #000; color: white; font-size: 13px; cursor: pointer; } rg-toast .toast.visible, [riot-tag="rg-toast"] .toast.visible{ display: block; }', function (opts) {
	var _this = this;

	if (!opts.position) opts.position = 'topright';

	this.toastClicked = function (e) {
		var toast = e.item;
		if (rg.isFunction(toast.onclick)) toast.onclick();
		if (rg.isFunction(toast.onclose)) toast.onclose();
		window.clearTimeout(toast.timer);
		toast.visible = false;
	};

	this.on('update', function () {
		opts.toasts.forEach(function (toast) {
			if (rg.isUndefined(toast.visible)) toast.visible = true;
			toast.id = Math.random().toString(36).substr(2, 8);
			if (!toast.timer && !toast.sticky) {
				toast.startTimer = function () {
					toast.timer = window.setTimeout(function () {
						toast.visible = false;
						if (rg.isFunction(toast.onclose)) toast.onclose();
						_this.update();
					}, rg.toNumber(toast.timeout));
				};
				toast.startTimer();
			}
		});

		_this.active = opts.toasts.filter(function (toast) {
			return toast.visible;
		}).length;
	});
});

riot.tag('rg-toggle', '<div class="wrapper"> <label class="toggle"> <input type="checkbox" __checked="{ opts.checked }" onclick="{ toggle }"> <div class="track"> <div class="handle"></div> </div> </label> </div>', 'rg-toggle .wrapper, [riot-tag="rg-toggle"] .wrapper{ width: 60px; height: 20px; margin: 0; display: inline-block; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } rg-toggle .toggle, [riot-tag="rg-toggle"] .toggle{ position: absolute; cursor: pointer; } rg-toggle input[type=checkbox], [riot-tag="rg-toggle"] input[type=checkbox]{ display: none; } rg-toggle .track, [riot-tag="rg-toggle"] .track{ position: absolute; top: 0; bottom: 0; left: 0; right: 0; width: 60px; height: 20px; padding: 2px; background-color: #b6c0c7; transition: background-color 0.1s linear; box-sizing: border-box; } rg-toggle input[type=checkbox]:checked + .track, [riot-tag="rg-toggle"] input[type=checkbox]:checked + .track{ background-color: #000; } rg-toggle .handle, [riot-tag="rg-toggle"] .handle{ position: relative; left: 0; width: 50%; height: 100%; background-color: white; transition: transform 0.1s linear; } rg-toggle input[type=checkbox]:checked + .track .handle, [riot-tag="rg-toggle"] input[type=checkbox]:checked + .track .handle{ -webkit-transform: translate3d(100%, 0, 0); transform: translate3d(100%, 0, 0); }', function (opts) {
	this.on('mount', function () {
		opts.checked = rg.toBoolean(opts.checked);
	});

	this.toggle = function (e) {
		opts.checked = !opts.checked;
		if (rg.isFunction(opts.ontoggle) opts.ontoggle(e);
	};
});

riot.tag('rg-unsplash', '<img riot-src="https://unsplash.it/{ grayscale }{ width }/{ height }/?{ options }">', function (opts) {
	this.width = opts.width || 450;
	this.height = opts.height || 250;
	this.options = '';
	if (rg.toBoolean(opts.greyscale) || rg.toBoolean(opts.grayscale)) this.grayscale = 'g/';
	if (rg.toBoolean(opts.random)) this.options += 'random&';
	if (rg.toBoolean(opts.blur)) this.options += 'blur&';
	if (rg.toNumber(opts.image)) this.options += 'image=' + opts.image + '&';
	if (rg.isDefined(opts.gravity)) this.options += 'gravity=' + opts.gravity;
});
