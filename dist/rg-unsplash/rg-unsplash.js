riot.tag2('rg-unsplash', '<img riot-src="https://unsplash.it/{opts.unsplash.greyscale}{opts.unsplash.width}/{opts.unsplash.height}/?{options}">', '', '', function(opts) {
var _this = this;

this.on('update', function () {
	_this.options = '';
	if (!opts.unsplash) opts.unsplash = {};
	opts.unsplash.width = opts.unsplash.width || 450;
	opts.unsplash.height = opts.unsplash.height || 250;
	if (opts.unsplash.greyscale) opts.unsplash.greyscale = 'g/';
	if (opts.unsplash.random) _this.options += 'random&';
	if (opts.unsplash.blur) _this.options += 'blur&';
	if (opts.unsplash.image) _this.options += 'image=' + opts.unsplash.image + '&';
	if (typeof opts.unsplash.gravity !== 'undefined') _this.options += 'gravity=' + opts.unsplash.gravity;
});
this.on('mount', function () {
	return _this.update();
});
});
