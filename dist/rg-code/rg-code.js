riot.tag2('rg-code', '<div class="editor"></div>', 'rg-code .editor,[riot-tag="rg-code"] .editor { position: absolute; top: 0; right: 0; bottom: 0; left: 0; }', '', function(opts) {
var _this = this;

var editor = undefined;

var setupEditor = function setupEditor() {
	editor.setTheme('ace/theme/' + (opts.editor.theme || 'monokai'));
	editor.getSession().setMode('ace/mode/' + (opts.editor.mode || 'html'));
	editor.getSession().setTabSize(opts.editor.tabsize || 2);
	editor.getSession().setUseSoftTabs(opts.editor.softtabs);
	editor.getSession().setUseWrapMode(opts.editor.wordwrap);
	editor.setReadOnly(opts.editor.readonly);
};

this.on('mount', function () {
	if (!opts.editor) opts.editor = { code: '' };
	editor = ace.edit(_this.root.querySelector('.editor'));
	editor.$blockScrolling = Infinity;

	_this.on('update', function () {
		setupEditor();
		if (opts.editor.code != editor.getValue()) editor.setValue(opts.editor.code, 1);
	});
	if (opts.url) {
		var req = new XMLHttpRequest();
		req.onload = function (resp) {
			opts.editor.code = resp;
			_this.update();
		};
		req.open('get', opts.url, true);
		req.send();
	}
	editor.setValue(opts.editor.code, 1);
	editor.getSession().on('change', function (e) {
		opts.editor.code = editor.getValue();
		_this.trigger('onchange', editor.getValue());
	});
	setupEditor();
	_this.update();
});
});
