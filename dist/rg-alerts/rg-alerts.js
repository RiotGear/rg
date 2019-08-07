riot.tag2('rg-alerts', '<div class="{css.alert.outer}"> <div each="{opts.alerts}" class="{css.alert[type]}" if="{isvisible}" onclick="{select}"> <button class="{css.button.close}" if="{dismissable != false}" onclick="{parent.dismiss}"> &times; </button> {text} </div> </div>', '', '', function(opts) {
this.mixin(CSSMixin);
this.on("mount", () => this.update());
this.on('update', () => {
  if (!opts.alerts) return;
  opts.alerts.forEach(alert => {
    if (typeof alert.isvisible === 'undefined') alert.isvisible = true;

    if (alert.timeout) {
      alert.startTimer = () => {
        alert.timer = setTimeout(() => {
          this.dismiss({
            item: alert
          });
        }, alert.timeout);
      };

      alert.startTimer();
    }
  });
});

this.dismiss = e => {
  const alert = e.item;
  alert.isvisible = false;
  clearTimeout(alert.timer);
  this.trigger('dismiss', alert);
  this.update();
};

this.select = e => {
  const alert = e.item;
  if (alert.onclick) alert.onclick(alert);
  this.trigger('select', alert);
};
});
