riot.tag('app', '<rg-context-menu menu="{ contextMenu }"></rg-context-menu> <h2>Alert</h2> <div class="demo"> <rg-alerts alerts="{ alerts }"></rg-alerts> <button onclick="{ addAlert }">Add alert</button> </div> <h2>Behold</h2> <div class="demo"> <rg-behold behold="{ behold }"></rg-behold> <button onclick="{ changeBeholdMode }">Change mode</button> <button onclick="{ changeBeholdImages }">Change image</button> </div> <h2>Bubble</h2> <div class="demo"> <rg-bubble bubble="{ bubble }">Hover over me</rg-bubble> <button onclick="{ updateBubbleContent }">Change bubble</button> </div> <h2>Code</h2> <div class="demo"> <rg-code editor="{ editorSettings }"></rg-code> </div> <button onclick="{ changeCode }">Change code</button> <h2>Context Menu</h2> <div class="demo" rg-context-menu="myMenu"> Right click here. </div> <h2>Credit Card</h2> <div class="demo"> <rg-credit-card-number card="{ creditcard }"></rg-credit-card-number> <button onclick="{ changeCardNumber }">Change Card Number</button> </div> <h2>Date</h2> <div class="demo"> <rg-date date="{ date }"></rg-date> { date.date } <button onclick="{ changeDate }">Change date</button> </div> <h2>GA</h2> <div class="demo"> Google Analytics tag is on this page. Look at Network tab in Developer Tools <rg-ga property="UA-36978977-5"></rg-ga> </div> <h2>Include</h2> <div class="demo"> <div> <rg-include include="{ include }"></rg-include> </div> <button onclick="{ unsafe }">Make unsafe</button> <button onclick="{ changeIncludeFile }">Change content</button> </div> <h2>Loading</h2> <div class="demo"> <rg-loading loading="{ loading }"> Please wait... </rg-loading> </div> <button onclick="{ toggleLoading }">Toggle loading</button> <h2>Map</h2> <div class="demo"> <rg-map map="{ map }"></rg-map> </div> <h2>Markdown</h2> <div class="demo"> <rg-markdown markdown="{ markdown }"></rg-markdown> <button onclick="{ changeMarkdown }">Change content</button> </div> <h2>Modal</h2> <div class="demo"> <rg-modal modal="{ modal }"> Well hello there! </rg-modal> </div> <button onclick="{ toggleModal }">Toggle modal</button> <button onclick="{ toggleModalType }">Toggle type</button> <button onclick="{ toggleModalDismissable }">Toggle dismissable</button> <h2>Phone Sim</h2> <div class="demo"> <rg-phone-sim phonesim="{ phonesim }"></rg-phone-sim> <button onclick="{ changePhoneSimURL }">Change URL</button> </div> <h2>Placehold.it</h2> <div class="demo"> <rg-placeholdit placeholdit="{ placeholdit }"></rg-placeholdit> </div> <button onclick="{ changePlacholdIt }">Change image</button> <h2>Select</h2> <div class="demo"> <rg-select select="{ select }"></rg-select> <button onclick="{ toggleAutocomplete }">Toggle autocomplete</button> </div> <h2>SideMenu</h2> <div class="demo no-overflow"> <rg-sidemenu sidemenu="{ sidemenu }"></rg-sidemenu> </div> <button onclick="{ changeSidemenu }">Change sidemenu</button> <h2>Tabs</h2> <div class="demo"> <rg-tabs tabs="{ tabs }"></rg-tabs> </div> <button onclick="{ changeTabContent }">Change tab</button> <h2>Tags</h2> <div class="demo"> <rg-tags tags="{ tags }"></rg-tags> </div> <h2>Time</h2> <div class="demo"> <rg-time time="{ time }"></rg-time> <button onclick="{ changeTime }">Change time</button> </div> <h2>Toast</h2> <div class="demo"> <rg-toast toasts="{ toasts }"></rg-toast> <button onclick="{ changeToasts }">Change toasts</button> </div> <h2>Toggle</h2> <div class="demo"> <rg-toggle toggle="{ toggle }"></rg-toggle> <button onclick="{ changeToggle }">Change toggle</button> </div> <h2>Unsplash</h2> <div class="demo"> <rg-unsplash unsplash="{ unsplash }"></rg-unsplash> </div> <button onclick="{ changeUnsplash }">Change image</button> <h3>>> END</h3>', function(opts) {var _this = this;

/*
 * ALERTS
 */
this.alerts = new RgAlerts({
  alerts: [{
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
  }]
});

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
  url: 'inc.html'
});
this.unsafe = function () {
  _this.include.unsafe = true;
};
this.changeIncludeFile = function () {
  _this.include.url = 'inc2.html';
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
  url: 'inc.md'
});
this.changeMarkdown = function () {
  _this.markdown.parse('### Hello RiotGear!');
};

/*
 * MAP
 */
this.map = new RgMap();

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
  url: 'http://riotgear.js.org/'
});
this.changePhoneSimURL = function () {
  _this.phonesim.url = 'http://riotjs.com';
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

/*
 * SELECT
 */
this.select = new RgSelect({
  autocomplete: false,
  placeholder: 'Please select a card',
  hasfilter: true,
  filterplaceholder: 'Filter cards',
  filterfield: 'text',
  onopen: function onopen() {
    return console.log('select opened');
  },
  onclose: function onclose() {
    return console.log('select closed');
  },
  onfilter: function onfilter() {
    return console.log('select filtered');
  },
  onselect: function onselect(item) {
    return console.log('select', item);
  },
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
});

this.toggleAutocomplete = function () {
  _this.select.autocomplete = !_this.select.autocomplete;
};

/*
 * UNSPLASH
 */
this.unsplash = new RgUnsplash();
this.changeUnsplash = function () {
  _this.unsplash.width = 200;
  _this.unsplash.height = 100;
  _this.unsplash.greyscale = "true";
  _this.unsplash.random = "true";
  _this.unsplash.blur = "true";
  _this.unsplash.image = "491";
  _this.unsplash.gravity = "north";
};

/*
 * TIME
 */
this.time = new RgTime({
  ampm: true,
  step: 15,
  min: '00:00',
  max: '23:59'
});

this.changeTime = function () {
  _this.time.placeholder = 'Select a time';
};

/*
 * TOGGLE
 */
this.toggle = new RgToggle({
  checked: true,
  ontoggle: function ontoggle(checked) {
    console.log('checked', checked);
  }
});

this.changeToggle = function () {
  _this.toggle.toggle();
};

/*
 * SIDEMENU
 */
this.sidemenu = new RgSidemenu({
  header: 'Side Menu',
  isvisible: true,
  onselect: function onselect() {
    _this.sidemenu.isvisible = false;
  },
  items: [{
    content: 'Item 1'
  }, {
    content: 'Item 2'
  }]
});

this.changeSidemenu = function () {
  _this.sidemenu.items.push({
    content: '<em>Item x</em>'
  });
};

/*
 * TAGS
 */
this.tags = new RgTags({
  value: 'Canada',
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
    text: 'America'
  }]
});

/*
 * TOASTS
 */
this.toasts = new RgToast({
  toasts: [{
    content: 'Hey look at me!'
  }]
});

this.changeToasts = function () {
  _this.toasts.add({
    content: 'Me is a new toast'
  });
  _this.toasts.position = 'bottomleft';
};

/*
 * TABS
 */
this.tabs = new RgTabs({
  tabs: [{
    heading: 'Tab <em>one</em>',
    content: 'This is tab one'
  }, {
    heading: 'Tab two',
    content: 'This is tab two',
    active: true
  }, {
    heading: 'Disabled tab',
    content: 'This is disabled tab',
    disabled: true
  }, {
    heading: 'Tab three',
    content: 'This is tab three content',
    include: new RgInclude({
      url: 'tab.html',
      unsafe: true
    })
  }]
});
this.changeTabContent = function () {
  _this.tabs.tabs[0].heading = 'take a look at tab three';
  _this.tabs.tabs[3].include.url = 'inc.html';
};
});
