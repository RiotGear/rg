riot.tag2('rg-raw', '<span></span>', '', '', function(opts) {
this.on('mount', () => this.update());
this.on('update', () => {
  this.root.innerHTML = opts.content || '';
});
});
