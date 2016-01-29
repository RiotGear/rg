riot.tag2('rg-tabs', '<div class="tabs {\'tabs--\' + opts.tabs.type}"> <div class="tabs__headings"> <div each="{opts.tabs.tabs}" class="tab-heading {\'tab-heading--active\': active, \'tab-heading--disabled\': disabled}" onclick="{parent.open}"> {heading} </div> </div> <div each="{opts.tabs.tabs}" class="tabs__tab {\'tabs__tab--active\': active}"> <div if="{text}"> {text} </div> <div if="{include}"> {include.responseText} </div> </div> </div>', '', '', function(opts) {
var _this = this;

var fetch = function fetch(tab) {
	var req = new XMLHttpRequest();
	req.onload = function (resp) {
		_this.root.querySelector('.tabs__tab--active').innerHTML = req.responseText;
	};
	req.open('get', tab.include, true);
	req.send();
};

this.open = function (e) {
	var tab = e.item;
	if (!tab.disabled && !tab.active) {
		opts.tabs.tabs.forEach(function (tab) {
			tab.active = false;
		});
		_this.trigger('open', tab);
		tab.active = true;
	}
};

this.on('update', function () {
	if (!opts.tabs) opts.tabs = {};
	if (!Array.isArray(opts.tabs.tabs)) return;
	opts.tabs.tabs.forEach(function (tab) {
		if (!tab.disabled && tab.active && tab.include) fetch(tab);
	});
});
}, '{ }');
