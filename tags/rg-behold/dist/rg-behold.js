'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

riot.tag2('rg-behold', '<div class="container"> <div class="controls"> <div class="modes"> <a onclick="{swipeMode}" class="mode {active: RgBehold.mode == \'swipe\'}">Swipe</a> <a onclick="{fadeMode}" class="mode {active: RgBehold.mode == \'fade\'}">Fade</a> </div> <input type="range" class="ranger" name="diff" value="0" min="0" max="1" step="0.01" oninput="{updateDiff}" onchange="{updateDiff}"> </div> <div class="images"> <div class="image"> <img class="image-2" riot-src="{RgBehold.image2}"> </div> <div class="image fallback"> <img class="image-1" riot-src="{RgBehold.image1}"> </div> </div> </div>', 'rg-behold .controls,[riot-tag="rg-behold"] .controls { text-align: center; } rg-behold .mode,[riot-tag="rg-behold"] .mode { text-decoration: none; cursor: pointer; padding: 0 10px; } rg-behold a.active,[riot-tag="rg-behold"] a.active { font-weight: bold; } rg-behold .ranger,[riot-tag="rg-behold"] .ranger { width: 90%; max-width: 300px; } rg-behold .images,[riot-tag="rg-behold"] .images { position: relative; } rg-behold .image,[riot-tag="rg-behold"] .image { position: absolute; width: 100%; text-align: center; } rg-behold .image img,[riot-tag="rg-behold"] .image img { max-width: 90%; }', '', function (opts) {
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
		_this2.RgBehold = opts.behold || new rg.Behold(opts);
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
	};
}, '{ }');
;(function () {
	window.rg = window.rg || {};
	rg.Behold = (function () {
		function RgBehold(opts) {
			_classCallCheck(this, RgBehold);

			riot.observable(this);
			if (!opts) opts = {};
			this._image1 = opts.image1;
			this._image2 = opts.image2;
			this._mode = opts.mode;
		}

		_createClass(RgBehold, [{
			key: 'update',
			value: function update() {
				this.trigger('update');
			}
		}, {
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
	})();
})();