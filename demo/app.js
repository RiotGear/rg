riot.tag('app', '<rg-context-menu id="myMenu" items="{ contentMenuItems }"></rg-context-menu> <h2>Alert</h2> <div class="demo"> <rg-alerts alerts="{ alerts }"></rg-alerts> <button onclick="{ addAlert }">Add alert</button> </div> <h2>Behold</h2> <div class="demo"> <rg-behold behold="{ behold }"></rg-behold> <button onclick="{ changeBeholdMode }">Change mode</button> <button onclick="{ changeBeholdImages }">Change image</button> </div> <h2>Bubble</h2> <div class="demo"> <rg-bubble bubble="{ bubble }">Hover over me</rg-bubble> <button onclick="{ updateBubbleContent }">Change bubble</button> </div> <h2>Code</h2> <div class="demo"> <rg-code editor="{ editorSettings }"></rg-code> </div> <button onclick="{ changeCode }">Change code</button>  <h3>>> END</h3>', function(opts) {var _this = this;

/*
 * ALERTS
 */
this.alerts = new RgAlerts([{
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
}]);

this.addAlert = function () {
  _this.alerts.add({
    type: 'danger',
    content: 'Eeek! <strong>Boom!</strong> Look at the <a href="#">logs</a>',
    onclick: function onclick(alert) {
      alert.isvisible = false;
    }
  });
};

/*
 * BEHOLD
 */
this.behold = new RgBehold({
  image1: 'img/first.jpg',
  image2: 'img/second.jpg'
});

this.changeBeholdMode = function () {
  _this.behold.mode = 'fade';
};

this.changeBeholdImages = function () {
  _this.behold.image1 = 'img/third.jpg';
};

/*
 * BUBBLE
 */
this.bubble = new RgBubble({
  content: '<strong>Ping</strong>'
});

this.updateBubbleContent = function () {
  _this.bubble.content = '<em>Pong!</em>';
};

/*
 * CODE
 */
this.editorSettings = new RgCode({
  code: '<h2>Hello world!</h2>'
});

this.changeCode = function () {
  _this.editorSettings.code = 'this.msg = "Hello RiotGear!";';
  _this.editorSettings.mode = 'javascript';
};

/*
 * CONTEXT MENU
 */
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

this.date = '1982-01-14';

this.changeDate = function () {
  _this.date = '2015-12-25';
};
});
