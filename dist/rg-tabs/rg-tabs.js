riot.tag2('rg-tabs', '<div class="{css.tab_outer}"> <div class="{css.tab_nav.outer}"> <div each="{tab in opts.tabs.tabs}" class="{css.tab_nav.match(tab)}" onclick="{parent.open}"> {tab.heading} </div> </div> <div each="{tab in opts.tabs.tabs}" class="{css.tab_content.match(tab)}"> {tab.text || tab.include && tab.include.responseText} </div> </div>', '', '', function(opts) {
this.mixin(CSSMixin);
this.on('mount', () => this.update());

const fetch = tab => {
  const req = new XMLHttpRequest();

  req.onload = resp => {
    const activeTab = this.root.querySelector('.tabs__tab--active');
    if (activeTab) activeTab.innerHTML = req.responseText;
    this.trigger('loaded', tab);
  };

  req.open('get', tab.include, true);
  req.send();
  this.trigger('loading', tab);
};

this.open = e => {
  let tab = e.item.tab;

  if (!tab.disabled && !tab.active) {
    opts.tabs.tabs.forEach(tab => tab.active = false);
    this.trigger('open', tab);
    tab.active = true;
  }
};

this.on('update', () => {
  if (!opts.tabs) opts.tabs = {};
  if (!Array.isArray(opts.tabs.tabs)) return;
  opts.tabs.tabs.forEach(tab => {
    if (!tab.disabled && tab.active && tab.include) {
      fetch(tab);
    }
  });
});
});
