riot.tag2('rg-tabs', '<div class="headers"> <div each="{opts.tabs.tabs}" class="header {active: active, disabled: disabled}" onclick="{parent.open}"> <div class="heading"> {heading} </div> </div> </div> <div each="{opts.tabs.tabs}" class="tab {active: active}"> <div if="{text}"> {text} </div> <div if="{include}"> {include.responseText} </div> </div>', 'rg-tabs .headers,[riot-tag="rg-tabs"] .headers { display: -webkit-flex; display: -ms-flexbox; display: flex; } rg-tabs .header,[riot-tag="rg-tabs"] .header { -webkit-flex: 1; -ms-flex: 1; flex: 1; box-sizing: border-box; text-align: center; cursor: pointer; box-shadow: 0 -1px 0 0 #000 inset; } rg-tabs .heading,[riot-tag="rg-tabs"] .heading { padding: 10px; margin: 0; } rg-tabs .header.active,[riot-tag="rg-tabs"] .header.active { background-color: #000; } rg-tabs .header.active .heading,[riot-tag="rg-tabs"] .header.active .heading { color: white; } rg-tabs .header.disabled .heading,[riot-tag="rg-tabs"] .header.disabled .heading { color: #888; } rg-tabs .tab,[riot-tag="rg-tabs"] .tab { display: none; padding: 10px; } rg-tabs .tab.active,[riot-tag="rg-tabs"] .tab.active { display: block; }', '', function(opts) {
var _this = this;

var fetch = function fetch(tab) {
	var req = new XMLHttpRequest();
	req.onload = function (resp) {
		_this.root.querySelector('.tab.active').innerHTML = req.responseText;
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
