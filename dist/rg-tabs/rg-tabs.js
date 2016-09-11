riot.tag2('rg-tabs', '<div class="c-tabs {\'c-tabs--\' + opts.tabs.type}"> <div class="c-tabs__headings"> <div each="{opts.tabs.tabs}" class="c-tab-heading {\'c-tab-heading--active\': active, \'c-tab-heading--disabled\': disabled}" onclick="{parent.open}"> {heading} </div> </div> <div each="{opts.tabs.tabs}" class="c-tabs__tab {\'c-tabs__tab--active\': active}"> <div if="{text}"> {text} </div> <div if="{include}"> {include.responseText} </div> </div> </div>', '', '', function(opts) {
var _this = this;

var fetch = function fetch(tab) {
	var req = new XMLHttpRequest();
	req.onload = function (resp) {
		var activeTab = _this.root.querySelector('.c-tabs__tab--active');
		if (activeTab) activeTab.innerHTML = req.responseText;
		_this.trigger('loaded', tab);
	};
	req.open('get', tab.include, true);
	req.send();
	_this.trigger('loading', tab);
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
		if (!tab.disabled && tab.active && tab.include) {
			fetch(tab);
		}
	});
});
});
