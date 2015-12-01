'use strict';

riot.tag2('rg-raw', '<span></span>', '', '', function (opts) {
	this.on('mount update', function () {
		this.root.innerHTML = opts.content || '';
	});
});