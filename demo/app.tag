<app>
  <rg-context-menu id="myMenu" items="{ contentMenuItems }"></rg-context-menu>
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

  <!--
  <h2>Context Menu</h2>
  <div class="demo" rg-context-menu="myMenu">
    Right click here.
  </div>

  <h2>Credit Card</h2>
  <div class="demo">
    <rg-credit-card cardno="{ creditCard }"></rg-credit-card>
    <button onclick="{ changeCreditCard }">Change Credit Card</button>
  </div>

  <h2>Date</h2>
  <div class="demo">
    <rg-date date="{ date }"></rg-date>
    { date }
    <button onclick="{ changeDate }">Change date</button>
  </div>

  <h2>GA</h2>
  <div class="demo">
    Google Analytics tag is on this page. Look at Network tab in Developer Tools
    <rg-ga property="UA-36978977-5"></rg-ga>
  </div>

  <h2>Include</h2>
  <div class="demo">
    <rg-include src="inc.html"></rg-include>
  </div>

  <h2>Loading</h2>
  <div class="demo">
    <rg-loading visible="true">
      Please wait...
    </rg-loading>
  </div>

  <h2>Map</h2>
  <div class="demo">
    <rg-map></rg-map>
  </div>

  <h2>Markdown</h2>
  <div class="demo">
    <rg-markdown src="inc.md"></rg-markdown>
  </div>

  <h2>Modal</h2>
  <div class="demo">
    <rg-modal>
      Modal body text
    </rg-modal>
  </div>

  <h2>Phone Sim</h2>
  <div class="demo">
    <rg-phone-sim src="http://riotgear.js.org/"></rg-phone-sim>
  </div>

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
    const menuItem = {
      content: '<em>Add another item</em>',
      onclick: () => {
        this.addMenuItem()
      }
    }

    this.contentMenuItems = [menuItem]

    this.addMenuItem = () => {
      this.contentMenuItems.push(menuItem)
    }

    this.changeCreditCard = () => {
      this.creditCard = 5105105105105100
    }

    this.date = '1982-01-14'

    this.changeDate = () => {
      this.date = '2015-12-25'
    }

  </script>
</app>
