riot.tag2('app', '<h2>Alert</h2> <div class="demo"> <rg-alerts alerts="{alerts}"></rg-alerts> <button class="button" onclick="{addAlert}">Add alert</button> </div> <h2>Bubble</h2> <div class="demo"> <rg-bubble bubble="{bubble}">Hover over me</rg-bubble> <button class="button" onclick="{updateBubbleText}">Change bubble</button> </div> <h2>Code</h2> <div class="demo"> <rg-code editor="{editorSettings}"></rg-code> </div> <button class="button" onclick="{changeCode}">Change code</button> <h2>Chart</h2> <div class="demo"> <rg-chart class="chart-container" chart="{linechart}"></rg-chart> <rg-chart class="chart-container" chart="{barchart}"></rg-chart> <rg-chart class="chart-container" chart="{radarchart}"></rg-chart> <rg-chart class="chart-container" chart="{polarchart}"></rg-chart> <rg-chart class="chart-container" chart="{piechart}"></rg-chart> <rg-chart class="chart-container" chart="{doughnutchart}"></rg-chart> </div> <h2>Credit Card</h2> <div class="demo"> <rg-credit-card-number card="{creditcard}"></rg-credit-card-number> <button class="button" onclick="{changeCardNumber}">Change Card Number</button> </div> <h2>Date</h2> <div class="demo"> <rg-date date="{date}"></rg-date> {date.date} <button class="button" onclick="{changeDate}">Change date</button> </div> <h2>Drawer</h2> <div class="demo no-overflow"> <rg-drawer drawer="{drawer}"></rg-drawer> <button class="button" onclick="{openDrawer}">Open drawer</button> </div> <h2>GA</h2> <div class="demo"> Google Analytics tag is on this page. Look at Network tab in Developer Tools <rg-ga property="UA-36978977-5"></rg-ga> </div> <h2>Include</h2> <div class="demo"> <div> <rg-include include="{include}"></rg-include> <rg-include include="{includeTwo}"></rg-include> <rg-include include="{includeThree}"></rg-include> </div> </div> <h2>Map</h2> <div class="demo"> <rg-map></rg-map> </div> <h2>Markdown</h2> <div class="demo"> <rg-markdown markdown="{markdown}"></rg-markdown> <button class="button" onclick="{changeMarkdown}">Change content</button> </div> <h2>Modal</h2> <div class="demo"> <rg-modal modal="{modal}"> Well hello there! </rg-modal> </div> <button class="button" onclick="{toggleModal}">Toggle modal</button> <button class="button" onclick="{toggleModalType}">Toggle type</button> <button class="button" onclick="{toggleModalDismissable}">Toggle dismissable</button> <h2>Pagination</h2> <div class="demo"> <rg-pagination pagination="{pagination}"></rg-pagination> </div> <h2>Phone Sim</h2> <div class="demo"> <rg-phone-sim url="{phonesim}"></rg-phone-sim> <button class="button" onclick="{changePhoneSimURL}">Change URL</button> </div> <h2>Placehold.it</h2> <div class="demo"> <rg-placeholdit placeholdit="{placeholdit}"></rg-placeholdit> </div> <button class="button" onclick="{changePlacholdIt}">Change image</button> <h2>Select</h2> <div class="demo"> <rg-select select="{select}"></rg-select> </div> <h2>Select -w/ filter</h2> <div class="demo"> <rg-select select="{selectWithFilter}"></rg-select> </div> <h2>Tabs</h2> <div class="demo"> <rg-tabs tabs="{tabs}"></rg-tabs> </div> <button class="button" onclick="{changeTabContent}">Change tab</button> <h2>Tags</h2> <div class="demo"> <rg-tags tags="{rgTags}"></rg-tags> </div> <h2>Toast</h2> <div class="demo"> <rg-toasts toasts="{toasts}"></rg-toasts> <button class="button" onclick="{changeToasts}">Change toasts</button> </div> <h2>Toggle</h2> <div class="demo"> <rg-toggle toggle="{toggle}"></rg-toggle> <br> <br> <button class="button" onclick="{changeToggle}">Change toggle</button> </div> <h2>Unsplash</h2> <div class="demo"> <rg-unsplash unsplash="{unsplash}"></rg-unsplash> </div> <button class="button" onclick="{changeUnsplash}">Change image</button> <h3>>> END</h3>', '', '', function(opts) {
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

this.bubble = {
	text: 'Ping'
};

this.updateBubbleText = function () {
	_this.bubble = {
		text: 'Pong!'
	};
};

this.linechart = {
	type: 'line',
	data: {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		datasets: [{
			label: "My First dataset",
			fillColor: "rgba(220,220,220,0.2)",
			strokeColor: "rgba(220,220,220,1)",
			pointColor: "rgba(220,220,220,1)",
			pointStrokeColor: "#fff",
			pointHighlightFill: "#fff",
			pointHighlightStroke: "rgba(220,220,220,1)",
			data: [65, 59, 80, 81, 56, 55, 40]
		}, {
			label: "My Second dataset",
			fillColor: "rgba(151,187,205,0.2)",
			strokeColor: "rgba(151,187,205,1)",
			pointColor: "rgba(151,187,205,1)",
			pointStrokeColor: "#fff",
			pointHighlightFill: "#fff",
			pointHighlightStroke: "rgba(151,187,205,1)",
			data: [28, 48, 40, 19, 86, 27, 90]
		}]
	}
};

this.barchart = {
	type: 'bar',
	data: {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		datasets: [{
			label: "My First dataset",
			fillColor: "rgba(220,220,220,0.5)",
			strokeColor: "rgba(220,220,220,0.8)",
			highlightFill: "rgba(220,220,220,0.75)",
			highlightStroke: "rgba(220,220,220,1)",
			data: [65, 59, 80, 81, 56, 55, 40]
		}, {
			label: "My Second dataset",
			fillColor: "rgba(151,187,205,0.5)",
			strokeColor: "rgba(151,187,205,0.8)",
			highlightFill: "rgba(151,187,205,0.75)",
			highlightStroke: "rgba(151,187,205,1)",
			data: [28, 48, 40, 19, 86, 27, 90]
		}]
	}
};

this.radarchart = {
	type: 'radar',
	data: {
		labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
		datasets: [{
			label: "My First dataset",
			fillColor: "rgba(220,220,220,0.2)",
			strokeColor: "rgba(220,220,220,1)",
			pointColor: "rgba(220,220,220,1)",
			pointStrokeColor: "#fff",
			pointHighlightFill: "#fff",
			pointHighlightStroke: "rgba(220,220,220,1)",
			data: [65, 59, 90, 81, 56, 55, 40]
		}, {
			label: "My Second dataset",
			fillColor: "rgba(151,187,205,0.2)",
			strokeColor: "rgba(151,187,205,1)",
			pointColor: "rgba(151,187,205,1)",
			pointStrokeColor: "#fff",
			pointHighlightFill: "#fff",
			pointHighlightStroke: "rgba(151,187,205,1)",
			data: [28, 48, 40, 19, 96, 27, 100]
		}]
	}
};

this.polarchart = {
	type: 'polar',
	data: [{
		value: 300,
		color: "#F7464A",
		highlight: "#FF5A5E",
		label: "Red"
	}, {
		value: 50,
		color: "#46BFBD",
		highlight: "#5AD3D1",
		label: "Green"
	}, {
		value: 100,
		color: "#FDB45C",
		highlight: "#FFC870",
		label: "Yellow"
	}, {
		value: 40,
		color: "#949FB1",
		highlight: "#A8B3C5",
		label: "Grey"
	}, {
		value: 120,
		color: "#4D5360",
		highlight: "#616774",
		label: "Dark Grey"
	}]
};

this.piechart = {
	type: 'pie',
	data: [{
		value: 300,
		color: "#F7464A",
		highlight: "#FF5A5E",
		label: "Red"
	}, {
		value: 50,
		color: "#46BFBD",
		highlight: "#5AD3D1",
		label: "Green"
	}, {
		value: 100,
		color: "#FDB45C",
		highlight: "#FFC870",
		label: "Yellow"
	}]
};

this.doughnutchart = {
	type: 'doughnut',
	data: [{
		value: 300,
		color: "#F7464A",
		highlight: "#FF5A5E",
		label: "Red"
	}, {
		value: 50,
		color: "#46BFBD",
		highlight: "#5AD3D1",
		label: "Green"
	}, {
		value: 100,
		color: "#FDB45C",
		highlight: "#FFC870",
		label: "Yellow"
	}]
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
	date: moment(),
	min: moment().startOf('year'),
	max: moment().endOf('year')
};

this.changeDate = function () {
	_this.date.date = '2015-01-01';
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

this.tags['rg-map'].on('loaded', function (map) {
	var marker = new google.maps.Marker({
		position: {
			lat: 53.806,
			lng: -1.535
		},
		map: map,
		title: 'Hello RiotGear!'
	});
});

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

this.pagination = {
	pages: 100,
	page: 3,
	action: function action(page) {
		return console.log(page);
	}
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

this.selectWithFilter = {
	placeholder: 'Please select a card',
	filter: 'text',
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

this.rgTags = {
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
});
