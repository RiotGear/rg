riot.tag2('app', '<h2>Alert</h2> <div class="demo"> <rg-alerts alerts="{alerts}"></rg-alerts> <button class="button" onclick="{addAlert}">Add alert</button> </div> <h2>Bubble</h2> <div class="demo"> <rg-bubble text="{bubble}">Hover over me</rg-bubble> <button class="button" onclick="{updateBubbleText}">Change bubble</button> </div> <h2>Code</h2> <div class="demo"> <rg-code editor="{editorSettings}"></rg-code> </div> <button class="button" onclick="{changeCode}">Change code</button> <h2>Credit Card</h2> <div class="demo"> <rg-credit-card-number card="{creditcard}"></rg-credit-card-number> <button class="button" onclick="{changeCardNumber}">Change Card Number</button> </div> <h2>Date</h2> <div class="demo"> <rg-date date="{date}"></rg-date> {date.date} <button class="button" onclick="{changeDate}">Change date</button> </div> <h2>Drawer</h2> <div class="demo no-overflow"> <rg-drawer drawer="{drawer}"></rg-drawer> <button class="button" onclick="{openDrawer}">Open drawer</button> </div> <h2>GA</h2> <div class="demo"> Google Analytics tag is on this page. Look at Network tab in Developer Tools <rg-ga property="UA-36978977-5"></rg-ga> </div> <h2>Include</h2> <div class="demo"> <div> <rg-include include="{include}"></rg-include> <rg-include include="{includeTwo}"></rg-include> <rg-include include="{includeThree}"></rg-include> </div> </div> <h2>Map</h2> <div class="demo"> <rg-map map="{map}"></rg-map> </div> <h2>Markdown</h2> <div class="demo"> <rg-markdown markdown="{markdown}"></rg-markdown> <button class="button" onclick="{changeMarkdown}">Change content</button> </div> <h2>Modal</h2> <div class="demo"> <rg-modal modal="{modal}"> Well hello there! </rg-modal> </div> <button class="button" onclick="{toggleModal}">Toggle modal</button> <button class="button" onclick="{toggleModalType}">Toggle type</button> <button class="button" onclick="{toggleModalDismissable}">Toggle dismissable</button> <h2>Phone Sim</h2> <div class="demo"> <rg-phone-sim url="{phonesim}"></rg-phone-sim> <button class="button" onclick="{changePhoneSimURL}">Change URL</button> </div> <h2>Placehold.it</h2> <div class="demo"> <rg-placeholdit placeholdit="{placeholdit}"></rg-placeholdit> </div> <button class="button" onclick="{changePlacholdIt}">Change image</button> <h2>Select</h2> <div class="demo"> <rg-select select="{select}"></rg-select> </div> <h2>Tabs</h2> <div class="demo"> <rg-tabs tabs="{tabs}"></rg-tabs> </div> <button class="button" onclick="{changeTabContent}">Change tab</button> <h2>Tags</h2> <div class="demo"> <rg-tags tags="{tags}"></rg-tags> </div> <h2>Toast</h2> <div class="demo"> <rg-toasts toasts="{toasts}"></rg-toasts> <button class="button" onclick="{changeToasts}">Change toasts</button> </div> <h2>Toggle</h2> <div class="demo"> <rg-toggle toggle="{toggle}"></rg-toggle> <br> <br> <button class="button" onclick="{changeToggle}">Change toggle</button> </div> <h2>Unsplash</h2> <div class="demo"> <rg-unsplash unsplash="{unsplash}"></rg-unsplash> </div> <button class="button" onclick="{changeUnsplash}">Change image</button> <h3>>> END</h3>', '', '', function(opts) {
var _this = this;

this.alerts = [{
	type: 'primary',
	text: 'Look! Something you should know about.'
}, {
	type: 'secondary',
	text: 'Warning! Something sort of bad happened.',
	dismissable: false
}, {
	type: 'success',
	text: 'Success! Well done.'
}, {
	type: 'error',
	text: 'Error! Something bad happened.',
	dismissable: true,
	timeout: 2000
}];

this.addAlert = function () {
	_this.alerts.push({
		type: 'error',
		text: 'Eeek! Something broke...'
	});
};

this.bubble = { text: 'Ping' };

this.updateBubbleText = function () {
	_this.bubble = { text: 'Pong!' };
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

this.date = {
	date: moment()
};

this.changeDate = function () {
	_this.date.date = moment();
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

this.modal = {
	isvisible: true,
	heading: 'Modal heading',
	buttons: [{
		text: 'Ok',
		type: 'primary',
		action: function action() {
			return _this.modal.isvisible = false;
		}
	}, {
		text: 'Canel',
		action: function action() {
			return _this.modal.isvisible = false;
		}
	}]
};

this.toggleModal = function () {
	_this.modal.isvisible = !_this.modal.isvisible;
};

this.toggleModalType = function () {
	_this.modal.ghost = !_this.modal.ghost;
};

this.toggleModalDismissable = function () {
	_this.modal.dismissable = !_this.modal.dismissable;
};

this.phonesim = {
	url: 'http://riotgear.js.org/'
};
this.changePhoneSimURL = function () {
	_this.phonesim.url = 'http://riotjs.com';
};

this.placeholdit = {};
this.changePlacholdIt = function () {
	_this.placeholdit.width = 200;
	_this.placeholdit.height = 100;
	_this.placeholdit.background = '1fadc5';
	_this.placeholdit.color = '4df';
	_this.placeholdit.textsize = 50;
	_this.placeholdit.text = 'JPEG';
	_this.placeholdit.format = 'jpg';
};

this.select = {
	placeholder: 'Please select a card',
	options: [{
		id: 0,
		text: 'Visa'
	}, {
		id: 1,
		text: 'MasterCard',
		selected: true
	}, {
		id: 2,
		text: 'American Express'
	}, {
		id: 3,
		text: 'Discover'
	}]
};

this.unsplash = {};
this.changeUnsplash = function () {
	_this.unsplash.width = 200;
	_this.unsplash.height = 100;
	_this.unsplash.greyscale = "true";
	_this.unsplash.random = "true";
	_this.unsplash.blur = "true";
	_this.unsplash.image = "491";
	_this.unsplash.gravity = "north";
};

this.toggle = {
	type: 'primary',
	checked: true
};

this.changeToggle = function () {
	_this.toggle.checked = !_this.toggle.checked;
};

this.tags = {
	placeholder: 'Choose a country',
	options: [{
		text: 'England'
	}, {
		text: 'Scotland'
	}, {
		text: 'Ireland'
	}, {
		text: 'Wales'
	}],
	tags: [{
		text: 'Russia'
	}]
};

this.toasts = {
	position: 'topright',
	toasts: [{
		type: 'primary',
		text: 'Hey look at me!'
	}]
};

this.changeToasts = function () {
	_this.toasts.toasts.push({
		text: 'Me is a new toast'
	});
	_this.toasts.position = 'bottomleft';
};

this.tabs = {
	type: 'primary',
	tabs: [{
		heading: 'Tab one',
		text: 'This is tab one'
	}, {
		heading: 'Tab two',
		text: 'This is tab two',
		active: true
	}, {
		heading: 'Disabled tab',
		text: 'This is disabled tab',
		disabled: true
	}, {
		heading: 'Tab three',
		text: 'This is tab three content',
		include: 'tab.html'
	}]
};

this.changeTabContent = function () {
	_this.tabs.tabs[0].heading = 'take a look at tab three';
	_this.tabs.tabs[3].include = 'inc.html';
};
}, '{ }');
