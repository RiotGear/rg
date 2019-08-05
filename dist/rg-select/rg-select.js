riot.tag2('rg-select', '<input type="{opts.select.filter ? \'search\' : \'text\'}" name="selectfield" class="field" placeholder="{opts.select.placeholder}" oninput="{keypress}" onfocus="{open}" readonly="{!opts.select.filter}"> <ul class="menu menu--high" if="{isvisible}"> <li each="{options}" onclick="{parent.select}" class="menu__item {\'menu__item--active\': selected, \'menu__item--disabled\': disabled, \'menu__item--hover\': active}"> {text} </li> </ul>', 'rg-select .menu,[data-is="rg-select"] .menu{ position: absolute; }', '', function(opts) {
/* istanbul ignore next */
if (!opts.select) opts.select = {
  options: []
};

const handleClickOutside = e => {
  if (this.isvisible && !this.root.contains(e.target)) {
    this.close();
    this.update();
  }
};

this.on('mount', () => {
  document.addEventListener('click', handleClickOutside);
  this.update();
});
this.on('unmount', () => {
  document.removeEventListener('click', handleClickOutside);
});

this.keypress = e => {};

this.on('update', () => {
  console.log('v', getValue());
  const r = new RegExp(getValue(), 'i');
  this.options = opts.select.options.filter(o => o.text.match(r));
});

const getValue = () => getInput().value;

const getInput = () => this.root.querySelector('input') || {};

this.open = e => {
  this.isvisible = true;
};

this.close = e => {
  this.isvisible = false;
};
});
