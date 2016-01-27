riot.tag2('app', '<rg-context-menu menu="{contextMenu}"></rg-context-menu> <h2>Alert</h2> <div class="demo"> <rg-alerts alerts="{alerts}"></rg-alerts> <button onclick="{addAlert}">Add alert</button> </div> <h2>Bubble</h2> <div class="demo"> <rg-bubble text="{bubble}">Hover over me</rg-bubble> <button onclick="{updateBubbleText}">Change bubble</button> </div> <h2>Code</h2> <div class="demo"> <rg-code editor="{editorSettings}"></rg-code> </div> <button onclick="{changeCode}">Change code</button> <h3>>> END</h3>', '', '', function(opts) {
var _this = this;

this.alerts = [{
	type: 'danger',
	text: 'Danger! Something bad happened.',
	dismissable: true,
	timeout: 2000
}, {
	type: 'warning',
	text: 'Warning! Something sort of bad happened.',
	dismissable: false
}, {
	type: 'information',
	text: 'Look! Something you should know about.'
}, {
	type: 'success',
	text: 'Success! Well done.'
}];

this.addAlert = function () {
	_this.alerts.push({
		type: 'danger',
		text: 'Eeek! Something broke...'
	});
};

setTimeout(function () {
	_this.alerts.push({
		type: 'information',
		content: 'Test alert'
	});
	_this.update();
}, 3000);

this.bubble = 'Ping';

this.updateBubbleText = function () {
	_this.bubble = 'Pong!';
};

this.editorSettings = {
	code: '<h2>Hello world!</h2>'
};

this.changeCode = function () {
	_this.editorSettings.code = 'this.msg = "Hello RiotGear!";';
	_this.editorSettings.mode = 'javascript';
};
}, '{ }');
