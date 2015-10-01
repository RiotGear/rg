<app>
  <rg-context-menu id="myMenu"></rg-context-menu>
  <h2>Alert</h2>
  <div class="demo">
    <rg-alert alerts="{ alerts }"></rg-alert>
    <button onclick="{ addAlert }">Add alert</button>
  </div>

  <h2>Behold</h2>
  <div class="demo">
    <rg-behold image1="img/first.jpg" image2="img/second.jpg"></rg-behold>
  </div>

  <h2>Bubble</h2>
  <div class="demo">
    <rg-bubble content="{ bubbleContent || '<strong>ping</strong>' }">Hover over me</rg-bubble>
    <button onclick="{ updateBubbleContent }">Update bubble content</button>
  </div>

  <h2>Code</h2>
  <div class="demo">
    <rg-code theme="monokai" mode="html" tabsize="2" softtabs="false" wordwrap="false" readonly="false" code="<h2>Hello world!</h2>">
    </rg-code>
  </div>

  <h2>Context Menu</h2>
  <div class="demo" rg-context-menu="myMenu">
    Right click here.
  </div>

  <h2>Credit Card</h2>
  <div class="demo">
    <rg-credit-card cardno="4000 0000 0000 0002"></rg-credit-card>
  </div>

  <h2>Date</h2>
  <div class="demo">
    <rg-date></rg-date>
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
  </div>

  <script>
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
    }]

    this.addAlert = () => {
      this.alerts.push({
        type: 'danger',
        content: 'Eeek! <strong>Boom!</strong> Look at the <a href="#">logs</a>',
        onclick: function(alert) {
          alert.isvisible = false
        }
      });
    }

    this.updateBubbleContent = () => {
      this.bubbleContent = '<em>pong!</em>'
    }

  </script>
</app>
