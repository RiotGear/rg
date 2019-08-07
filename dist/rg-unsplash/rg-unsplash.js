riot.tag2('rg-unsplash', '<img if="{path}" riot-src="https://unsplash.it/{path}/?{options}">', '', '', function(opts) {
this.on("mount", () => this.update());
this.on('update', () => {
  if (!opts.unsplash) opts.unsplash = {};
  const {
    greyscale,
    width,
    height
  } = opts.unsplash;
  this.path = `${greyscale ? 'g/' : ''}${width || 450}/${height || 250}`;
  this.options = '';
  if (opts.unsplash.random) this.options += 'random&';
  if (opts.unsplash.blur) this.options += 'blur&';
  if (opts.unsplash.image) this.options += 'image=' + opts.unsplash.image + '&';
  if (typeof opts.unsplash.gravity !== 'undefined') this.options += 'gravity=' + opts.unsplash.gravity;
});
});
