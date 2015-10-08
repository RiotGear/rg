riot.tag('app', '<rg-context-menu menu="{ contextMenu }"></rg-context-menu> <h2>Alert</h2> <div class="demo"> <rg-alerts alerts="{ alerts }"></rg-alerts> <button onclick="{ addAlert }">Add alert</button> </div> <h2>Behold</h2> <div class="demo"> <rg-behold behold="{ behold }"></rg-behold> <button onclick="{ changeBeholdMode }">Change mode</button> <button onclick="{ changeBeholdImages }">Change image</button> </div> <h2>Bubble</h2> <div class="demo"> <rg-bubble bubble="{ bubble }">Hover over me</rg-bubble> <button onclick="{ updateBubbleContent }">Change bubble</button> </div> <h2>Code</h2> <div class="demo"> <rg-code editor="{ editorSettings }"></rg-code> </div> <button onclick="{ changeCode }">Change code</button> <h2>Context Menu</h2> <div class="demo" rg-context-menu="myMenu"> Right click here. </div> <h2>Credit Card</h2> <div class="demo"> <rg-credit-card-number card="{ creditcard }"></rg-credit-card-number> <button onclick="{ changeCardNumber }">Change Card Number</button> </div> <h2>Date</h2> <div class="demo"> <rg-date date="{ date }"></rg-date> { date.date } <button onclick="{ changeDate }">Change date</button> </div> <h2>GA</h2> <div class="demo"> Google Analytics tag is on this page. Look at Network tab in Developer Tools <rg-ga property="UA-36978977-5"></rg-ga> </div> <h2>Include</h2> <div class="demo"> <rg-include include="{ include }"></rg-include> </div>  <h3>>> END</h3>', function(opts) {var _this = this;

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
this.contextMenu = new RgContextMenu({
  name: 'myMenu',
  items: [{
    content: '<em>Add another item</em>',
    onclick: function onclick() {
      _this.addMenuItem();
    }
  }],
  onopen: function onopen() {
    return console.log('menu open');
  },
  onclose: function onclose() {
    return console.log('menu closed');
  }
});

this.addMenuItem = function () {
  _this.contextMenu.add({
    content: '<em>Add another item</em>',
    onclick: function onclick() {
      _this.addMenuItem();
    }
  });
};

/*
 * CREDIT CARD NUMBER
 */
this.creditcard = new RgCreditCard({
  placeholder: 'Long number on front',
  cardnumber: '4000 0000 0000 0002'
});

this.changeCardNumber = function () {
  _this.creditcard.cardnumber = 5105105105105100;
};

/*
 * DATE
 */
this.date = new RgDate({
  date: moment('14-01-1982', 'DD-MM-YYYY')
});

this.changeDate = function () {
  _this.date.date = moment();
};

this.date.on('change', function () {
  _this.update();
});

/*
 * INCLUDE
 */
this.include = new RgInclude({
  src: 'inc.html'
});
});
