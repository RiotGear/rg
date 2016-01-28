riot.tag2('rg-drawer', '<div class="overlay {visible: opts.drawer.isvisible}" onclick="{close}"></div> <div class="drawer {opts.drawer.position || \'bottom\'} {visible: opts.drawer.isvisible}"> <h4 class="header">{opts.drawer.header}</h4> <ul class="items"> <li class="item {active: active}" each="{opts.drawer.items}" onclick="{parent.select}"> {text} </li> </ul> <div class="body"> <yield></yield> </div> </div>', 'rg-drawer .overlay,[riot-tag="rg-drawer"] .overlay { display: none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); cursor: pointer; z-index: 50; } rg-drawer .overlay.visible,[riot-tag="rg-drawer"] .overlay.visible { display: block; } rg-drawer .drawer,[riot-tag="rg-drawer"] .drawer { position: absolute; overflow-y: auto; overflow-x: hidden; -webkit-overflow-scrolling: touch; background-color: white; color: black; transition: transform 0.5s ease; z-index: 51; } rg-drawer .drawer.bottom,[riot-tag="rg-drawer"] .drawer.bottom { top: 100%; left: 0; height: auto; width: 80%; margin-left: 10%; transform: translate3d(0, 0, 0); } rg-drawer .drawer.bottom.visible,[riot-tag="rg-drawer"] .drawer.bottom.visible { transform: translate3d(0, -100%, 0); } rg-drawer .drawer.top,[riot-tag="rg-drawer"] .drawer.top { bottom: 100%; left: 0; height: auto; width: 80%; margin-left: 10%; transform: translate3d(0, 0, 0); } rg-drawer .drawer.top.visible,[riot-tag="rg-drawer"] .drawer.top.visible { transform: translate3d(0, 100%, 0); } rg-drawer .drawer.left,[riot-tag="rg-drawer"] .drawer.left { top: 0; left: 0; height: 100%; width: 260px; transform: translate3d(-100%, 0, 0); } rg-drawer .drawer.left.visible,[riot-tag="rg-drawer"] .drawer.left.visible { transform: translate3d(0, 0, 0); } rg-drawer .drawer.right,[riot-tag="rg-drawer"] .drawer.right { top: 0; left: 100%; height: 100%; width: 260px; transform: translate3d(0, 0, 0); } rg-drawer .drawer.right.visible,[riot-tag="rg-drawer"] .drawer.right.visible { transform: translate3d(-100%, 0, 0); } rg-drawer .header,[riot-tag="rg-drawer"] .header { padding: 1.2rem; margin: 0; text-align: center; } rg-drawer .items,[riot-tag="rg-drawer"] .items { padding: 0; margin: 0; list-style: none; } rg-drawer .item,[riot-tag="rg-drawer"] .item { padding: 1rem 0.5rem; box-sizing: border-box; border-top: 1px solid #E8E8E8; } rg-drawer .item:last-child,[riot-tag="rg-drawer"] .item:last-child { border-bottom: 1px solid #E8E8E8; } rg-drawer .item:hover,[riot-tag="rg-drawer"] .item:hover { cursor: pointer; background-color: #E8E8E8; } rg-drawer .item.active,[riot-tag="rg-drawer"] .item.active { cursor: pointer; background-color: #EEE; }', '', function(opts) {
var _this = this;

this.on('mount', function () {
	if (!opts.drawer) opts.drawer = {};
});

this.close = function () {
	opts.drawer.isvisible = false;
	_this.trigger('close');
};

this.select = function (e) {
	opts.drawer.items.forEach(function (item) {
		return item.active = false;
	});
	e.item.active = true;
	_this.trigger('select', e.item);
};
}, '{ }');
