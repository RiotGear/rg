riot.tag2('app', '<rg-context-menu menu="{contextMenu}"></rg-context-menu> <h2>Alert</h2> <div class="demo"> <rg-alerts alerts="{alerts}"></rg-alerts> <button onclick="{addAlert}">Add alert</button> </div> <h2>Bubble</h2> <div class="demo"> <rg-bubble text="{bubble}">Hover over me</rg-bubble> <button onclick="{updateBubbleText}">Change bubble</button> </div> <h2>Code</h2> <div class="demo"> <rg-code editor="{editorSettings}"></rg-code> </div> <button onclick="{changeCode}">Change code</button> <h2>Credit Card</h2> <div class="demo"> <rg-credit-card-number card="{creditcard}"></rg-credit-card-number> <button onclick="{changeCardNumber}">Change Card Number</button> </div> <h2>Drawer</h2> <div class="demo no-overflow"> <rg-drawer drawer="{drawer}"></rg-drawer> <button onclick="{openDrawer}">Open drawer</button> </div> <h2>Include</h2> <div class="demo"> <div> <rg-include include="{include}"></rg-include> <rg-include include="{includeTwo}"></rg-include> <rg-include include="{includeThree}"></rg-include> </div> </div> <h2>Map</h2> <div class="demo"> <rg-map map="{map}"></rg-map> </div> <h2>Markdown</h2> <div class="demo"> <rg-markdown markdown="{markdown}"></rg-markdown> <button onclick="{changeMarkdown}">Change content</button> </div> <h2>Phone Sim</h2> <div class="demo"> <rg-phone-sim url="{phonesim}"></rg-phone-sim> <button onclick="{changePhoneSimURL}">Change URL</button> </div> <h3>>> END</h3>', '', '', function(opts) {
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

this.creditcard = {
	placeholder: 'Long number on front',
	cardnumber: '4000 0000 0000 0002'
};

this.changeCardNumber = function () {
	_this.creditcard.cardnumber = 5105105105105100;
};

this.drawer = {
	header: 'Drawer',
	isvisible: true,
	position: 'bottom',
	items: [{
		text: 'Item 1'
	}, {
		text: 'Item 2'
	}]
};

this.openDrawer = function () {
	_this.drawer.isvisible = true;
};

this.include = {
	url: 'inc.html'
};
this.includeTwo = {
	url: 'inc.html',
	unsafe: true
};
this.includeThree = {
	url: 'inc2.html',
	unsafe: true
};

this.markdown = {
	content: '**Some** content'
};
this.changeMarkdown = function () {
	_this.markdown = {
		url: 'inc.md'
	};
};

this.phonesim = 'http://riotgear.js.org/';
this.changePhoneSimURL = function () {
	_this.phonesim = 'http://riotjs.com';
};
}, '{ }');
