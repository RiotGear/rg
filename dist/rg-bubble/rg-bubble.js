riot.tag2('rg-bubble', '<div class="context"> <div class="bubble bubble--top" if="{isvisible}"> {opts.text} </div> <div class="content" onmouseover="{showBubble}" onmouseout="{hideBubble}" onclick="{toggleBubble}"> <yield></yield> </div> </div>', 'rg-bubble .context,[riot-tag="rg-bubble"] .context,rg-bubble .content,[riot-tag="rg-bubble"] .content { display: inline-block; position: relative; } rg-bubble .bubble,[riot-tag="rg-bubble"] .bubble { position: absolute; top: -70px; left: 50%; transform: translate3d(-50%, 0, 0); }', '', function(opts) {
var _this = this;

this.showBubble = function () {
	clearTimeout(_this._timer);
	_this.isvisible = true;
};

this.hideBubble = function () {
	_this._timer = setTimeout(function () {
		_this.isvisible = false;
		_this.update();
	}, 1000);
};

this.toggleBubble = function () {
	_this.isvisible = !_this.isvisible;
};
}, '{ }');
