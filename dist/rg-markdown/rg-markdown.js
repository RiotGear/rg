riot.tag2('rg-markdown', '', '', '', function(opts) {
var _this = this;

if (commonmark) {
	this.reader = new commonmark.Parser();
	this.writer = new commonmark.HtmlRenderer();
}

this.on('update', function () {
	if (!opts.markdown) opts.markdown = {};
	if (opts.markdown.content) {
		_this.root.innerHTML = _this.writer.render(_this.reader.parse(opts.markdown.content));
	} else if (opts.markdown.url) {
		(function () {
			var req = new XMLHttpRequest();
			req.onload = function (resp) {
				_this.root.innerHTML = _this.writer.render(_this.reader.parse(req.responseText));
			};
			req.open('get', opts.markdown.url, true);
			req.send();
		})();
	}
});
});
