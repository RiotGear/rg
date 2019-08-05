riot.tag2('rg-placeholdit', '<img riot-src="https://placeholdit.imgix.net/~text?bg={opts.placeholdit.background}&txtclr={opts.placeholdit.color}&txt={opts.placeholdit.text}&txtsize={opts.placeholdit.textsize}&w={opts.placeholdit.width}&h={opts.placeholdit.height}&fm={opts.placeholdit.format}">', '', '', function(opts) {
if (!opts.placeholdit) opts.placeholdit = {};
this.on("mount", () => this.update());
this.on('update', () => {
  opts.placeholdit.width = opts.placeholdit.width || 450;
  opts.placeholdit.height = opts.placeholdit.height || 250;
  opts.placeholdit.background = opts.placeholdit.background || '000';
  opts.placeholdit.color = opts.placeholdit.color || 'fff';
  opts.placeholdit.text = opts.placeholdit.text || `${opts.placeholdit.width} x ${opts.placeholdit.height}`;
  opts.placeholdit.textsize = opts.placeholdit.textsize || 30;
  opts.placeholdit.format = opts.placeholdit.format || 'png';
});
});
