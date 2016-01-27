riot.tag2('rg-bubble', '<div class="context"> <div class="bubble {isvisible: isvisible}"> {opts.text} </div> <div class="content" onmouseover="{showBubble}" onmouseout="{hideBubble}" onclick="{toggleBubble}"> <yield></yield> </div> </div>', 'rg-bubble .context,[riot-tag="rg-bubble"] .context,rg-bubble .content,[riot-tag="rg-bubble"] .content { display: inline-block; position: relative; } rg-bubble .bubble,[riot-tag="rg-bubble"] .bubble { position: absolute; top: -50px; left: 50%; transform: translate3d(-50%, 0, 0); padding: 10px 15px; background-color: #000; color: white; text-align: center; font-size: 0.9em; line-height: 1; white-space: nowrap; display: none; } rg-bubble .isvisible,[riot-tag="rg-bubble"] .isvisible { display: block; } rg-bubble .bubble:after,[riot-tag="rg-bubble"] .bubble:after { content: \'\'; position: absolute; display: block; bottom: -20px; left: 50%; transform: translate3d(-50%, 0, 0); width: 0; height: 0; border: 10px solid transparent; border-top-color: #000; }', '', function(opts) {
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
