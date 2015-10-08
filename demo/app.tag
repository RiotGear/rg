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

  <!--
  <h2>Map</h2>
  <div class="demo">
    <rg-map></rg-map>
  </div>
  -->
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

<!--
  <h2>Placehold.it</h2>
  <div class="demo">
    <rg-placeholdit width="200" height="100" background-color="1fadc5" color="4df" font-size="50" text="JPEG" format="jpg"></rg-placeholdit>
  </div>

  <h2>Select</h2>
  <div class="demo">
    <rg-select id="dropdown"></rg-select>
  </div>

  <h2>Select: Autocomplete</h2>
  <div class="demo">
    <label>Auto complete</label>
    <rg-select id="autocomplete"></rg-select>
  </div>

  <h2>SideMenu</h2>
  <div class="demo no-overflow">
    <rg-sidemenu></rg-sidemenu>
  </div>

  <h2>Tabs</h2>
  <div class="demo">
    <rg-tabs>
      <rg-tab>
        <rg-tab-heading>Tab
          <em>One</em>
        </rg-tab-heading>
        The first tab content
      </rg-tab>

      <rg-tab heading="Tab 2" active="true">
        Tab two
      </rg-tab>

      <rg-tab heading="Tab 3">
        Tab three
      </rg-tab>

      <rg-tab heading="Tab 4" disabled="true">
        Tab four
      </rg-tab>

      <rg-tab heading="Tab 5">
        Tab five
      </rg-tab>
    </rg-tabs>
  </div>

  <h2>Tags</h2>
  <div class="demo">
    <rg-tags type="text" value="Canada" placeholder="Enter a country name"></rg-tags>
  </div>

  <h2>Time</h2>
  <div class="demo">
    <rg-time time="now" ampm="true" step="15" min="08:00" max="16:30">
    </rg-time>
  </div>

  <h2>Toast</h2>
  <div class="demo">
    <rg-toast position="topleft"></rg-toast>
  </div>

  <h2>Toggle</h2>
  <div class="demo">
    <rg-toggle checked="true"></rg-toggle>
  </div>

  <h2>Unsplash</h2>
  <div class="demo">
    <rg-unsplash random="true"></rg-unsplash>
  </div> -->

  <h3>>> END</h3>

  <script>
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
    }])

    this.addAlert = () => {
      this.alerts.add({
        type: 'danger',
        content: 'Eeek! <strong>Boom!</strong> Look at the <a href="#">logs</a>',
        onclick: function(alert) {
          alert.isvisible = false
        }
      })
    }

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
      date: moment('14-01-1982', 'DD-MM-YYYY')
    })

    this.changeDate = () => {
      this.date.date = moment()
    }

    this.date.on('change', () => {
      this.update()
    })

    /*
     * INCLUDE
     */
    this.include = new RgInclude({
      src: 'inc.html'
    })
    this.unsafe = () => {
      this.include.unsafe = true
    }
    this.changeIncludeFile = () => {
      this.include.src = 'inc2.html'
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
       src: 'inc.md'
     })
     this.changeMarkdown = () => {
       this.markdown.parse('### Hello RiotGear!')
     }

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
         src: 'http://riotgear.js.org/'
       })
       this.changePhoneSimURL = () => {
         this.phonesim.src = 'http://riotjs.com'
       }

  </script>
</app>
