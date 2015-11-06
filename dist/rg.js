'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

;
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
  var uid = 0;
  rg.uid = function () {
    return uid++;
  };
  rg.xhr = function (method, src, onload) {
    var req = new XMLHttpRequest();
    req.onload = function () {
      if (rg.isFunction(onload)) onload(req.responseText);
    };
    req.open(method, src, true);
    req.send();
  };
})();
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

(function () {
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
      return _ref1 = number.length, __indexOf.call(card_type.valid_length, _ref1) >= 0;
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
  rg.creditcard = {
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
  rg.map = map;
})();

var RgTag = (function () {
  function RgTag() {
    _classCallCheck(this, RgTag);

    riot.observable(this);
  }

  _createClass(RgTag, [{
    key: 'update',
    value: function update() {
      this.trigger('update');
    }
  }]);

  return RgTag;
})();

var RgAlerts = (function (_RgTag) {
  _inherits(RgAlerts, _RgTag);

  function RgAlerts(opts) {
    var _this3 = this;

    _classCallCheck(this, RgAlerts);

    _get(Object.getPrototypeOf(RgAlerts.prototype), 'constructor', this).call(this);
    if (rg.isUndefined(opts)) opts = {};
    this.alerts = [];
    if (!rg.isArray(opts.alerts)) return;
    opts.alerts.forEach(function (alert) {
      _this3.add(alert);
    });
  }

  _createClass(RgAlerts, [{
    key: 'add',
    value: function add(alert) {
      var _this4 = this;

      alert.id = rg.uid();
      if (rg.isUndefined(alert.isvisible)) alert.isvisible = true;
      if (alert.timeout) {
        alert.startTimer = function () {
          alert.timer = setTimeout(function () {
            _this4.dismiss(alert);
            _this4.update();
          }, rg.toNumber(alert.timeout));
        };
        alert.startTimer();
      }
      this.alerts.push(alert);
    }
  }, {
    key: 'dismiss',
    value: function dismiss(alert) {
      alert.isvisible = false;
      if (rg.isFunction(alert.onclose)) alert.onclose(alert);
      clearTimeout(alert.timer);
    }
  }, {
    key: 'select',
    value: function select(alert) {
      if (rg.isFunction(alert.onclick)) alert.onclick(alert);
    }
  }]);

  return RgAlerts;
})(RgTag);

var RgBehold = (function (_RgTag2) {
  _inherits(RgBehold, _RgTag2);

  function RgBehold(opts) {
    _classCallCheck(this, RgBehold);

    _get(Object.getPrototypeOf(RgBehold.prototype), 'constructor', this).call(this);
    if (rg.isUndefined(opts)) opts = {};
    this._image1 = opts.image1;
    this._image2 = opts.image2;
    this._mode = opts.mode;
  }

  _createClass(RgBehold, [{
    key: 'image1',
    get: function get() {
      return this._image1;
    },
    set: function set(img) {
      this._image1 = img;
    }
  }, {
    key: 'image2',
    get: function get() {
      return this._image2;
    },
    set: function set(img) {
      this._image2 = img;
    }
  }, {
    key: 'mode',
    get: function get() {
      return this._mode || 'swipe';
    },
    set: function set(mode) {
      this._mode = mode;
    }
  }]);

  return RgBehold;
})(RgTag);

var RgBubble = (function (_RgTag3) {
  _inherits(RgBubble, _RgTag3);

  function RgBubble(opts) {
    _classCallCheck(this, RgBubble);

    _get(Object.getPrototypeOf(RgBubble.prototype), 'constructor', this).call(this);
    if (rg.isUndefined(opts)) opts = {};
    this._isvisible = opts.isvisible;
    this._content = opts.content;
  }

  _createClass(RgBubble, [{
    key: 'showBubble',
    value: function showBubble() {
      clearTimeout(this._timer);
      this.isvisible = true;
    }
  }, {
    key: 'hideBubble',
    value: function hideBubble() {
      var _this5 = this;

      this._timer = setTimeout(function () {
        _this5.isvisible = false;
        _this5.update();
      }, 1000);
    }
  }, {
    key: 'toggleBubble',
    value: function toggleBubble() {
      this.isvisible = !this.isvisible;
    }
  }, {
    key: 'isvisible',
    get: function get() {
      return rg.toBoolean(this._isvisible);
    },
    set: function set(isvisible) {
      this._isvisible = isvisible;
    }
  }, {
    key: 'content',
    get: function get() {
      return this._content || '';
    },
    set: function set(content) {
      this._content = content;
    }
  }]);

  return RgBubble;
})(RgTag);

var RgCode = (function (_RgTag4) {
  _inherits(RgCode, _RgTag4);

  function RgCode(opts) {
    _classCallCheck(this, RgCode);

    _get(Object.getPrototypeOf(RgCode.prototype), 'constructor', this).call(this);
    if (rg.isUndefined(opts)) opts = {};
    this._url = opts.url;
    this._code = opts.code;
    this._onchange = opts.onchange;
    this._theme = opts.theme;
    this._mode = opts.mode;
    this._tabsize = opts.tabsize;
    this._softtabs = opts.softtabs;
    this._wordwrap = opts.wordwrap;
    this._readonly = opts.readonly;
  }

  _createClass(RgCode, [{
    key: 'url',
    get: function get() {
      return this._url;
    },
    set: function set(url) {
      this._url = url;
    }
  }, {
    key: 'code',
    get: function get() {
      return this._code || '';
    },
    set: function set(code) {
      this._code = code;
    }
  }, {
    key: 'onchange',
    get: function get() {
      if (rg.isFunction(this._onchange)) return this._onchange;
      return null;
    },
    set: function set(onchange) {
      if (rg.isFunction(onchange)) this._onchange = onchange;
    }
  }, {
    key: 'theme',
    get: function get() {
      return this._theme || 'monokai';
    },
    set: function set(theme) {
      this._theme = theme;
    }
  }, {
    key: 'mode',
    get: function get() {
      return this._mode || 'html';
    },
    set: function set(mode) {
      this._mode = mode;
    }
  }, {
    key: 'tabsize',
    get: function get() {
      return rg.toNumber(this._tabsize) || 2;
    },
    set: function set(tabsize) {
      this._tabsize = tabsize;
    }
  }, {
    key: 'softtabs',
    get: function get() {
      return rg.toBoolean(this._softtabs);
    },
    set: function set(softtabs) {
      this._softtabs = softtabs;
    }
  }, {
    key: 'wordwrap',
    get: function get() {
      return rg.toBoolean(this._wordwrap);
    },
    set: function set(wordwrap) {
      this._wordwrap = wordwrap;
    }
  }, {
    key: 'readonly',
    get: function get() {
      return rg.toBoolean(this._readonly);
    },
    set: function set(readonly) {
      this._readonly = readonly;
    }
  }]);

  return RgCode;
})(RgTag);

var RgContextMenu = (function (_RgTag5) {
  _inherits(RgContextMenu, _RgTag5);

  function RgContextMenu(opts) {
    var _this6 = this;

    _classCallCheck(this, RgContextMenu);

    _get(Object.getPrototypeOf(RgContextMenu.prototype), 'constructor', this).call(this);
    if (rg.isUndefined(opts)) opts = {};
    this.name = opts.name;
    this._isvisible = opts.isvisible;
    this._onclose = opts.onclose;
    this._onopen = opts.onopen;
    this._items = [];
    if (!rg.isArray(opts.items)) return;
    opts.items.forEach(function (item) {
      _this6.add(item);
    });
  }

  _createClass(RgContextMenu, [{
    key: 'add',
    value: function add(item) {
      item.id = rg.uid();
      if (rg.isUndefined(item.isvisible)) item.isvisible = true;
      if (rg.isUndefined(item.inactive)) item.inactive = false;
      if (!rg.isFunction(item.onclick)) item.onclick = null;
      this._items.push(item);
    }
  }, {
    key: 'select',
    value: function select(item) {
      if (!item.inactive) {
        if (rg.isFunction(item.onclick)) item.onclick(item);
        this.isvisible = false;
      }
    }
  }, {
    key: 'items',
    get: function get() {
      if (rg.isArray(this._items)) return this._items;
      this._items = [];
      return this._items;
    },
    set: function set(items) {
      this._items = items;
    }
  }, {
    key: 'onopen',
    get: function get() {
      if (rg.isFunction(this._onopen)) return this._onopen;
      return null;
    },
    set: function set(onopen) {
      if (rg.isFunction(onopen)) this._onopen = onopen;
    }
  }, {
    key: 'onclose',
    get: function get() {
      if (rg.isFunction(this._onclose)) return this._onclose;
      return null;
    },
    set: function set(onclose) {
      if (rg.isFunction(onclose)) this._onclose = onclose;
    }
  }, {
    key: 'isvisible',
    get: function get() {
      return rg.toBoolean(this._isvisible);
    },
    set: function set(isvisible) {
      this._isvisible = rg.toBoolean(isvisible);
    }
  }]);

  return RgContextMenu;
})(RgTag);

var RgCreditCard = (function (_RgTag6) {
  _inherits(RgCreditCard, _RgTag6);

  function RgCreditCard(opts) {
    _classCallCheck(this, RgCreditCard);

    _get(Object.getPrototypeOf(RgCreditCard.prototype), 'constructor', this).call(this);
    if (rg.isUndefined(opts)) opts = {};
    this._placeholder = opts.placeholder;
    this._cardnumber = opts.cardnumber;
  }

  _createClass(RgCreditCard, [{
    key: 'validate',
    value: function validate() {
      var res = rg.creditcard.validate(this.cardnumber);
      this.valid = res.valid;
      this.icon = this.valid ? res.card_type.name : '';
    }
  }, {
    key: 'cardnumber',
    get: function get() {
      return (this._cardnumber || '').toString();
    },
    set: function set(num) {
      this._cardnumber = num;
    }
  }, {
    key: 'valid',
    get: function get() {
      return rg.toBoolean(this._valid);
    },
    set: function set(valid) {
      this._valid = rg.toBoolean(valid);
    }
  }, {
    key: 'placeholder',
    get: function get() {
      return this._placeholder || 'Card no.';
    },
    set: function set(text) {
      this._placeholder = text;
    }
  }]);

  return RgCreditCard;
})(RgTag);

var RgDate = (function (_RgTag7) {
  _inherits(RgDate, _RgTag7);

  function RgDate(opts) {
    _classCallCheck(this, RgDate);

    _get(Object.getPrototypeOf(RgDate.prototype), 'constructor', this).call(this);
    if (rg.isUndefined(opts)) opts = {};
    this._isvisible = opts.isvisible;
    this._date = opts.date;
    this._showYears = opts.showyears;
    this._showMonths = opts.showmonths;
    this._showToday = opts.showtoday;
    this._format = opts.format;
    this._yearFormat = opts.yearformat;
    this._monthFormat = opts.monthformat;
    this._weekFormat = opts.weekformat;
    this._dayFormat = opts.dayformat;
    this._onclose = opts.onclose;
    this._onselect = opts.onselect;
    this._onopen = opts.onopen;

    var temp = moment();
    this.dayNames = [temp.day(0).format(this.weekFormat), temp.day(1).format(this.weekFormat), temp.day(2).format(this.weekFormat), temp.day(3).format(this.weekFormat), temp.day(4).format(this.weekFormat), temp.day(5).format(this.weekFormat), temp.day(6).format(this.weekFormat)];
  }

  _createClass(RgDate, [{
    key: '_toMoment',
    value: function _toMoment(date) {
      if (!moment.isMoment(date)) date = moment(date);
      if (date.isValid()) return date;
      return moment();
    }
  }, {
    key: 'open',
    value: function open() {
      this._isvisible = true;
      if (rg.isFunction(this._onopen)) this._onopen();
    }
  }, {
    key: 'close',
    value: function close() {
      if (this.isvisible) {
        this._isvisible = false;
        if (rg.isFunction(this._onclose)) this._onclose();
      }
    }
  }, {
    key: 'setToday',
    value: function setToday() {
      this.select(moment());
    }
  }, {
    key: 'prevYear',
    value: function prevYear() {
      this._date = this.date.subtract(1, 'year');
    }
  }, {
    key: 'nextYear',
    value: function nextYear() {
      this._date = this.date.add(1, 'year');
    }
  }, {
    key: 'prevMonth',
    value: function prevMonth() {
      this._date = this.date.subtract(1, 'month');
    }
  }, {
    key: 'nextMonth',
    value: function nextMonth() {
      this._date = this.date.add(1, 'month');
    }
  }, {
    key: 'select',
    value: function select(date) {
      this._date = date;
      if (rg.isFunction(this._onselect)) this._onselect(this.date);
    }
  }, {
    key: 'date',
    get: function get() {
      return this._toMoment(this._date);
    },
    set: function set(date) {
      this._date = date;
      if (rg.isFunction(this._onselect)) this._onselect(this.date);
      this._isvisible = false;
    }
  }, {
    key: 'dateFormatted',
    get: function get() {
      return this.date.format(this.format);
    }
  }, {
    key: 'isvisible',
    get: function get() {
      return rg.toBoolean(this._isvisible);
    }
  }, {
    key: 'year',
    get: function get() {
      return this.date.format(this.yearFormat);
    }
  }, {
    key: 'month',
    get: function get() {
      return this.date.format(this.monthFormat);
    }
  }, {
    key: 'day',
    get: function get() {
      return this.date.format(this.dayFormat);
    }
  }, {
    key: 'showYears',
    get: function get() {
      if (rg.isUndefined(this._showYears)) return true;
      return rg.toBoolean(this._showYears);
    },
    set: function set(show) {
      this._showYears = rg.toBoolean(show);
    }
  }, {
    key: 'showMonths',
    get: function get() {
      if (rg.isUndefined(this._showMonths)) return true;
      return rg.toBoolean(this._showMonths);
    },
    set: function set(show) {
      this._showMonths = rg.toBoolean(show);
    }
  }, {
    key: 'showToday',
    get: function get() {
      if (rg.isUndefined(this._showToday)) return true;
      return rg.toBoolean(this._showToday);
    },
    set: function set(show) {
      this._showToday = rg.toBoolean(show);
    }
  }, {
    key: 'format',
    get: function get() {
      return this._format || 'LL';
    },
    set: function set(format) {
      this._format = format;
    }
  }, {
    key: 'yearFormat',
    get: function get() {
      return this._yearFormat || 'YYYY';
    },
    set: function set(yearFormat) {
      this._yearFormat = yearFormat;
    }
  }, {
    key: 'monthFormat',
    get: function get() {
      return this._monthFormat || 'MMMM';
    },
    set: function set(monthFormat) {
      this._monthFormat = monthFormat;
    }
  }, {
    key: 'weekFormat',
    get: function get() {
      return this._weekFormat || 'ddd';
    },
    set: function set(weekFormat) {
      this._weekFormat = weekFormat;
    }
  }, {
    key: 'dayFormat',
    get: function get() {
      return this._dayFormat || 'DD';
    },
    set: function set(dayFormat) {
      this._dayFormat = dayFormat;
    }
  }]);

  return RgDate;
})(RgTag);

var RgInclude = (function (_RgTag8) {
  _inherits(RgInclude, _RgTag8);

  function RgInclude(opts) {
    _classCallCheck(this, RgInclude);

    _get(Object.getPrototypeOf(RgInclude.prototype), 'constructor', this).call(this);
    if (rg.isUndefined(opts)) opts = {};
    this._unsafe = opts.unsafe;
    this._url = opts.url;
  }

  _createClass(RgInclude, [{
    key: 'fetch',
    value: function fetch() {
      var _this7 = this;

      rg.xhr('get', this.url, function (resp) {
        _this7.trigger('fetch', resp);
      });
    }
  }, {
    key: 'unsafe',
    get: function get() {
      return rg.toBoolean(this._unsafe);
    },
    set: function set(unsafe) {
      this._unsafe = unsafe;
    }
  }, {
    key: 'url',
    get: function get() {
      return this._url || '';
    },
    set: function set(url) {
      if (this.url != url) {
        this._url = url;
      }
    }
  }]);

  return RgInclude;
})(RgTag);

var RgLoading = (function (_RgTag9) {
  _inherits(RgLoading, _RgTag9);

  function RgLoading(opts) {
    _classCallCheck(this, RgLoading);

    _get(Object.getPrototypeOf(RgLoading.prototype), 'constructor', this).call(this);
    if (rg.isUndefined(opts)) opts = {};
    this._isvisible = opts.isvisible;
  }

  _createClass(RgLoading, [{
    key: 'isvisible',
    get: function get() {
      return rg.toBoolean(this._isvisible);
    },
    set: function set(isvisible) {
      this._isvisible = isvisible;
    }
  }]);

  return RgLoading;
})(RgTag);

var RgMap = (function (_RgTag10) {
  _inherits(RgMap, _RgTag10);

  function RgMap(opts) {
    _classCallCheck(this, RgMap);

    _get(Object.getPrototypeOf(RgMap.prototype), 'constructor', this).call(this);
    this._options = opts;
  }

  _createClass(RgMap, [{
    key: 'options',
    get: function get() {
      if (rg.isUndefined(this._options)) {
        this._options = {
          center: {
            lat: 53.806,
            lng: -1.535
          },
          zoom: 7
        };
      }

      return this._options;
    }
  }]);

  return RgMap;
})(RgTag);

var RgMarkdown = (function (_RgTag11) {
  _inherits(RgMarkdown, _RgTag11);

  function RgMarkdown(opts) {
    _classCallCheck(this, RgMarkdown);

    _get(Object.getPrototypeOf(RgMarkdown.prototype), 'constructor', this).call(this);
    if (rg.isUndefined(opts)) opts = {};
    if (commonmark) {
      this.reader = new commonmark.Parser();
      this.writer = new commonmark.HtmlRenderer();
    }
    this._url = opts.url;
  }

  _createClass(RgMarkdown, [{
    key: 'parse',
    value: function parse(md) {
      var parsed = this.reader.parse(md);
      this.trigger('parse', this.writer.render(parsed));
      return this.writer.render(parsed);
    }
  }, {
    key: 'fetch',
    value: function fetch() {
      var _this8 = this;

      rg.xhr('get', this.url, function (resp) {
        _this8.trigger('fetch', resp);
      });
    }
  }, {
    key: 'url',
    get: function get() {
      return this._url || '';
    },
    set: function set(url) {
      this._url = url;
    }
  }]);

  return RgMarkdown;
})(RgTag);

var RgModal = (function (_RgTag12) {
  _inherits(RgModal, _RgTag12);

  function RgModal(opts) {
    _classCallCheck(this, RgModal);

    _get(Object.getPrototypeOf(RgModal.prototype), 'constructor', this).call(this);
    this._isvisible = opts.isvisible;
    this._dismissable = opts.dismissable;
    this._ghost = opts.ghost;
    this._heading = opts.heading;
    this._buttons = opts.buttons;
    this._onclose = opts.onclose;
    this._onopen = opts.onopen;
  }

  _createClass(RgModal, [{
    key: 'dismissable',
    get: function get() {
      if (rg.isUndefined(this._dismissable)) this._dismissable = true;
      return rg.toBoolean(this._dismissable);
    },
    set: function set(dismissable) {
      this._dismissable = dismissable;
    }
  }, {
    key: 'ghost',
    get: function get() {
      return rg.toBoolean(this._ghost);
    },
    set: function set(ghost) {
      this._ghost = ghost;
    }
  }, {
    key: 'heading',
    get: function get() {
      return this._heading || '';
    },
    set: function set(heading) {
      this._heading = heading;
    }
  }, {
    key: 'buttons',
    get: function get() {
      if (rg.isArray(this._buttons)) return this._buttons;
      return [];
    },
    set: function set(buttons) {
      this._buttons = buttons;
    }
  }, {
    key: 'onopen',
    get: function get() {
      if (rg.isFunction(this._onopen)) return this._onopen;
      return null;
    },
    set: function set(onopen) {
      this._onopen = onopen;
    }
  }, {
    key: 'onclose',
    get: function get() {
      if (rg.isFunction(this._onclose)) return this._onclose;
      return null;
    },
    set: function set(onclose) {
      this._onclose = onclose;
    }
  }, {
    key: 'isvisible',
    get: function get() {
      return rg.toBoolean(this._isvisible);
    },
    set: function set(isvisible) {
      this._isvisible = isvisible;
      if (this.isvisible && this.onopen) this.onopen();
      if (!this.isvisible && this.onclose) this.onclose();
    }
  }]);

  return RgModal;
})(RgTag);

var RgPhoneSim = (function (_RgTag13) {
  _inherits(RgPhoneSim, _RgTag13);

  function RgPhoneSim(opts) {
    _classCallCheck(this, RgPhoneSim);

    _get(Object.getPrototypeOf(RgPhoneSim.prototype), 'constructor', this).call(this);
    if (rg.isUndefined(opts)) opts = {};
    this._url = opts.url;
  }

  _createClass(RgPhoneSim, [{
    key: 'url',
    get: function get() {
      return this._url || '';
    },
    set: function set(url) {
      this._url = url;
    }
  }]);

  return RgPhoneSim;
})(RgTag);

var RgPlaceholdit = (function (_RgTag14) {
  _inherits(RgPlaceholdit, _RgTag14);

  function RgPlaceholdit(opts) {
    _classCallCheck(this, RgPlaceholdit);

    _get(Object.getPrototypeOf(RgPlaceholdit.prototype), 'constructor', this).call(this);
    if (rg.isUndefined(opts)) opts = {};
    this._width = opts.width;
    this._height = opts.height;
    this._background = opts.background;
    this._color = opts.color;
    this._text = opts.text;
    this._textsize = opts.textsize;
    this._format = opts.format;
  }

  _createClass(RgPlaceholdit, [{
    key: 'width',
    get: function get() {
      return rg.toNumber(this._width) || 450;
    },
    set: function set(width) {
      this._width = width;
    }
  }, {
    key: 'height',
    get: function get() {
      return rg.toNumber(this._height) || 250;
    },
    set: function set(height) {
      this._height = height;
    }
  }, {
    key: 'background',
    get: function get() {
      return this._background || 'f01e52';
    },
    set: function set(background) {
      this._background = background;
    }
  }, {
    key: 'color',
    get: function get() {
      return this._color || 'fff';
    },
    set: function set(color) {
      this._color = color;
    }
  }, {
    key: 'text',
    get: function get() {
      return this._text || this.width + ' x ' + this.height;
    },
    set: function set(text) {
      this._text = text;
    }
  }, {
    key: 'textsize',
    get: function get() {
      return rg.toNumber(this._textsize) || 30;
    },
    set: function set(textsize) {
      this._textsize = textsize;
    }
  }, {
    key: 'format',
    get: function get() {
      return this._format || 'png';
    },
    set: function set(format) {
      this._format = format;
    }
  }]);

  return RgPlaceholdit;
})(RgTag);

var RgSelect = (function (_RgTag15) {
  _inherits(RgSelect, _RgTag15);

  function RgSelect(opts) {
    _classCallCheck(this, RgSelect);

    _get(Object.getPrototypeOf(RgSelect.prototype), 'constructor', this).call(this);
    if (rg.isUndefined(opts)) opts = {};
    this._isvisible = opts.isvisible;
    this._autocomplete = opts.autocomplete;
    this._filteron = opts.filteron;
    this._options = opts.options;
    this._hasfilter = opts.hasfilter;
    this._placeholder = opts.placeholder;
    this._filterplaceholder = opts.filterplaceholder;
    this._filtereditems = opts.filtereditems;
    this._onopen = opts.onopen;
    this._onclose = opts.onclose;
    this._onselect = opts.onselect;
    this._onfilter = opts.onfilter;
  }

  _createClass(RgSelect, [{
    key: 'open',
    value: function open() {
      if (this.onopen && !this.isvisible) this.onopen();
      this.isvisible = true;
    }
  }, {
    key: 'close',
    value: function close() {
      if (this.onclose && this.isvisible) this.onclose();
      this.isvisible = false;
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      this.isvisible = !this.isvisible;
      if (this.onopen && this.isvisible) this.onopen();else if (this.onclose && !this.isvisible) this.onclose();
    }
  }, {
    key: 'filter',
    value: function filter(text) {
      var _this9 = this;

      this.filtereditems = this.options.filter(function (item) {
        item.active = false;
        var f = item[_this9.filteron];
        if (rg.isUndefined(f)) return false;
        if (text.length == 0 || f.toString().toLowerCase().indexOf(text.toString().toLowerCase()) > -1) return true;
      });
      if (this.onfilter) this.onfilter();
    }
  }, {
    key: 'select',
    value: function select(item) {
      this.options.forEach(function (i) {
        return i.selected = false;
      });
      item.selected = true;
      if (this.onselect) this.onselect(item);
      this.isvisible = false;
      if (this.autocomplete) this.filter(item[this.filteron]);
      this.trigger('select', item);
    }
  }, {
    key: 'isvisible',
    get: function get() {
      return rg.toBoolean(this._isvisible);
    },
    set: function set(isvisible) {
      this._isvisible = isvisible;
    }
  }, {
    key: 'autocomplete',
    get: function get() {
      return rg.toBoolean(this._autocomplete);
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
      return rg.toBoolean(this._hasfilter);
    },
    set: function set(hasfilter) {
      this._hasfilter = hasfilter;
    }
  }, {
    key: 'options',
    get: function get() {
      if (rg.isArray(this._options)) return this._options;
      this._options = [];
      return this._options;
    },
    set: function set(options) {
      var _this10 = this;

      if (!rg.isArray(options)) options = [];
      options.forEach(function (item, i) {
        item.index = i;
        if (item.selected) _this10.select(item);
      });
      this._options = options;
    }
  }, {
    key: 'filtereditems',
    get: function get() {
      if (rg.isArray(this._filtereditems)) return this._filtereditems;
      this._filtereditems = [];
      return this._filtereditems;
    },
    set: function set(filtereditems) {
      this._filtereditems = filtereditems;
    }
  }, {
    key: 'onopen',
    get: function get() {
      if (rg.isFunction(this._onopen)) return this._onopen;
      return null;
    },
    set: function set(onopen) {
      this._onopen = onopen;
    }
  }, {
    key: 'onclose',
    get: function get() {
      if (rg.isFunction(this._onclose)) return this._onclose;
      return null;
    },
    set: function set(onclose) {
      this._onclose = onclose;
    }
  }, {
    key: 'onfilter',
    get: function get() {
      if (rg.isFunction(this._onfilter)) return this._onfilter;
      return null;
    },
    set: function set(onfilter) {
      this._onfilter = onfilter;
    }
  }, {
    key: 'onselect',
    get: function get() {
      if (rg.isFunction(this._onselect)) return this._onselect;
      return null;
    },
    set: function set(onselect) {
      this._onselect = onselect;
    }
  }]);

  return RgSelect;
})(RgTag);

var RgSidemenu = (function (_RgTag16) {
  _inherits(RgSidemenu, _RgTag16);

  function RgSidemenu(opts) {
    _classCallCheck(this, RgSidemenu);

    _get(Object.getPrototypeOf(RgSidemenu.prototype), 'constructor', this).call(this);
    if (rg.isUndefined(opts)) opts = {};
    this._isvisible = opts.isvisible;
    this._header = opts.header;
    this._items = opts.items;
    this._onselect = opts.onselect;
    this._onopen = opts.onopen;
    this._onclose = opts.onclose;
  }

  _createClass(RgSidemenu, [{
    key: 'open',
    value: function open() {
      if (this.onopen && !this.isvisible) this.onopen();
      this.isvisible = true;
    }
  }, {
    key: 'close',
    value: function close() {
      if (this.onclose && this.isvisible) this.onclose();
      this.isvisible = false;
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      this.isvisible = !this.isvisible;
      if (this.onopen && this.isvisible) this.onopen();else if (this.onclose && !this.isvisible) this.onclose();
    }
  }, {
    key: 'select',
    value: function select(item) {
      this.items.forEach(function (item) {
        return item.active = false;
      });
      item.active = true;
      if (item.action) item.action(item);
      if (this.onselect) this.onselect(item);
    }
  }, {
    key: 'isvisible',
    get: function get() {
      return rg.toBoolean(this._isvisible);
    },
    set: function set(isvisible) {
      this._isvisible = isvisible;
    }
  }, {
    key: 'header',
    get: function get() {
      return this._header;
    },
    set: function set(header) {
      this._header = header;
    }
  }, {
    key: 'items',
    get: function get() {
      if (rg.isArray(this._items)) return this._items;
      this._items = [];
      return this._items;
    },
    set: function set(items) {
      this._items = items;
    }
  }, {
    key: 'onopen',
    get: function get() {
      if (rg.isFunction(this._onopen)) return this._onopen;
      return null;
    },
    set: function set(onopen) {
      this._onopen = onopen;
    }
  }, {
    key: 'onclose',
    get: function get() {
      if (rg.isFunction(this._onclose)) return this._onclose;
      return null;
    },
    set: function set(onclose) {
      this._onclose = onclose;
    }
  }, {
    key: 'onselect',
    get: function get() {
      if (rg.isFunction(this._onselect)) return this._onselect;
      return null;
    },
    set: function set(onselect) {
      this._onselect = onselect;
    }
  }]);

  return RgSidemenu;
})(RgTag);

var RgTabs = (function (_RgTag17) {
  _inherits(RgTabs, _RgTag17);

  function RgTabs(opts) {
    _classCallCheck(this, RgTabs);

    _get(Object.getPrototypeOf(RgTabs.prototype), 'constructor', this).call(this);
    if (rg.isUndefined(opts)) opts = {};
    this._tabs = opts.tabs;
    this._onopen = opts.onopen;
  }

  _createClass(RgTabs, [{
    key: 'select',
    value: function select(tab) {
      if (!tab.disabled) {
        this.tabs.forEach(function (tab) {
          tab.active = false;
        });
        if (this.onopen) this.onopen(tab);
        tab.active = true;
      }
    }
  }, {
    key: 'onopen',
    get: function get() {
      if (rg.isFunction(this._onopen)) return this._onopen;
      return null;
    },
    set: function set(onopen) {
      if (rg.isFunction(onopen)) this._onopen = onopen;
    }
  }, {
    key: 'tabs',
    get: function get() {
      var _this11 = this;

      if (rg.isArray(this._tabs)) {
        var _ret = (function () {
          var activeTab = false;
          _this11._tabs.forEach(function (tab, i) {
            tab.index = i;

            if (activeTab) tab.active = false;
            if (tab.active) activeTab = true;
          });
          return {
            v: _this11._tabs
          };
        })();

        if (typeof _ret === 'object') return _ret.v;
      }
      this._tabs = [];
      return this._tabs;
    },
    set: function set(tabs) {
      this._tabs = tabs;
    }
  }]);

  return RgTabs;
})(RgTag);

var RgTags = (function (_RgSelect) {
  _inherits(RgTags, _RgSelect);

  function RgTags(opts) {
    _classCallCheck(this, RgTags);

    _get(Object.getPrototypeOf(RgTags.prototype), 'constructor', this).call(this, opts);
    this._tags = opts.tags;
    this._value = opts.value;
  }

  _createClass(RgTags, [{
    key: 'addTag',
    value: function addTag(tag) {
      tag.index = this.tags.length;
      this.tags.push(tag);
      this.isvisible = false;
    }
  }, {
    key: 'removeTag',
    value: function removeTag(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
      this.isvisible = false;
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
      if (rg.isArray(this._tags)) return this._tags;
      this._tags = [];
      return this._tags;
    },
    set: function set(tags) {
      if (!rg.isArray(tags)) tags = [];
      tags.forEach(function (item, i) {
        item.index = i;
      });
      this._tags = tags;
    }
  }]);

  return RgTags;
})(RgSelect);

var RgTime = (function (_RgSelect2) {
  _inherits(RgTime, _RgSelect2);

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
      if (rg.isDate(this._time)) return this._time;
      return new Date();
    },
    set: function set(time) {
      this._time = time;
    }
  }, {
    key: 'step',
    get: function get() {
      return rg.toNumber(this._step) || 1;
    },
    set: function set(step) {
      this._step = step;
    }
  }, {
    key: 'ampm',
    get: function get() {
      return rg.toBoolean(this._ampm);
    },
    set: function set(ampm) {
      this._ampm = ampm;
    }
  }]);

  return RgTime;
})(RgSelect);

var RgToasts = (function (_RgTag18) {
  _inherits(RgToasts, _RgTag18);

  function RgToasts(opts) {
    _classCallCheck(this, RgToasts);

    _get(Object.getPrototypeOf(RgToasts.prototype), 'constructor', this).call(this);
    if (rg.isUndefined(opts)) opts = {};
    this._toasts = opts.toasts;
    this._position = opts.position;
    this._isvisible = opts.isvisible;
  }

  _createClass(RgToasts, [{
    key: 'add',
    value: function add(toast) {
      this.toasts.push(toast);
    }
  }, {
    key: 'toasts',
    get: function get() {
      var _this12 = this;

      if (rg.isArray(this._toasts)) {
        this._toasts.forEach(function (toast) {
          if (rg.isUndefined(toast.isvisible)) toast.isvisible = true;
          toast.id = toast.id || rg.uid();
          if (!toast.timer && !toast.sticky) {
            toast.startTimer = function () {
              toast.timer = window.setTimeout(function () {
                toast.isvisible = false;
                if (rg.isFunction(toast.onclose)) toast.onclose();
                _this12.update();
              }, rg.toNumber(toast.timeout) || 6000);
            };
            toast.startTimer();
          }
        });
        this.isvisible = this._toasts.filter(function (toast) {
          return toast.isvisible;
        }).length > 0;
        return this._toasts;
      }
      this._toats = [];
      return this._toasts;
    },
    set: function set(toasts) {
      this._toasts = toasts;
    }
  }, {
    key: 'position',
    get: function get() {
      return this._position || 'topright';
    },
    set: function set(position) {
      this._position = position;
    }
  }, {
    key: 'isvisible',
    get: function get() {
      return rg.toBoolean(this._isvisible);
    },
    set: function set(isvisible) {
      this._isvisible = isvisible;
    }
  }]);

  return RgToasts;
})(RgTag);

var RgToggle = (function (_RgTag19) {
  _inherits(RgToggle, _RgTag19);

  function RgToggle(opts) {
    _classCallCheck(this, RgToggle);

    _get(Object.getPrototypeOf(RgToggle.prototype), 'constructor', this).call(this);
    if (rg.isUndefined(opts)) opts = {};
    this._checked = opts.checked;
    this._ontoggle = opts.ontoggle;
  }

  _createClass(RgToggle, [{
    key: 'toggle',
    value: function toggle() {
      this.checked = !this.checked;
      if (this.ontoggle) this.ontoggle(this.checked);
    }
  }, {
    key: 'checked',
    get: function get() {
      return rg.toBoolean(this._checked);
    },
    set: function set(checked) {
      this._checked = checked;
    }
  }, {
    key: 'ontoggle',
    get: function get() {
      if (rg.isFunction(this._ontoggle)) return this._ontoggle;
      return null;
    },
    set: function set(ontoggle) {
      this._ontoggle = ontoggle;
    }
  }]);

  return RgToggle;
})(RgTag);

var RgUnsplash = (function (_RgTag20) {
  _inherits(RgUnsplash, _RgTag20);

  function RgUnsplash(opts) {
    _classCallCheck(this, RgUnsplash);

    _get(Object.getPrototypeOf(RgUnsplash.prototype), 'constructor', this).call(this);
    if (rg.isUndefined(opts)) opts = {};
    this._width = opts.width;
    this._height = opts.height;
    this._greyscale = opts.greyscale || opts.grayscale;
    this._random = opts.random;
    this._blur = opts.blur;
    this._image = opts.image;
    this._gravity = opts.gravity;
  }

  _createClass(RgUnsplash, [{
    key: 'width',
    get: function get() {
      return rg.toNumber(this._width) || 450;
    },
    set: function set(width) {
      this._width = width;
      this.trigger('change');
    }
  }, {
    key: 'height',
    get: function get() {
      return rg.toNumber(this._height) || 250;
    },
    set: function set(height) {
      this._height = height;
      this.trigger('change');
    }
  }, {
    key: 'greyscale',
    get: function get() {
      return rg.toBoolean(this._greyscale);
    },
    set: function set(greyscale) {
      this._greyscale = greyscale;
      this.trigger('change');
    }
  }, {
    key: 'grayscale',
    get: function get() {
      return this.greyscale;
    },
    set: function set(grayscale) {
      this.greyscale = grayscale;
    }
  }, {
    key: 'random',
    get: function get() {
      return rg.toBoolean(this._random);
    },
    set: function set(random) {
      this._random = random;
      this.trigger('change');
    }
  }, {
    key: 'blur',
    get: function get() {
      return rg.toBoolean(this._blur);
    },
    set: function set(blur) {
      this._blur = blur;
      this.trigger('change');
    }
  }, {
    key: 'image',
    get: function get() {
      return rg.toNumber(this._image);
    },
    set: function set(image) {
      this._image = image;
      this.trigger('change');
    }
  }, {
    key: 'gravity',
    get: function get() {
      return this._gravity;
    },
    set: function set(gravity) {
      this._gravity = gravity;
      this.trigger('change');
    }
  }]);

  return RgUnsplash;
})(RgTag);

riot.tag('rg-alerts', '<div each="{ RgAlerts.alerts }" class="alert { type } { isvisible: isvisible }" onclick="{ select }"> <a class="close" aria-label="Close" onclick="{ parent.dismiss }" if="{ dismissable != false }"> <span aria-hidden="true">&times;</span> </a> <rg-raw content="{ content }"></rg-raw> </div>', 'rg-alerts, [riot-tag="rg-alerts"]{ font-size: 0.9em; position: relative; top: 0; right: 0; left: 0; width: 100%; } rg-alerts .alert, [riot-tag="rg-alerts"] .alert{ display: none; position: relative; margin-bottom: 15px; padding: 15px 35px 15px 15px; } rg-alerts .isvisible, [riot-tag="rg-alerts"] .isvisible{ display: block; } rg-alerts .close, [riot-tag="rg-alerts"] .close{ position: absolute; top: 50%; right: 20px; line-height: 12px; font-size: 1.1em; border: 0; background-color: transparent; color: rgba(0, 0, 0, 0.5); cursor: pointer; outline: none; transform: translate3d(0, -50%, 0); } rg-alerts .danger, [riot-tag="rg-alerts"] .danger{ color: #8f1d2e; background-color: #ffced8; } rg-alerts .information, [riot-tag="rg-alerts"] .information{ color: #31708f; background-color: #d9edf7; } rg-alerts .success, [riot-tag="rg-alerts"] .success{ color: #2d8f40; background-color: #ccf7d4; } rg-alerts .warning, [riot-tag="rg-alerts"] .warning{ color: #c06329; background-color: #f7dfd0; }', function (opts) {
  var _this2 = this;

  this.on('mount', function () {
    var _this = this;

    this.RgAlerts = opts.alerts || new RgAlerts(opts);
    this.RgAlerts.on('update', function () {
      _this.update();
    });
    this.update();
  });

  this.dismiss = function (e) {
    var alert = e.item;
    _this2.RgAlerts.dismiss(alert);
  };

  this.select = function (e) {
    var alert = e.item;
    _this2.RgAlerts.select(alert);
  };
});

riot.tag('rg-behold', '<div class="container"> <div class="controls"> <div class="modes"> <a onclick="{ swipeMode }" class="mode { active: RgBehold.mode == \'swipe\' }">Swipe</a> <a onclick="{ fadeMode }" class="mode { active: RgBehold.mode == \'fade\' }">Fade</a> </div> <input type="range" class="ranger" name="diff" value="0" min="0" max="1" step="0.01" oninput="{ updateDiff }" onchange="{ updateDiff }"> </div> <div class="images"> <div class="image"> <img class="image-2" riot-src="{ RgBehold.image2 }"> </div> <div class="image fallback"> <img class="image-1" riot-src="{ RgBehold.image1 }"> </div> </div> </div>', 'rg-behold .controls, [riot-tag="rg-behold"] .controls{ text-align: center; } rg-behold .mode, [riot-tag="rg-behold"] .mode{ text-decoration: none; cursor: pointer; padding: 0 10px; } rg-behold a.active, [riot-tag="rg-behold"] a.active{ font-weight: bold; } rg-behold .ranger, [riot-tag="rg-behold"] .ranger{ width: 90%; max-width: 300px; } rg-behold .images, [riot-tag="rg-behold"] .images{ position: relative; } rg-behold .image, [riot-tag="rg-behold"] .image{ position: absolute; width: 100%; text-align: center; } rg-behold .image img, [riot-tag="rg-behold"] .image img{ max-width: 90%; }', function (opts) {
  var _this2 = this;

  var image1 = undefined,
      image2 = undefined,
      fallback = undefined;

  var viewer = function viewer() {
    image1 = _this2.root.querySelector('.image-1');
    image2 = _this2.root.querySelector('.image-2');
    fallback = typeof image1.style.webkitClipPath == 'undefined';

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
    img1.src = _this2.RgBehold.image1;
    img2.src = _this2.RgBehold.image2;

    var _this = _this2;

    function calculateMaxHeight() {
      if (img1Loaded && img2Loaded) {
        var controls = _this.root.querySelector('.controls');
        var container = _this.root.querySelector('.container');
        container.style.height = controls.getBoundingClientRect().height + Math.max(img1H, img2H) + 'px';
        _this.updateDiff();
      }
    }
  };

  this.on('mount', function () {
    _this2.RgBehold = opts.behold || new RgBehold(opts);
    _this2.RgBehold.on('update', function () {
      _this2.update();
    });
    _this2.on('update', function () {
      viewer();
    });
    _this2.update();
  });

  this.swipeMode = function () {
    _this2.diff.value = 0;
    _this2.updateDiff();
    _this2.RgBehold.mode = 'swipe';
  };
  this.fadeMode = function () {
    _this2.diff.value = 0;
    _this2.updateDiff();
    _this2.RgBehold.mode = 'fade';
  };

  this.updateDiff = function () {
    if (_this2.RgBehold.mode == 'fade') {
      image1.style.opacity = 1 - _this2.diff.value;
    } else if (_this2.RgBehold.mode == 'swipe') {
      if (!fallback) {
        image1.style.clipPath = image1.style.webkitClipPath = 'inset(0 0 0 ' + (image1.clientWidth * _this2.diff.value - 1) + 'px)';
      } else {
        var fallbackImg = _this2.root.querySelector('.fallback');
        fallbackImg.style.clip = 'rect(auto, auto, auto, ' + fallbackImg.clientWidth * _this2.diff.value + 'px)';
      }
    }
    // this.update()
  };
});

riot.tag('rg-bubble', '<div class="context"> <div class="bubble { isvisible: RgBubble.isvisible }"> <rg-raw content="{ RgBubble.content }"></rg-raw> </div> <div class="content" onmouseover="{ showBubble }" onmouseout="{ hideBubble }" onclick="{ toggleBubble }"> <yield></yield> </div> </div>', 'rg-bubble .context, [riot-tag="rg-bubble"] .context,rg-bubble .content, [riot-tag="rg-bubble"] .content{ display: inline-block; position: relative; } rg-bubble .bubble, [riot-tag="rg-bubble"] .bubble{ position: absolute; top: -50px; left: 50%; transform: translate3d(-50%, 0, 0); padding: 10px 15px; background-color: #000; color: white; text-align: center; font-size: 0.9em; line-height: 1; white-space: nowrap; opacity: 0; } rg-bubble .isvisible, [riot-tag="rg-bubble"] .isvisible{ display: block; opacity: 1; } rg-bubble .bubble:after, [riot-tag="rg-bubble"] .bubble:after{ content: \'\'; position: absolute; display: block; bottom: -20px; left: 50%; transform: translate3d(-50%, 0, 0); width: 0; height: 0; border: 10px solid transparent; border-top-color: #000; }', function (opts) {
  var _this = this;

  this.on('mount', function () {
    _this.RgBubble = opts.bubble || new RgBubble(opts);
    _this.RgBubble.on('update', function () {
      _this.update();
    });
    _this.update();
  });

  this.showBubble = function () {
    _this.RgBubble.showBubble();
  };

  this.hideBubble = function () {
    _this.RgBubble.hideBubble();
  };

  this.toggleBubble = function () {
    _this.RgBubble.toggleBubble();
  };
});

riot.tag('rg-code', '<div class="editor"></div>', 'rg-code .editor, [riot-tag="rg-code"] .editor{ position: absolute; top: 0; right: 0; bottom: 0; left: 0; }', function (opts) {
  var _this = this;

  var editor = undefined;

  var setupEditor = function setupEditor() {
    editor.setTheme('ace/theme/' + _this.RgCode.theme);
    editor.getSession().setMode('ace/mode/' + _this.RgCode.mode);
    editor.getSession().setTabSize(_this.RgCode.tabsize);
    editor.getSession().setUseSoftTabs(_this.RgCode.softtabs);
    editor.getSession().setUseWrapMode(_this.RgCode.wordwrap);
    editor.setReadOnly(_this.RgCode.readonly);
  };

  this.on('mount', function () {
    editor = ace.edit(_this.root.querySelector('.editor'));
    editor.$blockScrolling = Infinity;

    _this.RgCode = opts.editor || new RgCode(opts);
    _this.RgCode.on('update', function () {
      _this.update();
    });
    _this.on('update', function () {
      setupEditor();
      if (_this.RgCode.code != editor.getValue()) editor.setValue(_this.RgCode.code, 1);
    });
    if (_this.RgCode.url) {
      rg.xhr('get', _this.RgCode.url, function (resp) {
        _this.RgCode.code = resp;
        _this.update();
      });
    }
    editor.setValue(_this.RgCode.code, 1);
    editor.getSession().on('change', function (e) {
      _this.RgCode.code = editor.getValue();
      if (_this.RgCode.onchange) _this.RgCode.onchange(editor.getValue());
    });
    setupEditor();
    _this.update();
  });
});

riot.tag('rg-context-menu', '<div class="menu { isvisible: RgContextMenu.isvisible }"> <div class="list"> <div each="{ RgContextMenu.items }" class="item { inactive: inactive }" onclick="{ selectItem }"> <rg-raw content="{ content }"></rg-raw> </div> <yield></yield> </div> </div>', 'rg-context-menu .menu, [riot-tag="rg-context-menu"] .menu{ display: none; position: absolute; background-color: white; border: 1px solid #D3D3D3; text-align: left; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; box-sizing: border-box; z-index: 2; } rg-context-menu .menu.isvisible, [riot-tag="rg-context-menu"] .menu.isvisible{ display: block; } rg-context-menu .item, [riot-tag="rg-context-menu"] .item{ cursor: pointer; padding: 10px; border-top: 1px solid #E8E8E8; background-color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } rg-context-menu .item:first-child, [riot-tag="rg-context-menu"] .item:first-child{ border-top: 0; } rg-context-menu .item:hover, [riot-tag="rg-context-menu"] .item:hover{ background-color: #f3f3f3; } rg-context-menu .item.inactive, [riot-tag="rg-context-menu"] .item.inactive{ color: #8a8a8a; font-style: italic; } rg-context-menu .item.inactive:hover, [riot-tag="rg-context-menu"] .item.inactive:hover{ background-color: #fff; }', function (opts) {
  var _this = this;

  var handleClickOutside = function handleClickOutside(e) {
    if (!_this.root.contains(e.target)) {
      if (_this.RgContextMenu.onclose && _this.RgContextMenu.isvisible) _this.RgContextMenu.onclose(e);
      _this.RgContextMenu.isvisible = false;
    }
  };

  var openMenu = function openMenu(e) {
    e.preventDefault();
    if (_this.RgContextMenu.onopen) _this.RgContextMenu.onopen(e);
    _this.RgContextMenu.isvisible = true;

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
    _this.RgContextMenu = opts.menu || new RgContextMenu(opts);
    _this.RgContextMenu.on('update', function () {
      _this.update();
    });
    document.addEventListener('click', handleClickOutside);
    var targets = document.querySelectorAll('[rg-context-menu]');
    for (var i = 0, target; target = targets[i]; i++) {
      if (target.attributes['rg-context-menu'].value == _this.RgContextMenu.name) target.addEventListener('contextmenu', openMenu);else target.addEventListener('contextmenu', _this.closeMenu);
    }
    _this.update();
  });

  this.on('unmount', function () {
    document.removeEventListener('click', handleClickOutside);
    var targets = document.querySelectorAll('[rg-context-menu]');
    for (var i = 0, target; target = targets[i]; i++) {
      if (target.attributes['rg-context-menu'].value == _this.RgContextMenu.name) target.removeEventListener('contextmenu', openMenu);else target.removeEventListener('contextmenu', _this.closeMenu);
    }
  });

  this.closeMenu = function () {
    _this.RgContextMenu.isvisible = false;
  };

  this.selectItem = function (item) {
    item = item.item;
    _this.RgContextMenu.select(item);
  };
});

riot.tag('rg-credit-card-number', '<input type="text" name="cardnumber" class="field card-no { RgCreditCard.icon } { valid: RgCreditCard.valid }" oninput="{ validate }" placeholder="{ RgCreditCard.placeholder }">', 'rg-credit-card-number .field, [riot-tag="rg-credit-card-number"] .field{ font-size: 1em; padding: 10px; border: 1px solid #D3D3D3; box-sizing: border-box; outline: none; } rg-credit-card-number .card-no, [riot-tag="rg-credit-card-number"] .card-no{ padding-right: 60px; background-repeat: no-repeat; background-position: right center; background-size: 60px; } rg-credit-card-number .amex, [riot-tag="rg-credit-card-number"] .amex{ background-image: url(img/amex.png); } rg-credit-card-number .diners_club, [riot-tag="rg-credit-card-number"] .diners_club{ background-image: url(img/diners_club.png); } rg-credit-card-number .discover, [riot-tag="rg-credit-card-number"] .discover{ background-image: url(img/discover.png); } rg-credit-card-number .jcb, [riot-tag="rg-credit-card-number"] .jcb{ background-image: url(img/jcb.png); } rg-credit-card-number .mastercard, [riot-tag="rg-credit-card-number"] .mastercard{ background-image: url(img/mastercard.png); } rg-credit-card-number .visa, [riot-tag="rg-credit-card-number"] .visa{ background-image: url(img/visa.png); }', function (opts) {
  var _this = this;

  var setUI = function setUI() {
    if (_this.cardnumber.value != _this.RgCreditCard.cardnumber) _this.cardnumber.value = _this.RgCreditCard.cardnumber;
    _this.RgCreditCard.validate();
  };

  this.on('mount', function () {
    _this.RgCreditCard = opts.card || new RgCreditCard(opts);
    _this.RgCreditCard.on('update', function () {
      _this.update();
    });
    _this.on('update', function () {
      setUI();
    });
    _this.update();
  });

  this.validate = function () {
    _this.RgCreditCard.cardnumber = _this.cardnumber.value;
    _this.RgCreditCard.validate();
  };
});

riot.tag('rg-date', '<div class="container { open: RgDate.isvisible }"> <input type="text" class="field" onclick="{ open }" value="{ RgDate.dateFormatted }" readonly> <div class="calendar" show="{ RgDate.isvisible }"> <div class="grid grid-row" if="{ RgDate.showYears }"> <div class="selector" onclick="{ prevYear }">&lsaquo;</div> <span class="year">{ RgDate.year }</span> <div class="selector" onclick="{ nextYear }">&rsaquo;</div> </div> <div class="grid grid-row" if="{ !RgDate.showYears }"> <span class="year fill">{ RgDate.year }</span> </div> <div class="grid grid-row" if="{ RgDate.showMonths }"> <div class="selector" onclick="{ prevMonth }">&lsaquo;</div> <span class="month">{ RgDate.month }</span> <div class="selector" onclick="{ nextMonth }">&rsaquo;</div> </div> <div class="grid grid-row" if="{ !RgDate.showMonths }"> <span class="month fill">{ RgDate.month }</span> </div> <div class="grid grid-row"> <span class="day-name" each="{ day in RgDate.dayNames }">{ day }</span> </div> <div class="grid grid-wrap"> <div each="{ day in startBuffer }" onclick="{ select }" class="date { in: day.inMonth, selected: day.selected, today: day.today }"> { day.date.format(this.RgDate.dayFormat) } </div> <div each="{ day in days }" onclick="{ select }" class="date { in: day.inMonth, selected: day.selected, today: day.today }"> { day.date.format(this.RgDate.dayFormat) } </div> <div each="{ day in endBuffer }" onclick="{ select }" class="date { in: day.inMonth, selected: day.selected, today: day.today }"> { day.date.format(this.RgDate.dayFormat) } </div> </div> <div if="{ RgDate.showToday }" class="grid grid-row"> <a class="shortcut" onclick="{ setToday }">Today</a> </div> </div> </div>', 'rg-date .container, [riot-tag="rg-date"] .container{ position: relative; display: inline-block; cursor: pointer; } rg-date .field, [riot-tag="rg-date"] .field{ font-size: 1em; padding: 10px; border: 1px solid #D3D3D3; cursor: pointer; box-sizing: border-box; outline: none; } rg-date .calendar, [riot-tag="rg-date"] .calendar{ position: absolute; text-align: center; background-color: white; border: 1px solid #D3D3D3; padding: 5px; width: 330px; margin-top: 10px; left: 50%; transform: translate3d(-50%, 0, 0); -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; box-sizing: border-box; z-index: 1; } rg-date .grid, [riot-tag="rg-date"] .grid{ display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-align-items: center; -ms-flex-align: center; align-items: center; } rg-date .grid-wrap, [riot-tag="rg-date"] .grid-wrap{ width: 100%; -webkit-flex-wrap: wrap; -ms-flex-wrap: wrap; flex-wrap: wrap; } rg-date .grid-row, [riot-tag="rg-date"] .grid-row{ height: 35px; } rg-date .selector, [riot-tag="rg-date"] .selector{ font-size: 2em; font-weight: 100; padding: 0; -webkit-flex: 0 0 15%; -ms-flex: 0 0 15%; flex: 0 0 15%; } rg-date .year, [riot-tag="rg-date"] .year,rg-date .month, [riot-tag="rg-date"] .month{ text-transform: uppercase; font-weight: normal; -webkit-flex: 0 0 70%; -ms-flex: 0 0 70%; flex: 0 0 70%; } rg-date .fill, [riot-tag="rg-date"] .fill{ -webkit-flex: 0 0 100%; -ms-flex: 0 0 100%; flex: 0 0 100%; } rg-date .day-name, [riot-tag="rg-date"] .day-name{ font-weight: bold; -webkit-flex: 0 0 14.28%; -ms-flex: 0 0 14.28%; flex: 0 0 14.28%; } rg-date .date, [riot-tag="rg-date"] .date{ -webkit-flex: 0 0 14.28%; -ms-flex: 0 0 14.28%; flex: 0 0 14.28%; padding: 12px 10px; box-sizing: border-box; font-size: 0.8em; font-weight: normal; border: 1px solid transparent; color: #cacaca; } rg-date .date:hover, [riot-tag="rg-date"] .date:hover{ background-color: #f3f3f3; } rg-date .date.in, [riot-tag="rg-date"] .date.in{ color: inherit; } rg-date .today, [riot-tag="rg-date"] .today{ border-color: #ededed; } rg-date .selected, [riot-tag="rg-date"] .selected,rg-date .selected:hover, [riot-tag="rg-date"] .selected:hover{ background-color: #ededed; border-color: #dedede; } rg-date .shortcut, [riot-tag="rg-date"] .shortcut{ -webkit-flex: 0 0 100%; -ms-flex: 0 0 100%; flex: 0 0 100%; color: #6495ed; }', function (opts) {
  var _this = this;

  var handleClickOutside = function handleClickOutside(e) {
    if (!_this.root.contains(e.target)) _this.RgDate.close();
    _this.update();
  };

  var dayObj = function dayObj(dayDate) {
    var dateObj = dayDate || moment();

    return {
      date: dateObj,
      selected: _this.RgDate.date.isSame(dayDate, 'day'),
      today: moment().isSame(dayDate, 'day'),
      inMonth: _this.RgDate.date.isSame(dayDate, 'month')
    };
  };

  var buildCalendar = function buildCalendar() {
    var begin = moment(_this.RgDate.date).startOf('month');
    var end = moment(_this.RgDate.date).endOf('month');

    _this.days = [];
    _this.startBuffer = [];
    _this.endBuffer = [];

    for (var i = begin.weekday(); i >= 0; i -= 1) {
      var bufferDate = moment(begin).subtract(i, 'days');
      _this.startBuffer.push(dayObj(bufferDate));
    }

    for (var i = end.date() - 1; i > 0; i -= 1) {
      var current = moment(begin).add(i, 'days');
      _this.days.unshift(dayObj(current));
    }

    for (var i = end.weekday(); i < 6; i += 1) {
      var bufferDate = moment(end).add(i, 'days');
      _this.endBuffer.push(dayObj(bufferDate));
    }
  };

  this.on('mount', function () {
    _this.RgDate = opts.date || new RgDate(opts);
    _this.RgDate.on('update', function () {
      _this.update();
    });
    _this.on('update', function () {
      buildCalendar();
    });
    document.addEventListener('click', handleClickOutside);
    _this.update();
  });

  this.on('unmount', function () {
    document.removeEventListener('click', handleClickOutside);
  });

  this.open = function () {
    _this.RgDate.open();
  };

  this.prevYear = function () {
    _this.RgDate.prevYear();
  };

  this.nextYear = function () {
    _this.RgDate.nextYear();
  };

  this.prevMonth = function () {
    _this.RgDate.prevMonth();
  };

  this.nextMonth = function () {
    _this.RgDate.nextMonth();
  };

  this.setToday = function () {
    _this.RgDate.setToday();
  };

  this.select = function (e) {
    _this.RgDate.select(e.item.day.date);
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

  this.on('mount', function () {
    _this.RgInclude = opts.include || new RgInclude(opts);
    _this.RgInclude.on('update', function () {
      _this.RgInclude.fetch();
    });
    _this.RgInclude.on('fetch', function (content) {
      if (_this.RgInclude.unsafe) _this.root.innerHTML = content;else _this.responseText = content;
      _this.update();
    });
    _this.RgInclude.fetch();
  });
});

riot.tag('rg-loading', '<div class="loading { visible: RgLoading.isvisible }"> <div class="overlay"></div> <div class="content"> <yield></yield> </div> </div>', 'rg-loading .loading, [riot-tag="rg-loading"] .loading{ display: none; } rg-loading .visible, [riot-tag="rg-loading"] .visible{ display: block; } rg-loading .overlay, [riot-tag="rg-loading"] .overlay{ position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.8); z-index: 200; } rg-loading .content, [riot-tag="rg-loading"] .content{ position: absolute; width: 95%; max-width: 420px; top: 50%; left: 50%; transform: translate3d(-50%, -50%, 0); background-color: transparent; color: #fff; text-align: center; z-index: 201; }', function (opts) {
  var _this = this;

  this.on('mount', function () {
    _this.RgLoading = opts.loading || new RgLoading(opts);
    _this.RgLoading.on('update', function () {
      _this.update();
    });
    _this.update();
  });
});

riot.tag('rg-map', '<div class="rg-map"></div>', 'rg-map .rg-map, [riot-tag="rg-map"] .rg-map{ margin: 0; padding: 0; width: 100%; height: 100%; } rg-map .rg-map img, [riot-tag="rg-map"] .rg-map img{ max-width: inherit; }', function (opts) {
  var _this = this;

  this.on('mount', function () {
    _this.RgMap = opts.map || new RgMap(opts);
    /* istanbul ignore next */
    rg.map.on('initialize', function () {
      rg.map.obj = new google.maps.Map(_this.root.querySelector('.rg-map'), _this.RgMap.options);
    });

    if (!document.getElementById('gmap_script')) {
      var script = document.createElement('script');
      script.setAttribute('id', 'gmap_script');
      script.type = 'text/javascript';
      script.src = 'https://maps.googleapis.com/maps/api/js?callback=rg.map.initialize';
      document.body.appendChild(script);
    }
  });
});

riot.tag('rg-markdown', '<div class="markdown"></div>', function (opts) {
  var _this = this;

  this.on('mount', function () {
    _this.RgMarkdown = opts.markdown || new RgMarkdown(opts);
    _this.RgMarkdown.on('update', function () {
      _this.RgMarkdown.fetch();
    });
    _this.RgMarkdown.on('fetch', function (md) {
      _this.RgMarkdown.parse(md);
    });
    _this.RgMarkdown.on('parse', function (content) {
      _this.root.innerHTML = content;
      _this.update();
    });
    _this.RgMarkdown.fetch();
  });
});

riot.tag('rg-modal', '<div class="overlay { visible: RgModal.isvisible, ghost: RgModal.ghost, dismissable: RgModal.dismissable }" onclick="{ close }"></div> <div class="modal { visible: RgModal.isvisible, ghost: RgModal.ghost, dismissable: RgModal.dismissable }"> <header class="header"> <button if="{ RgModal.dismissable }" type="button" class="close" aria-label="Close" onclick="{ close }"> <span aria-hidden="true">&times;</span> </button> <h3 class="heading"><rg-raw content="{ RgModal.heading }"></rg-raw></h3> </header> <div class="body"> <yield></yield> </div> <footer class="footer"> <button class="button" each="{ RgModal.buttons }" type="button" onclick="{ action }" riot-style="{ style }"> <rg-raw content="{ content }"></rg-raw> </button> <div class="clear"></div> </footer> </div>', 'rg-modal .overlay, [riot-tag="rg-modal"] .overlay{ display: none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.8); z-index: 50; } rg-modal .overlay.dismissable, [riot-tag="rg-modal"] .overlay.dismissable{ cursor: pointer; } rg-modal .modal, [riot-tag="rg-modal"] .modal{ display: none; position: absolute; width: 95%; max-width: 500px; font-size: 1.1em; top: 50%; left: 50%; transform: translate3d(-50%, -50%, 0); background-color: white; color: #252519; z-index: 101; } rg-modal .modal.ghost, [riot-tag="rg-modal"] .modal.ghost{ background-color: transparent; color: white; } rg-modal .visible, [riot-tag="rg-modal"] .visible{ display: block; } rg-modal .header, [riot-tag="rg-modal"] .header{ position: relative; text-align: center; } rg-modal .heading, [riot-tag="rg-modal"] .heading{ padding: 20px 20px 0 20px; margin: 0; font-size: 1.2em; } rg-modal .modal.ghost .heading, [riot-tag="rg-modal"] .modal.ghost .heading{ color: white; } rg-modal .close, [riot-tag="rg-modal"] .close{ position: absolute; top: 5px; right: 10px; padding: 0; font-size: 1.2em; border: 0; background-color: transparent; color: #000; cursor: pointer; outline: none; } rg-modal .modal.ghost .close, [riot-tag="rg-modal"] .modal.ghost .close{ color: white; } rg-modal .body, [riot-tag="rg-modal"] .body{ padding: 20px; } rg-modal .footer, [riot-tag="rg-modal"] .footer{ padding: 0 20px 20px 20px; } rg-modal .button, [riot-tag="rg-modal"] .button{ float: right; padding: 10px; margin: 0 5px 0 0; border: none; font-size: 0.9em; text-transform: uppercase; cursor: pointer; outline: none; background-color: white; } rg-modal .modal.ghost .button, [riot-tag="rg-modal"] .modal.ghost .button{ color: white; background-color: transparent; } rg-modal .clear, [riot-tag="rg-modal"] .clear{ clear: both; }', function (opts) {
  var _this = this;

  this.on('mount', function () {
    _this.RgModal = opts.modal || new RgModal(opts);
    _this.RgModal.on('update', function () {
      _this.update();
    });
    _this.update();
  });

  this.close = function () {
    if (_this.RgModal.dismissable) _this.RgModal.isvisible = false;
  };
});

riot.tag('rg-phone-sim', '<div class="emulator"> <iframe class="screen" riot-src="{ RgPhoneSim.url }"></iframe> </div>', 'rg-phone-sim .emulator, [riot-tag="rg-phone-sim"] .emulator{ position: relative; width: 365px; height: 792px; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAW0AAAMYCAMAAAA3r0ZLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRFMDk6+vr6KTM0lJucMz4/PklKJS8wLTg5Qk1OxsjILzo7gomJ2NvbdH5/ho2O9fb2KzY3ztHRPEdIOkVGZWxtjJSVOEJDkpeYWGRluL2+KTQ1vcHBoaWlPUZHcnp6nKKjOkRF1NfXqa2tp62tZnBxanV2VmFiZ29wVl1eaXJzbXR04uTktbq7QElK1tnZipKTi5CRTlZXpKioo6mqXmlqUVlaOEFCSVFSUFxdISssT1tcTlpbJC4vIiwtTVlaJjAxIy0uTFhZS1dYJzEyKDIzSlZXPUhJOURFO0ZHSVVWKzU2P0pLKjQ1OENEND0+QEtMLDY3SFRVN0JDQ05PLTc4ND9ANUBBQUxNNkFCR1NUMTo7RE9QLjg5N0BBR1JTRlJTLzk6RVFSMjs8RVBRRlFSNj9AMzw9SFNUMj0+IissMTs8MDo7SVRVRFBRMDs8MTw9IiwsMz0+Mjw9SlVWQ09QLjk6NT4/S1ZXND4/JC4uQU1OIy0tQk5PTFdYTVhZQExNTllaJS8vJzIyP0tMLzg5LDc4KDMzNT9AKjU1N0FCNkBBJjAwIywtMDs7Mj09NkFBJjExLjk5LDc3N0JCNUBAKjU2MTw8LDU2Ljc4OUNEKDEyQU1NPEhIPEhJO0dHOkZGND8/Qk5ORFBQQ09PLTY3OUREPkpKPkpLPUlJT1pbP0tLJTAwPUlKJzAxKjM07u/vKTIzsbW2YGprtLm50tXWPkhJo6endn+A3d/f6uvreoOEg4yN2tvc/Pz8n6am8/T0VFtcm6CgJS4v4OLi5ufnYGdncnt8dHp7gYaHJC0uu8DAjJGRQkxNxMfHKzQ1YGtsS1NUaXN0bnh5yMzMyszMy83Oy8/PdoCAKDIy7O3tT1dYuLu70NTUbXd46Onq6erreoCA2dzc8PHx8vPz5OXlnaSkn6Wmqq6ucHZ2t7y8o6eoeoSEkJaWm5+gW2ZnZG5vqa+wOEFB09bWtru7qrCwcXd4t7u83eDgzM7O7/DwNT4+7e7uwMPDwcPEeH5/////70wnUQAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAA+NSURBVHja7N13nBTlGcDxEQI5AmJQBAkcnqhEDIhoWMt5iogmQbOaYNrqYrJh16gplmTVkILJpYCmF+DSE1JIcjRR7L333ntPYjQxvTl55tnr7N7t7uw+vDP3+/0x3G3hs5+vr++8M7s7eH75Xb5x+rOjN017aeq+tO++U1+atmn0s9M3Xl6BoFfm466ZOPROhIt259CJ19RS++7LdgW133a97O7aaI/a+VE0y+jRnUeF1p6wqfvvaz6+YVjT0jMyJ3rkeSdmzljaNKzh+OZuoE0TQmmvv67zLzrwmMY8wkXLNx5zYCfTdeur1p6wdeegblgKar8tbegc4lv/rirtjTMLT99/UVMKzgFLNS3avwA2c2Pl2n8tPHV1QxLJMks2rC6g/alC7ScvKozrhhyIFZRrKIzvi56sRHt94b/RIsZ1xeN7UYFuffna4/UJB68Er4rGHax648vUfmqkPnxBBrmqyixQv5FPlaP9Dz2eWdIEW9U1LdFjnQsG1n5ETz4dyowdavY+VE9XPTKQ9phddPfICjvk6lt3lruM6V97j132l26BK3S3BJAv79Gf9jN3BY85HKsadHhAedebSmtf+ofgEcOQqknDAsyLLi2pPTq4/0icatSRAefoUto7Bvc2oFSzGgLQHYtr3xTct5DVSA1XJgsD0puKaa99s9wzlwPImh5WzhXTl/5TRHt7uaN5GUI1bVmzqL64ufZfgkF/GD417rCA9e99tf8VzCPHoVPzjhPXaVv10d5bblzCyZE6nDIJ5pKde2u/Egz487Cp1zHlHr20h8otp50ETT2WgaeL7dCe2vcF/uOQqUsrA9z7emgHQ3thdEZLLpeL0kHYwq7BrdqjAv2ofEAnlU0EZaPjvTTgHdWlvXeEhnYu0VkuUoN7707tbW6X35oiciyc6C4yZxmaxPf2bTq0z5VfTo/IC8/20M5GZnAHy5JzO7Tvj85bCKlEzyIzdQdvLNxf0L4wmMQjMgnmemlHZubOBcQXqvb0CO0jk720o3OmIdhPTlft4FTrth5ju55tK8bbq/YG+emUiLzqTC/t6Lz1cYoYbwi0r47QisTz0j2w0xE6ngxWJVeLdrD+WxCZVx3J9ba0QNeAnj9T/twuOi87GcF9pLSdKM8U7Q2rV6+O0jcQMoXJJB2t96tzorzB99Y2NzfPjdQL9zLJZDJynw2YK85rvZ1ku9Cjuq+4xXknb4Js+XxU/WsQ5wnec7LlDcn6d544P+ddLFu+zlT/Vorzxd5k2fIJqfq3TJwney/Lls+RGBwniPPL3g6y5aOWBstWcd7BmypbLjhS/1LiPNWTTTMWBik02mijTWijTWijjTbFVTuZTqSTRW8OUzqJdpGyxT89mU2ELYv25kO4+LvnyUT4kmj3LV38YzjpGmin3dReIm2pF9BlU+LmMDmnrdBbUntQje0trj2o5m2FPlBiTWKQQm9R7cG03nZAexCFNtpoE9poE9poo01oo01oo01oo4021VT7MxIUBik02mijTeG1D5agMEih0UYbbUIbbUIbbbQJbbQJbbQJbbTRplppf1qCwiCFRhtttCm89lwJCoMUGm200Sa00Sa00Uab0Eab0Eab0EY73tqnS1AYpNBoo402hdc+VILCIIVGG220CW20CW200Sa00Sa00aYC9GkSFAYpNNpoo01oR0v7bRIUBik02mijTWijTWijjTahjTah7bL2hyUoDFJotNFGm9BGm0ppv0OCwiCFRhtttAlttAlttNEmtOOhfbwEhUEKjTbaaBPaaBPaLmi/T4LCIIVGG220CW20CW200ab6aS+UoDBIodFGG21CG21C2wXt4yQoDFJotNFGm9BGm9BGe7BpL5KgMEih0UYbbUIbbULbBe0PSFAYpNBoo402oY02oY32YNP+oASFQQqNNtpoE9poE9poDzbtj0hQGKTQaKONNqGNNpXS/qkEhUEKfYwEhUEKjTbaaBPaaBPaaA827Y9LUBik0GijjTahHS3tn0lQGKTQCyQoDFJotNFGm9BGm9BGG22qn/anJCgMUmi00Uabwmv/RILCIIVukKAwSKHRRhttQhttQhtttKl+2p+UoDBIodFGG20Kr/09CQqDFPo9EhQGKTTaaKNNaKNNaKONNtVP+7MSFAYpNNpoo03htY+UoDBIodFGG21CG21CG220Ce14aH9egsIghUYb7bhq/1qCwiCFPlyCwiCFRhtttAlttAlttNEmtNGmSrV/KUFhkEL/QoLCIIUeJkFhkEKjjTbahDbahDbaaBPaaFOl2r+VoDBIoX8lQWGQQh8mQWGQQqONNtqENtqENtpoE9poE9oua/9AgsIghf6+BIVBCr2tBIVBCo022mgT2mgT2mijTWijTWi7rP1DCQqDFPqtEhQGKTTaaKNNaKNNaKONNqGNNqHtsvaPJCgMUujtJCgMUmi00Uab0Eab0EYbbUIbbUIbbSpAv0WCwiCFRhtttAlttAlttNEmtNEmtF3W/rkEhUEKvVKCwiCFfrsEhUEKjTbaaBPaaBPaaKNNaKNNaLusPU6CwiCFfqcEhUEKjTbaaBPaaBPaaKNNaMdD+1sSFAYpNNqW2kslKAxSaLQttd8rQWGQQqONNtqENtqENtpoU/20vyZBYZBCo22pvUyCwiCFRttS+90SFAYpNNpoo01oo01oo4021U/72xIUBik02pbaX5KgMEih0UY7rtrvkqAwSKHRRhttQhttQhtttKl+2j+WoDBIoc+QoDBIodFGG20Kr/0aCQqDFBpttNEmtNEmtNFGm+qnfYoEhUEKjTbaaBPa0dL+kASFQQqNNtpoE9poE9ouaH9VgsIghUbbUvtUCQqDFBpttNEmtKOl/TEJCoMUGm200Sa00aZS2t+VoDBIodG21D5RgsIghUYbbbQJbbSplPZHJSgMUmi00Uab0EabSml/RYLCIIVG21L7JAkKgxQabbTRJrTRplLar5OgMEih0UYbbUIbbULbBe33S1AYpNBoo402oY02oY32YNP+hASFQQqNNtpoE9rR0v6GBIVBCo22pfaxEhQGKTTaaKNNaKNNaKM92LRfK0FhkEKjjTbahDbaVEr7aAkKgxQabbTRJrTRJrTRRpvqp/0FCQqDFBpttOOq/U0JCoMUGm1L7aMkKAxSaLTRRpvQRpvQRhttQjse2q+XoDBIodFGG21CO1ra8yUoDFJotNFGm9BGm9BGG21CG22qVPs7EhQGKTTaltpflqAwSKHRRjuu2kdIUBik0GijjTahjTahjTbahDbaVKn2GyQoDFJotNFGm8JrD5GgMEih0UYbbUIbbUIbbbQJbbQJbbSpAP1FCQqDFBpttNGm8NrzJCgMUmi00Uab0Eab0EYbbUIbbUIbbULbXvtzEhQGKTTaaMdV+xAJCoMUGm200Sa00Sa00Uab0Eab0Eab0EY73tpfl6AwSKHRttQ+SILCIIVGG220CW20CW200Sa00Sa00Sa00UabaqV9tgSFQQqNtqX2byQoDFLo4RIUBik02mijTWijTWijjTahjTahjTZFVTuVymQyqRTa9S6TzGcTnaWz+VwK7TqVyyc2L5tMoV376SOZTpQom4uO9lmS+9b5RH+lo+Ct0FHQTiYGKptCu0a7xj5zSDqdzmbTfSeWZCS0D5AiM7DT+Vyme3rJJLMRGt4K7bp2D9B8psjOs8f9GbRD7h67MUst9TLdD8mhHQq7a3bO9zNP5CIxebuvnS5v1HYvEHNoh56z8wPuAHPuz92ua+crmB+6uFNoV3depKLJuPPRabSr2kNWuOfrfHwe7eon7WTF/y9k0K52HslW/pQ02tUu/ira6SVdXnW7rJ2sav2cdnhwu6ydrnge0aN4hwe3w9q5Knd4eXcHt8Pa2SoXcxl3lyXuaqeqRss7u+Z2VztZ1azdY3C7qn2m5OhEUtUJvbSrU4lCO6kd4gRT3tVVibPamaonknDPHZzayTDj09WJW6HnSK69sHyY92HSjp7mVmgXtbNh9nRZR3eTzmqHGp55R9+gRBvtsDu6pKNLQLTRRjt687aj2kfJppW9ZN1rFeflau6adhzX2606hzTKdgXHknXvWHFu9GbJ9mjOk9S9o8V5lje2MJ84VRzPAS4X57HeaNmucXMJGKvz22vEebQ3RbbzXHtpMXzvZp44T/Huka1zl82N4fuSB4nzPd7jsnXubeAYvud+gDg/7vnjHFxwx+/zJMFye5zv+bvLn/Nde3Gx+6zUfFHeXbQnLV68+AHnXl3cPgf4gChPEu1R8qd7372O22dczxLlUaLt/1l+aHV0cMfl89utYvxvP9B+QX66zbnXF6/vJtwmxrur9vnyk4MX84/V927O1mk70H7mHMm9qSRO3ylrDYifUW3/CvlxjefqXBKH70uuEeEr/IL2pJaWFhe/DVLVd4Gd/P7eASI8qUP76YT8stzBF1nF99ydvKzAcvFNPN2h7d8sv7l44bRUxddwcPPLe8PF92a/U3uM/NayymnuKF+fZFXAO6ZL23/C0cEdj2vvBEP7Cb9be2KLozN3HK4rFczaLRN7aPuvOros8WJwzbRgQfKq31N7ROC/xs1Xu/n1ALNRuh7gkID23l7a/p5y05xjPfeHd9Sudblijsi+6PfWvjApNzr7z3pG+DquB4nrjG36aPu/d3gu8aJ7jeI1Aetefl9t/wVXF91dy+piAzzt9vW3dan9N39z7cdODdYlrS6/9shdW741WI+c+lgRbf/5FlePcfpMKtH5dxOC45qW5/1i2v7I4L42j2pVWwA60i+u7Y8N7l2HUo1aF3CO9Utpb7VbcP8QnGp3WLPbViW1/Uv2gbum2Ptc4pfW9v/ZGDxmHlahmxdANt7r96ft/0+521vhCrf0a1fs//r9a/u3zjhZumoFYmFOjlwVIM641R9I239ldvDIxcsxq7rliwPC2a/4A2v7D14bPPbkNmaTKmeRNvW79kG/HG3fn6wPP5PhXdXAPlP1JheDLartX6lPOPlsZu+KZ+z2At2Vfvna/pjdTtCYTiqcRApsV6z3K9H2/fGF553Txvgue1y3nVNAG18KtaS2P2Ja4akntDN/lzVft3d4vXGEX7m27+81q+P5N7atQrPfVrXd2GE1a69+RPvTlr3lHft11NJ+BFNKiQnkiPaWTqY7/tivZ//avn/+7P26ahl+yJD5q1a0sufUPWLrilXzhxwyvKUbaPb5A2gOpC3z956N+9HANe05YkDLgbWlh0fOQLPfZox8uBzIsrSlC6Zcj3gJ6eunXFCmYrnaQWtHTLph7EONresQlta1Nj409oZJI9ZWIPh/AQYA2whzWlA9R/cAAAAASUVORK5CYII=\'); background-repeat: no-repeat; background-position: center; background-size: cover; } rg-phone-sim .screen, [riot-tag="rg-phone-sim"] .screen{ position: absolute; top: 105px; left: 22px; background-color: white; width: 320px; height: 568px; border: 0; }', function (opts) {
  var _this = this;

  this.on('mount', function () {
    _this.RgPhoneSim = opts.phonesim || new RgPhoneSim(opts);
    _this.RgPhoneSim.on('update', function () {
      _this.update();
    });
    _this.update();
  });
});

riot.tag('rg-placeholdit', '<img riot-src="https://placeholdit.imgix.net/~text?bg={ RgPlaceholdit.background }&txtclr={ RgPlaceholdit.color }&txt={ RgPlaceholdit.text }&txtsize={ RgPlaceholdit.textsize }&w={ RgPlaceholdit.width }&h={ RgPlaceholdit.height }&fm={ RgPlaceholdit.format }">', function (opts) {
  var _this = this;

  this.on('mount', function () {
    _this.RgPlaceholdit = opts.placeholdit || new RgPlaceholdit(opts);
    _this.RgPlaceholdit.on('update', function () {
      _this.update();
    });
    _this.update();
  });
});

riot.tag('rg-raw', '<span></span>', function (opts) {
  this.on('mount update', function () {
    this.root.innerHTML = opts.content || '';
  });
});

riot.tag('rg-select', '<div class="container { visible: RgSelect.isvisible }" riot-style="width: { width }"> <input if="{ !RgSelect.autocomplete }" type="text" name="selectfield" class="field { visible: RgSelect.isvisible }" value="{ fieldText }" placeholder="{ RgSelect.placeholder }" onkeydown="{ handleKeys }" onclick="{ toggle }" readonly> <input if="{ RgSelect.autocomplete }" type="text" name="autocompletefield" class="field { visible: RgSelect.isvisible }" value="{ fieldText }" placeholder="{ RgSelect.placeholder }" onkeydown="{ handleKeys }" onclick="{ toggle }" oninput="{ filter }"> <div class="dropdown { isvisible: RgSelect.isvisible } { empty: RgSelect.filtereditems.length == 0 }"> <div class="filter" if="{ RgSelect.hasfilter && !RgSelect.autocomplete }"> <input type="text" name="filterfield" class="filter-box" placeholder="{ RgSelect.filterplaceholder || \'Filter\' }" onkeydown="{ handleKeys }" oninput="{ filter }"> </div> <ul class="list { empty: RgSelect.filtereditems.length == 0 }"> <li each="{ RgSelect.filtereditems }" onclick="{ parent.select }" class="item { selected: selected, disabled: disabled, active: active }"> { text } </li> </ul> </div> </div>', 'rg-select .container, [riot-tag="rg-select"] .container{ position: relative; display: inline-block; cursor: pointer; } rg-select .field, [riot-tag="rg-select"] .field{ width: 100%; padding: 10px; border: 1px solid #D3D3D3; box-sizing: border-box; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 1em; line-height: normal; outline: 0; } rg-select .dropdown, [riot-tag="rg-select"] .dropdown{ display: none; position: absolute; width: 100%; background-color: white; border-bottom: 1px solid #D3D3D3; box-sizing: border-box; overflow-y: auto; overflow-x: hidden; max-height: 280px; z-index: 10; } rg-select .dropdown.isvisible, [riot-tag="rg-select"] .dropdown.isvisible{ display: block; } rg-select .dropdown.empty, [riot-tag="rg-select"] .dropdown.empty{ border-bottom: 0; } rg-select .filter-box, [riot-tag="rg-select"] .filter-box{ width: 100%; padding: 10px; font-size: 0.9em; border: 0; border-left: 1px solid #D3D3D3; border-right: 1px solid #D3D3D3; border-bottom: 1px solid #E8E8E8; outline: none; color: #555; box-sizing: border-box; } rg-select .list, [riot-tag="rg-select"] .list,rg-select .item, [riot-tag="rg-select"] .item{ list-style: none; padding: 0; margin: 0; } rg-select .list.empty, [riot-tag="rg-select"] .list.empty{ display: none; } rg-select .item, [riot-tag="rg-select"] .item{ padding: 10px; border-left: 1px solid #D3D3D3; border-right: 1px solid #D3D3D3; border-top: 1px solid #E8E8E8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } rg-select .item:first-child, [riot-tag="rg-select"] .item:first-child{ border-top: 0; } rg-select .selected, [riot-tag="rg-select"] .selected{ font-weight: bold; background-color: #f8f8f8; } rg-select .item:hover, [riot-tag="rg-select"] .item:hover{ background-color: #f3f3f3; } rg-select .item.active, [riot-tag="rg-select"] .item.active,rg-select .item:hover.active, [riot-tag="rg-select"] .item:hover.active{ background-color: #ededed; }', function (opts) {
  var _this = this;

  /* istanbul ignore next */
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
      // Get the currently selected item
      var activeIndex = null;
      for (var i = 0; i < length; i++) {
        var item = _this.RgSelect.filtereditems[i];
        if (item.active) {
          activeIndex = i;
          break;
        }
      }

      // We're leaving this item
      if (activeIndex != null) _this.RgSelect.filtereditems[activeIndex].active = false;

      if (e.keyCode == 38) {
        // Move the active state to the next item lower down the index
        if (activeIndex == null || activeIndex == 0) _this.RgSelect.filtereditems[length - 1].active = true;else _this.RgSelect.filtereditems[activeIndex - 1].active = true;
      } else if (e.keyCode == 40) {
        // Move the active state to the next item higher up the index
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
    _this.RgSelect = opts.select || new RgSelect(opts);
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
});

riot.tag('rg-sidemenu', '<div class="overlay { visible: RgSidemenu.isvisible }" onclick="{ close }"></div> <div class="sidemenu { visible: RgSidemenu.isvisible }"> <h4 class="header">{ RgSidemenu.header }</h4> <ul class="items"> <li class="item { active: active }" each="{ RgSidemenu.items }" onclick="{ parent.select }"> <rg-raw content="{ content }"></rg-raw> </li> </ul> <div class="body"> <yield></yield> </div> </div>', 'rg-sidemenu .overlay, [riot-tag="rg-sidemenu"] .overlay{ display: none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.8); cursor: pointer; z-index: 50; } rg-sidemenu .overlay.visible, [riot-tag="rg-sidemenu"] .overlay.visible{ display: block; } rg-sidemenu .sidemenu, [riot-tag="rg-sidemenu"] .sidemenu{ position: absolute; top: 0; left: 0; height: 100%; width: 260px; overflow-y: auto; overflow-x: hidden; -webkit-overflow-scrolling: touch; background-color: black; color: white; transform: translate3d(-100%, 0, 0); transition: transform 0.5s ease; z-index: 51; } rg-sidemenu .sidemenu.visible, [riot-tag="rg-sidemenu"] .sidemenu.visible{ transform: translate3d(0, 0, 0); } rg-sidemenu .header, [riot-tag="rg-sidemenu"] .header{ padding: 1.2rem; margin: 0; text-align: center; color: white; } rg-sidemenu .items, [riot-tag="rg-sidemenu"] .items{ padding: 0; margin: 0; list-style: none; } rg-sidemenu .item, [riot-tag="rg-sidemenu"] .item{ padding: 1rem 0.5rem; box-sizing: border-box; border-top: 1px solid #1a1a1a; color: white; } rg-sidemenu .item:last-child, [riot-tag="rg-sidemenu"] .item:last-child{ border-bottom: 1px solid #1a1a1a; } rg-sidemenu .item:hover, [riot-tag="rg-sidemenu"] .item:hover{ cursor: pointer; background-color: #2a2a2a; } rg-sidemenu .item.active, [riot-tag="rg-sidemenu"] .item.active{ cursor: pointer; background-color: #444; }', function (opts) {
  var _this = this;

  this.on('mount', function () {
    _this.RgSidemenu = opts.sidemenu || new RgSidemenu(opts);
    _this.RgSidemenu.on('update', function () {
      _this.update();
    });
    _this.update();
  });

  this.close = function () {
    _this.RgSidemenu.close();
  };

  this.select = function (e) {
    _this.RgSidemenu.select(e.item);
  };
});

riot.tag('rg-tabs', '<div class="headers"> <div each="{ RgTabs.tabs }" class="header { active: active, disabled: disabled }" onclick="{ parent.select }"> <div class="heading" if="{ heading }"> <rg-raw content="{ heading }"></rg-raw> </div> </div> </div> <div each="{ RgTabs.tabs }" class="tab { active: active }"> <div if="{ rg.isDefined(content) }"> { content } </div> <div if="{ rg.isDefined(include) }"> <rg-include include="{ include }"></rg-include> </div> </div>', 'rg-tabs .headers, [riot-tag="rg-tabs"] .headers{ display: -webkit-flex; display: -ms-flexbox; display: flex; } rg-tabs .header, [riot-tag="rg-tabs"] .header{ -webkit-flex: 1; -ms-flex: 1; flex: 1; box-sizing: border-box; text-align: center; cursor: pointer; box-shadow: 0 -1px 0 0 #000 inset; } rg-tabs .heading, [riot-tag="rg-tabs"] .heading{ padding: 10px; margin: 0; } rg-tabs .header.active, [riot-tag="rg-tabs"] .header.active{ background-color: #000; } rg-tabs .header.active .heading, [riot-tag="rg-tabs"] .header.active .heading{ color: white; } rg-tabs .header.disabled .heading, [riot-tag="rg-tabs"] .header.disabled .heading{ color: #888; } rg-tabs .tab, [riot-tag="rg-tabs"] .tab{ display: none; padding: 10px; } rg-tabs .tab.active, [riot-tag="rg-tabs"] .tab.active{ display: block; }', function (opts) {
  var _this = this;

  this.on('mount', function () {
    _this.RgTabs = opts.tabs || new RgTabs(opts);
    _this.RgTabs.on('update', function () {
      _this.update();
    });
    _this.update();
  });

  this.select = function (e) {
    _this.RgTabs.select(e.item);
  };
});

riot.tag('rg-tags', '<div class="container"> <span class="tags"> <span class="tag" each="{ RgTags.tags }" onclick="{ parent.removeTag }"> { text } <span class="close">&times;</span> </span> </span> <div class="field-container { isvisible: RgTags.isvisible }"> <input type="text" class="field" name="filterfield" placeholder="{ RgTags.placeholder }" onkeydown="{ handleKeys }" oninput="{ filter }" onfocus="{ toggle }"> <div class="dropdown { isvisible: RgTags.isvisible }"> <ul class="list"> <li each="{ RgTags.filtereditems }" onclick="{ parent.addTag }" class="item { disabled: disabled, active: active }"> { text } </li> </ul> </div> </div> </div>', 'rg-tags .container, [riot-tag="rg-tags"] .container{ position: relative; width: 100%; border: 1px solid #D3D3D3; background-color: white; text-align: left; padding: 0; box-sizing: border-box; } rg-tags .field-container, [riot-tag="rg-tags"] .field-container{ position: absolute; display: inline-block; cursor: pointer; } rg-tags .field, [riot-tag="rg-tags"] .field{ width: 100%; padding: 10px; border: 0; box-sizing: border-box; background-color: transparent; white-space: nowrap; font-size: 1em; line-height: normal; outline: 0; } rg-tags .dropdown, [riot-tag="rg-tags"] .dropdown{ display: none; position: absolute; width: 100%; background-color: white; border-bottom: 1px solid #D3D3D3; box-sizing: border-box; overflow-y: auto; overflow-x: hidden; max-height: 280px; margin: -1px 0 0 -1px; } rg-tags .dropdown.isvisible, [riot-tag="rg-tags"] .dropdown.isvisible{ display: block; } rg-tags .list, [riot-tag="rg-tags"] .list,rg-tags .item, [riot-tag="rg-tags"] .item{ list-style: none; padding: 0; margin: 0; } rg-tags .list.empty, [riot-tag="rg-tags"] .list.empty{ display: none; } rg-tags .item, [riot-tag="rg-tags"] .item{ padding: 10px; border-left: 1px solid #D3D3D3; border-right: 1px solid #D3D3D3; border-top: 1px solid #E8E8E8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } rg-tags .item:first-child, [riot-tag="rg-tags"] .item:first-child{ border-top: 0; } rg-tags .item:hover, [riot-tag="rg-tags"] .item:hover{ background-color: #f3f3f3; } rg-tags .item.active, [riot-tag="rg-tags"] .item.active,rg-tags .item:hover.active, [riot-tag="rg-tags"] .item:hover.active{ background-color: #ededed; } rg-tags .tags, [riot-tag="rg-tags"] .tags{ display: inline-block; max-width: 70%; white-space: nowrap; overflow-y: hidden; overflow-x: auto; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } rg-tags .tag, [riot-tag="rg-tags"] .tag{ position: relative; display: inline-block; padding: 8px 20px 8px 5px; margin: 1px; background-color: #000; color: #fff; font-size: 1em; line-height: normal; cursor: pointer; } rg-tags .tag:hover, [riot-tag="rg-tags"] .tag:hover,rg-tags .tag:active, [riot-tag="rg-tags"] .tag:active{ background-color: #666; } rg-tags .close, [riot-tag="rg-tags"] .close{ position: absolute; right: 5px; top: 7px; color: rgba(255, 255, 255, 0.7); }', function (opts) {
  var _this = this;

  /* istanbul ignore next */
  var handleClickOutside = function handleClickOutside(e) {
    if (!_this.root.contains(e.target)) {
      _this.RgTags.close();
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
      // Get the currently selected item
      var activeIndex = null;
      for (var i = 0; i < length; i++) {
        var item = _this.RgTags.filtereditems[i];
        if (item.active) {
          activeIndex = i;
          break;
        }
      }

      // We're leaving this item
      if (activeIndex != null) _this.RgTags.filtereditems[activeIndex].active = false;

      if (e.keyCode == 38) {
        // Move the active state to the next item lower down the index
        if (activeIndex == null || activeIndex == 0) _this.RgTags.filtereditems[length - 1].active = true;else _this.RgTags.filtereditems[activeIndex - 1].active = true;
      } else if (e.keyCode == 40) {
        // Move the active state to the next item higher up the index
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
    _this.RgTags = opts.tags || new RgTags(opts);
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
});

riot.tag('rg-time', '<rg-select select="{ RgTime }"></rg-select>', function (opts) {
  var _this = this;

  var build = function build() {
    _this.RgTime.options = [];

    for (var i = 0; i < 1440; i++) {
      if (i % _this.RgTime.step == 0) {
        var d = new Date(0);
        d.setHours(_this.RgTime.time.getHours());
        d.setMinutes(_this.RgTime.time.getMinutes());
        d = new Date(d.getTime() + i * 60000);
        // Check min range
        if (_this.RgTime.min) {
          if (d.getHours() < _this.RgTime.min[0]) continue;
          if (d.getHours() == _this.RgTime.min[0] && d.getMinutes() < _this.RgTime.min[1]) continue;
        }
        // Check max range
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
        _this.RgTime.options.push(t);
      }
    }
  };

  this.on('mount', function () {
    _this.RgTime = opts.time || new RgTime(opts);
    _this.RgTime.on('update', function () {
      build();
      _this.update();
    });
    build();
    _this.update();
  });
});

riot.tag('rg-toasts', '<div class="toasts { RgToasts.position } { isvisible: RgToasts.isvisible }"> <div each="{ RgToasts.toasts }" class="toast { isvisible: isvisible }" onclick="{ parent.toastClicked }"> <rg-raw content="{ content }"></rg-raw> </div> </div>', 'rg-toasts .toasts, [riot-tag="rg-toasts"] .toasts{ display: none; position: fixed; width: 250px; max-height: 100%; overflow-y: auto; background-color: transparent; z-index: 101; } rg-toasts .toasts.isvisible, [riot-tag="rg-toasts"] .toasts.isvisible{ display: block; } rg-toasts .toasts.topleft, [riot-tag="rg-toasts"] .toasts.topleft{ top: 0; left: 0; } rg-toasts .toasts.topright, [riot-tag="rg-toasts"] .toasts.topright{ top: 0; right: 0; } rg-toasts .toasts.bottomleft, [riot-tag="rg-toasts"] .toasts.bottomleft{ bottom: 0; left: 0; } rg-toasts .toasts.bottomright, [riot-tag="rg-toasts"] .toasts.bottomright{ bottom: 0; right: 0; } rg-toasts .toast, [riot-tag="rg-toasts"] .toast{ display: none; padding: 20px; margin: 20px; background-color: #000; color: white; font-size: 0.9em; cursor: pointer; } rg-toasts .toast.isvisible, [riot-tag="rg-toasts"] .toast.isvisible{ display: block; }', function (opts) {
  var _this = this;

  this.toastClicked = function (e) {
    var toast = e.item;
    if (rg.isFunction(toast.onclick)) toast.onclick();
    if (rg.isFunction(toast.onclose)) toast.onclose();
    window.clearTimeout(toast.timer);
    toast.isvisible = false;
  };

  this.on('mount', function () {
    _this.RgToasts = opts.toasts || new RgToasts(opts);
    _this.RgToasts.on('update', function () {
      _this.update();
    });
    _this.update();
  });
});

riot.tag('rg-toggle', '<div class="wrapper"> <label class="toggle"> <input type="checkbox" __checked="{ RgToggle.checked }" onclick="{ toggle }"> <div class="track"> <div class="handle"></div> </div> </label> </div>', 'rg-toggle .wrapper, [riot-tag="rg-toggle"] .wrapper{ width: 60px; height: 20px; margin: 0; display: inline-block; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } rg-toggle .toggle, [riot-tag="rg-toggle"] .toggle{ position: absolute; cursor: pointer; } rg-toggle input[type=checkbox], [riot-tag="rg-toggle"] input[type=checkbox]{ display: none; } rg-toggle .track, [riot-tag="rg-toggle"] .track{ position: absolute; top: 0; bottom: 0; left: 0; right: 0; width: 60px; height: 20px; padding: 2px; background-color: #b6c0c7; transition: background-color 0.1s linear; box-sizing: border-box; } rg-toggle input[type=checkbox]:checked + .track, [riot-tag="rg-toggle"] input[type=checkbox]:checked + .track{ background-color: #000; } rg-toggle .handle, [riot-tag="rg-toggle"] .handle{ position: relative; left: 0; width: 50%; height: 100%; background-color: white; transition: transform 0.1s linear; } rg-toggle input[type=checkbox]:checked + .track .handle, [riot-tag="rg-toggle"] input[type=checkbox]:checked + .track .handle{ transform: translate3d(100%, 0, 0); }', function (opts) {
  var _this = this;

  this.on('mount', function () {
    _this.RgToggle = opts.toggle || new RgToggle();
    _this.RgToggle.on('update', function () {
      _this.update();
    });
    _this.update();
  });

  this.toggle = function () {
    _this.RgToggle.toggle();
  };
});

riot.tag('rg-unsplash', '<img riot-src="https://unsplash.it/{ greyscale }{ RgUnsplash.width }/{ RgUnsplash.height }/?{ options }">', function (opts) {
  var _this = this;

  this.on('mount', function () {
    _this.RgUnsplash = opts.unsplash || new RgUnsplash();
    _this.RgUnsplash.on('update', function () {
      _this.update();
    });
    _this.on('update', function () {
      _this.options = '';
      if (_this.RgUnsplash.greyscale) _this.greyscale = 'g/';
      if (_this.RgUnsplash.random) _this.options += 'random&';
      if (_this.RgUnsplash.blur) _this.options += 'blur&';
      if (_this.RgUnsplash.image) _this.options += 'image=' + _this.RgUnsplash.image + '&';
      if (rg.isDefined(_this.RgUnsplash.gravity)) _this.options += 'gravity=' + _this.RgUnsplash.gravity;
    });
    _this.update();
  });
});
