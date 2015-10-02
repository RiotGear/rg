riot.tag('app', '<rg-context-menu id="myMenu" items="{ contentMenuItems }"></rg-context-menu> <h2>Alert</h2> <div class="demo"> <rg-alert alerts="{ alerts }"></rg-alert> <button onclick="{ addAlert }">Add alert</button> </div> <h2>Behold</h2> <div class="demo"> <rg-behold image1="img/first.jpg" image2="img/second.jpg"></rg-behold> </div> <h2>Bubble</h2> <div class="demo"> <rg-bubble content="{ bubbleContent || \'<strong>ping</strong>\' }">Hover over me</rg-bubble> <button onclick="{ updateBubbleContent }">Update bubble content</button> </div> <h2>Code</h2> <div class="demo"> <rg-code theme="monokai" mode="html" tabsize="2" softtabs="false" wordwrap="false" readonly="false" code="{ code || \'<h2>Hello world!</h2>\' }"></rg-code> </div> <button onclick="{ changeCode }">Change code</button> <h2>Context Menu</h2> <div class="demo" rg-context-menu="myMenu"> Right click here. </div> <h2>Credit Card</h2> <div class="demo"> <rg-credit-card cardno="{ creditCard }"></rg-credit-card> <button onclick="{ changeCreditCard }">Change Credit Card</button> </div> ', function(opts) {var _this = this;

this.alerts = [{
  type: 'danger',
  content: 'Danger! Something bad happened.',
  dismissable: true,
  timeout: 4000
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
    content: 'Eeek! <strong>Boom!</strong> Look at the <a href="#">logs</a>',
    onclick: function onclick(alert) {
      alert.isvisible = false;
    }
  });
};

this.updateBubbleContent = function () {
  _this.bubbleContent = '<em>pong!</em>';
};

this.changeCode = function () {
  _this.code = '<h2>Hello RiotGear!</h2>';
};

var menuItem = {
  content: '<em>Add another item</em>',
  onclick: function onclick() {
    _this.addMenuItem();
  }
};

this.contentMenuItems = [menuItem];

this.addMenuItem = function () {
  _this.contentMenuItems.push(menuItem);
};

this.changeCreditCard = function () {
  _this.creditCard = 5105105105105100;
};
});
