riot.tag2('rg-bubble', '<div class="context"> <div class="{css.tooltip[opts.direction]}" if="{isvisible}"> {opts.bubble.text} </div> <div class="content" onmouseover="{showBubble}" onmouseout="{hideBubble}" onclick="{toggleBubble}"> <yield></yield> </div> </div>', 'rg-bubble,rg-bubble [data-is="rg-bubble"],[data-is="rg-bubble"] [data-is="rg-bubble"]{ display: inline-block; position: relative; }', '', function(opts) {
this.mixin(CSSMixin);

this.showBubble = () => {
  clearTimeout(this._timer);
  this.isvisible = true;
};

this.hideBubble = () => {
  this._timer = setTimeout(() => {
    this.isvisible = false;
    this.update();
  }, 1000);
};

this.toggleBubble = () => {
  this.isvisible = !this.isvisible;
};
});
