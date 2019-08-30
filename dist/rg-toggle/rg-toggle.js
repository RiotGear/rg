riot.tag2('rg-toggle', '<div class="toggle {\'toggle--\' + opts.toggle.type}"> <label class="toggle__wrapper"> <input type="checkbox" checked="{opts.toggle.checked}" onclick="{toggle}"> <div class="toggle__track"> <div class="toggle__handle"></div> </div> </label> </div>', '', '', function(opts) {
opts.toggle = opts.toggle || {};

this.toggle = () => {
  opts.toggle.checked = !opts.toggle.checked;
  this.trigger('toggle', opts.toggle.checked);
};
});
