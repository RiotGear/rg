<app>
  <rg-context-menu menu="{ contextMenu }"></rg-context-menu>
  <h2>Alert</h2>
  <div class="demo">
    <rg-alerts alerts="{ alerts }"></rg-alerts>
    <button onclick="{ addAlert }">Add alert</button>
  </div>

  <h2>Behold</h2>
  <div class="demo">
    <rg-behold behold="{ behold }"></rg-behold>
    <button onclick="{ changeBeholdMode }">Change mode</button>
    <button onclick="{ changeBeholdImages }">Change image</button>
  </div>

  <h2>Bubble</h2>
  <div class="demo">
    <rg-bubble bubble="{ bubble }">Hover over me</rg-bubble>
    <button onclick="{ updateBubbleContent }">Change bubble</button>
  </div>

  <h2>Code</h2>
  <div class="demo">
    <rg-code editor="{ editorSettings }"></rg-code>
  </div>
  <button onclick="{ changeCode }">Change code</button>

  <h2>Context Menu</h2>
  <div class="demo" rg-context-menu="myMenu">
    Right click here.
  </div>

  <h2>Credit Card</h2>
  <div class="demo">
    <rg-credit-card-number card="{ creditcard }"></rg-credit-card-number>
    <button onclick="{ changeCardNumber }">Change Card Number</button>
  </div>

  <h2>Date</h2>
  <div class="demo">
    <rg-date date="{ date }"></rg-date>
    { date.date }
    <button onclick="{ changeDate }">Change date</button>
  </div>

  <h2>Drawer</h2>
  <div class="demo no-overflow">
    <rg-drawer drawer="{ drawer }"></rg-drawer>
    <button onclick="{ openDrawer }">Open drawer</button>
  </div>

  <h2>GA</h2>
  <div class="demo">
    Google Analytics tag is on this page. Look at Network tab in Developer Tools
    <rg-ga property="UA-36978977-5"></rg-ga>
  </div>

  <h2>Include</h2>
  <div class="demo">
    <div>
      <rg-include include="{ include }"></rg-include>
    </div>
    <button onclick="{ unsafe }">Make unsafe</button>
    <button onclick="{ changeIncludeFile }">Change content</button>
  </div>

  <h2>Loading</h2>
  <div class="demo">
    <rg-loading loading="{ loading }">
      Please wait...
    </rg-loading>
  </div>
  <button onclick="{ toggleLoading }">Toggle loading</button>

  <h2>Map</h2>
  <div class="demo">
    <rg-map map="{ map }"></rg-map>
  </div>

  <h2>Markdown</h2>
  <div class="demo">
    <rg-markdown markdown="{ markdown }"></rg-markdown>
    <button onclick="{ changeMarkdown }">Change content</button>
  </div>

  <h2>Modal</h2>
  <div class="demo">
    <rg-modal modal="{ modal }">
      Well hello there!
    </rg-modal>
  </div>
  <button onclick="{ toggleModal }">Toggle modal</button>
  <button onclick="{ toggleModalType }">Toggle type</button>
  <button onclick="{ toggleModalDismissable }">Toggle dismissable</button>

  <h2>Phone Sim</h2>
  <div class="demo">
    <rg-phone-sim phonesim="{ phonesim }"></rg-phone-sim>
    <button onclick="{ changePhoneSimURL }">Change URL</button>
  </div>

  <h2>Placehold.it</h2>
  <div class="demo">
    <rg-placeholdit placeholdit="{ placeholdit }"></rg-placeholdit>
  </div>
  <button onclick="{ changePlacholdIt }">Change image</button>

  <h2>Select</h2>
  <div class="demo">
    <rg-select select="{ select }"></rg-select>
    <button onclick="{ toggleAutocomplete }">Toggle autocomplete</button>
  </div>

  <h2>SideMenu</h2>
  <div class="demo no-overflow">
    <rg-sidemenu sidemenu="{ sidemenu }"></rg-sidemenu>
  </div>
  <button onclick="{ changeSidemenu }">Change sidemenu</button>

  <h2>Tabs</h2>
  <div class="demo">
    <rg-tabs tabs="{ tabs }"></rg-tabs>
  </div>
  <button onclick="{ changeTabContent }">Change tab</button>

  <h2>Tags</h2>
  <div class="demo">
    <rg-tags tags="{ tags }"></rg-tags>
  </div>

  <h2>Time</h2>
  <div class="demo">
    <rg-time time="{ time }"></rg-time>
    <button onclick="{ changeTime }">Change time</button>
  </div>

  <h2>Toast</h2>
  <div class="demo">
    <rg-toasts toasts="{ toasts }"></rg-toasts>
    <button onclick="{ changeToasts }">Change toasts</button>
  </div>

  <h2>Toggle</h2>
  <div class="demo">
    <rg-toggle toggle="{ toggle }"></rg-toggle>
    <button onclick="{ changeToggle }">Change toggle</button>
  </div>

  <h2>Unsplash</h2>
  <div class="demo">
    <rg-unsplash unsplash="{ unsplash }"></rg-unsplash>
  </div>
  <button onclick="{ changeUnsplash }">Change image</button>

  <h3>>> END</h3>

  <script>
    /*
     * ALERTS
     */
    this.alerts = new RgAlerts({
      alerts: [{
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
      }]
    })

    this.addAlert = () => {
      this.alerts.add({
        type: 'danger',
        content: 'Eeek! <strong>Boom!</strong> Look at the <a href="#">logs</a>',
        onclick: function(alert) {
          alert.isvisible = false
        }
      })
    }

    setTimeout(() => {
      this.alerts.add({
        type: 'information',
        content: 'Test alert'
      })
      this.alerts.update()
    }, 3000)

    /*
     * BEHOLD
     */
    this.behold = new RgBehold({
      image1: 'img/first.jpg',
      image2: 'img/second.jpg'
    })

    this.changeBeholdMode = () => {
      this.behold.mode = 'fade'
    }

    this.changeBeholdImages = () => {
      this.behold.image1 = 'img/third.jpg'
    }

    /*
     * BUBBLE
     */
    this.bubble = new RgBubble({
      content: '<strong>Ping</strong>'
    })

    this.updateBubbleContent = () => {
      this.bubble.content = '<em>Pong!</em>'
    }

    /*
     * CODE
     */
    this.editorSettings = new RgCode({
      code: '<h2>Hello world!</h2>'
    })

    this.changeCode = () => {
      this.editorSettings.code = 'this.msg = "Hello RiotGear!";'
      this.editorSettings.mode = 'javascript'
    }

    /*
     * CONTEXT MENU
     */
    this.contextMenu = new RgContextMenu({
      name: 'myMenu',
      items: [{
        content: '<em>Add another item</em>',
        onclick: () => {
          this.addMenuItem()
        }
      }],
      onopen: () => console.log('menu open'),
      onclose: () => console.log('menu closed')
    })

    this.addMenuItem = () => {
      this.contextMenu.add({
        content: '<em>Add another item</em>',
        onclick: () => {
          this.addMenuItem()
        }
      })
    }

    /*
     * CREDIT CARD NUMBER
     */
    this.creditcard = new RgCreditCard({
      placeholder: 'Long number on front',
      cardnumber: '4000 0000 0000 0002'
    })

    this.changeCardNumber = () => {
      this.creditcard.cardnumber = 5105105105105100
    }

    /*
     * DATE
     */
    this.date = new RgDate({
      date: moment('14-01-1982', 'DD-MM-YYYY'),
      onselect: () => {
        this.update()
      }
    })

    this.changeDate = () => {
      this.date.date = moment()
    }

    /*
     * DRAWER
     */
		this.drawer = new RgDrawer({
			header: 'Drawer',
			isvisible: true,
      position: 'bottom',
			onselect: () => {
				this.drawer.isvisible = false
			},
			items: [{
				content: 'Item 1'
			}, {
				content: 'Item 2'
			}]
		})
    this.openDrawer = () => {
      this.drawer.open()
    }

    /*
     * INCLUDE
     */
    this.include = new RgInclude({
      url: 'inc.html'
    })
    this.unsafe = () => {
      this.include.unsafe = true
      this.include.fetch()
    }
    this.changeIncludeFile = () => {
      this.include.url = 'inc2.html'
      this.include.fetch()
    }

    /*
     * LOADING
     */
    this.loading = new RgLoading({
      isvisible: true
    })
    this.toggleLoading = () => {
      this.loading.isvisible = !this.loading.isvisible
    }

    /*
     * MARKDOWN
     */
    this.markdown = new RgMarkdown({
      url: 'inc.md'
    })
    this.changeMarkdown = () => {
      this.markdown.parse('### Hello RiotGear!')
    }

    /*
     * MAP
     */
    this.map = new RgMap()

    /*
     * MODAL
     */
    this.modal = new RgModal({
      isvisible: true,
      heading: 'Modal heading',
      buttons: [{
        content: '<em>Ok</em>',
        style: 'background-color:#000;color:#fff',
        action: () => this.modal.isvisible = false
      }]
    })

    this.toggleModal = () => {
      this.modal.isvisible = !this.modal.isvisible
    }

    this.toggleModalType = () => {
      this.modal.ghost = !this.modal.ghost
    }

    this.toggleModalDismissable = () => {
      this.modal.dismissable = !this.modal.dismissable
    }

    /*
     * PHONE SIM
     */
    this.phonesim = new RgPhoneSim({
      url: 'http://riotgear.js.org/'
    })
    this.changePhoneSimURL = () => {
      this.phonesim.url = 'http://riotjs.com'
    }

    /*
     * PLACEHOLDIT
     */
    this.placeholdit = new RgPlaceholdit()
    this.changePlacholdIt = () => {
      this.placeholdit.width = 200
      this.placeholdit.height = 100
      this.placeholdit.background = '1fadc5'
      this.placeholdit.color = '4df'
      this.placeholdit.textsize = 50
      this.placeholdit.text = 'JPEG'
      this.placeholdit.format = 'jpg'
    }

    /*
     * SELECT
     */
    this.select = new RgSelect({
      autocomplete: false,
      placeholder: 'Please select a card',
      hasfilter: true,
      filterplaceholder: 'Filter cards',
      filterfield: 'text',
      onopen: () => console.log('select opened'),
      onclose: () => console.log('select closed'),
      onfilter: () => console.log('select filtered'),
      onselect: item => console.log('select', item),
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
    })

    this.toggleAutocomplete = () => {
      this.select.autocomplete = !this.select.autocomplete
    }

    /*
     * UNSPLASH
     */
    this.unsplash = new RgUnsplash()
    this.changeUnsplash = () => {
      this.unsplash.width = 200
      this.unsplash.height = 100
      this.unsplash.greyscale = "true"
      this.unsplash.random = "true"
      this.unsplash.blur = "true"
      this.unsplash.image = "491"
      this.unsplash.gravity = "north"
    }

    /*
     * TIME
     */
    this.time = new RgTime({
      ampm: true,
      step: 15,
      min: '00:00',
      max: '23:59'
    })

    this.changeTime = () => {
      this.time.placeholder = 'Select a time'
    }

    /*
     * TOGGLE
     */
    this.toggle = new RgToggle({
      checked: true,
      ontoggle: checked => {
        console.log('checked', checked);
      }
    })

    this.changeToggle = () => {
      this.toggle.toggle()
    }

    /*
     * SIDEMENU
     */
    this.sidemenu = new RgSidemenu({
      header: 'Side Menu',
      isvisible: true,
      onselect: () => {
        this.sidemenu.isvisible = false
      },
      items: [{
        content: 'Item 1'
      }, {
        content: 'Item 2'
      }]
    })

    this.changeSidemenu = () => {
      this.sidemenu.items.push({
        content: '<em>Item x</em>'
      })
    }

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
        text: 'Russia'
      }]
    })

    /*
     * TOASTS
     */
    this.toasts = new RgToasts({
      toasts: [{
        content: 'Hey look at me!'
      }]
    })

    this.changeToasts = () => {
      this.toasts.add({
        content: 'Me is a new toast'
      })
      this.toasts.position = 'bottomleft'
    }

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
    })
    this.changeTabContent = () => {
      this.tabs.tabs[0].heading = 'take a look at tab three'
      this.tabs.tabs[3].include.url = 'inc.html'
    }

  </script>
</app>
