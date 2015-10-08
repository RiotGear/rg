riot.tag('app', '<rg-context-menu menu="{ contextMenu }"></rg-context-menu> <h2>Alert</h2> <div class="demo"> <rg-alerts alerts="{ alerts }"></rg-alerts> <button onclick="{ addAlert }">Add alert</button> </div> <h2>Behold</h2> <div class="demo"> <rg-behold behold="{ behold }"></rg-behold> <button onclick="{ changeBeholdMode }">Change mode</button> <button onclick="{ changeBeholdImages }">Change image</button> </div> <h2>Bubble</h2> <div class="demo"> <rg-bubble bubble="{ bubble }">Hover over me</rg-bubble> <button onclick="{ updateBubbleContent }">Change bubble</button> </div> <h2>Code</h2> <div class="demo"> <rg-code editor="{ editorSettings }"></rg-code> </div> <button onclick="{ changeCode }">Change code</button> <h2>Context Menu</h2> <div class="demo" rg-context-menu="myMenu"> Right click here. </div> <h2>Credit Card</h2> <div class="demo"> <rg-credit-card-number card="{ creditcard }"></rg-credit-card-number> <button onclick="{ changeCardNumber }">Change Card Number</button> </div> <h2>Date</h2> <div class="demo"> <rg-date date="{ date }"></rg-date> { date.date } <button onclick="{ changeDate }">Change date</button> </div> <h2>GA</h2> <div class="demo"> Google Analytics tag is on this page. Look at Network tab in Developer Tools <rg-ga property="UA-36978977-5"></rg-ga> </div> <h2>Include</h2> <div class="demo"> <div> <rg-include include="{ include }"></rg-include> </div> <button onclick="{ unsafe }">Make unsafe</button> <button onclick="{ changeIncludeFile }">Change content</button> </div> <h2>Loading</h2> <div class="demo"> <rg-loading loading="{ loading }"> Please wait... </rg-loading> </div> <button onclick="{ toggleLoading }">Toggle loading</button>  <h2>Markdown</h2> <div class="demo"> <rg-markdown markdown="{ markdown }"></rg-markdown> <button onclick="{ changeMarkdown }">Change content</button> </div> <h2>Modal</h2> <div class="demo"> <rg-modal modal="{ modal }"> Well hello there! </rg-modal> </div> <button onclick="{ toggleModal }">Toggle modal</button> <button onclick="{ toggleModalType }">Toggle type</button> <button onclick="{ toggleModalDismissable }">Toggle dismissable</button> <h2>Phone Sim</h2> <div class="demo"> <rg-phone-sim phonesim="{ phonesim }"></rg-phone-sim> <button onclick="{ changePhoneSimURL }">Change URL</button> </div> <h2>Placehold.it</h2> <div class="demo"> <rg-placeholdit placeholdit="{ placeholdit }"></rg-placeholdit> <button onclick="{ changePlacholdIt }">Change image</button> </div>  <h3>>> END</h3>', function(opts) {var _this = this;

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
this.unsafe = function () {
  _this.include.unsafe = true;
};
this.changeIncludeFile = function () {
  _this.include.src = 'inc2.html';
};

/*
 * LOADING
 */
this.loading = new RgLoading({
  isvisible: true
});
this.toggleLoading = function () {
  _this.loading.isvisible = !_this.loading.isvisible;
};

/*
 * MARKDOWN
 */
this.markdown = new RgMarkdown({
  src: 'inc.md'
});
this.changeMarkdown = function () {
  _this.markdown.parse('### Hello RiotGear!');
};

/*
 * MODAL
 */
this.modal = new RgModal({
  isvisible: true,
  heading: 'Modal heading',
  buttons: [{
    content: '<em>Ok</em>',
    style: 'background-color:#000;color:#fff',
    action: function action() {
      return _this.modal.isvisible = false;
    }
  }]
});

this.toggleModal = function () {
  _this.modal.isvisible = !_this.modal.isvisible;
};

this.toggleModalType = function () {
  _this.modal.ghost = !_this.modal.ghost;
};

this.toggleModalDismissable = function () {
  _this.modal.dismissable = !_this.modal.dismissable;
};

/*
 * PHONE SIM
 */
this.phonesim = new RgPhoneSim({
  src: 'http://riotgear.js.org/'
});
this.changePhoneSimURL = function () {
  _this.phonesim.src = 'http://riotjs.com';
};

/*
 * PLACEHOLDIT
 */
this.placeholdit = new RgPlaceholdit();
this.changePlacholdIt = function () {
  _this.placeholdit.width = 200;
  _this.placeholdit.height = 100;
  _this.placeholdit.background = '1fadc5';
  _this.placeholdit.color = '4df';
  _this.placeholdit.textsize = 50;
  _this.placeholdit.text = 'JPEG';
  _this.placeholdit.format = 'jpg';
};
});
