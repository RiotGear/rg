riot.tag2('app', '<rg-context-menu menu="{contextMenu}"></rg-context-menu> <h2>Alert</h2> <div class="demo"> <rg-alerts alerts="{alerts}"></rg-alerts> <button onclick="{addAlert}">Add alert</button> </div> <h3>>> END</h3>', '', '', function(opts) {
var _this = this;

this.alerts = [{
	type: 'danger',
	content: 'Danger! Something bad happened.',
	dismissable: true,
	timeout: 2000
}, {
	type: 'warning',
	content: 'Warning! Something sort of bad happened.',
	dismissable: false
}, {
	type: 'information',
	content: 'Look! Something you should know about.'
}, {
	type: 'success',
	content: 'Success! Well done.'
}];

this.addAlert = function () {
	_this.alerts.push({
		type: 'danger',
		content: 'Eeek! <strong>Boom!</strong> Look at the <a href="#">logs</a>'
	});
};

setTimeout(function () {
	_this.alerts.push({
		type: 'information',
		content: 'Test alert'
	});
	_this.update();
}, 3000);
}, '{ }');
