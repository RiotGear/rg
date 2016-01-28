<app>
	<rg-context-menu menu="{ contextMenu }"></rg-context-menu>
	<h2>Alert</h2>

	<div class="demo">
		<rg-alerts alerts="{ alerts }"></rg-alerts>
		<button onclick="{ addAlert }">Add alert</button>
	</div>

	<h2>Bubble</h2>

	<div class="demo">
		<rg-bubble text="{ bubble }">Hover over me</rg-bubble>
		<button onclick="{ updateBubbleText }">Change bubble</button>
	</div>

	<h2>Code</h2>

	<div class="demo">
		<rg-code editor="{ editorSettings }"></rg-code>
	</div>
	<button onclick="{ changeCode }">Change code</button>

	<!--<h2>Context Menu</h2>-->

	<!--<div class="demo" rg-context-menu="myMenu">-->
		<!--Right click here.-->
	<!--</div>-->

	<h2>Credit Card</h2>

	<div class="demo">
		<rg-credit-card-number card="{ creditcard }"></rg-credit-card-number>
		<button onclick="{ changeCardNumber }">Change Card Number</button>
	</div>

	<!--<h2>Date</h2>-->

	<!--<div class="demo">-->
		<!--<rg-date date="{ date }"></rg-date>-->
		<!--{ date.date }-->
		<!--<button onclick="{ changeDate }">Change date</button>-->
	<!--</div>-->

	<h2>Drawer</h2>

	<div class="demo no-overflow">
		<rg-drawer drawer="{ drawer }"></rg-drawer>
		<button onclick="{ openDrawer }">Open drawer</button>
	</div>

	<!--<h2>GA</h2>-->

	<!--<div class="demo">-->
		<!--Google Analytics tag is on this page. Look at Network tab in Developer Tools-->
		<!--<rg-ga property="UA-36978977-5"></rg-ga>-->
	<!--</div>-->

	<h2>Include</h2>

	<div class="demo">
		<div>
			<rg-include include="{ include }"></rg-include>
			<rg-include include="{ includeTwo }"></rg-include>
			<rg-include include="{ includeThree }"></rg-include>
		</div>
	</div>

	<h2>Map</h2>

	<div class="demo">
		<rg-map map="{ map }"></rg-map>
	</div>

	<h2>Markdown</h2>

	<div class="demo">
		<rg-markdown markdown="{ markdown }"></rg-markdown>
		<button onclick="{ changeMarkdown }">Change content</button>
	</div>

	<!--<h2>Modal</h2>-->

	<!--<div class="demo">-->
		<!--<rg-modal modal="{ modal }">-->
			<!--Well hello there!-->
		<!--</rg-modal>-->
	<!--</div>-->
	<!--<button onclick="{ toggleModal }">Toggle modal</button>-->
	<!--<button onclick="{ toggleModalType }">Toggle type</button>-->
	<!--<button onclick="{ toggleModalDismissable }">Toggle dismissable</button>-->

	<h2>Phone Sim</h2>

	<div class="demo">
		<rg-phone-sim url="{ phonesim }"></rg-phone-sim>
		<button onclick="{ changePhoneSimURL }">Change URL</button>
	</div>

	<!--<h2>Placehold.it</h2>-->

	<!--<div class="demo">-->
		<!--<rg-placeholdit placeholdit="{ placeholdit }"></rg-placeholdit>-->
	<!--</div>-->
	<!--<button onclick="{ changePlacholdIt }">Change image</button>-->

	<!--<h2>Select</h2>-->

	<!--<div class="demo">-->
		<!--<rg-select select="{ select }"></rg-select>-->
		<!--<button onclick="{ toggleAutocomplete }">Toggle autocomplete</button>-->
	<!--</div>-->

	<!--<h2>Tabs</h2>-->

	<!--<div class="demo">-->
		<!--<rg-tabs tabs="{ tabs }"></rg-tabs>-->
	<!--</div>-->
	<!--<button onclick="{ changeTabContent }">Change tab</button>-->

	<!--<h2>Tags</h2>-->

	<!--<div class="demo">-->
		<!--<rg-tags tags="{ tags }"></rg-tags>-->
	<!--</div>-->

	<!--<h2>Time</h2>-->

	<!--<div class="demo">-->
		<!--<rg-time time="{ time }"></rg-time>-->
		<!--<button onclick="{ changeTime }">Change time</button>-->
	<!--</div>-->

	<!--<h2>Toast</h2>-->

	<!--<div class="demo">-->
		<!--<rg-toasts toasts="{ toasts }"></rg-toasts>-->
		<!--<button onclick="{ changeToasts }">Change toasts</button>-->
	<!--</div>-->

	<!--<h2>Toggle</h2>-->

	<!--<div class="demo">-->
		<!--<rg-toggle toggle="{ toggle }"></rg-toggle>-->
		<!--<button onclick="{ changeToggle }">Change toggle</button>-->
	<!--</div>-->

	<!--<h2>Unsplash</h2>-->

	<!--<div class="demo">-->
		<!--<rg-unsplash unsplash="{ unsplash }"></rg-unsplash>-->
	<!--</div>-->
	<!--<button onclick="{ changeUnsplash }">Change image</button>-->

	<h3>>> END</h3>

	<script>
		/*
		 * ALERTS
		 */
		this.alerts = [{
				type: 'danger',
				text: 'Danger! Something bad happened.',
				dismissable: true,
				timeout: 2000
			}, {
				type: 'warning',
				text: 'Warning! Something sort of bad happened.',
				dismissable: false
			}, {
				type: 'information',
				text: 'Look! Something you should know about.'
			}, {
				type: 'success',
				text: 'Success! Well done.'
			}];

		this.addAlert = () => {
			this.alerts.push({
				type: 'danger',
				text: 'Eeek! Something broke...'
			})
		}

		// setTimeout(() => {
		// 	this.alerts.push({
		// 		type: 'information',
		// 		text: 'Test alert'
		// 	})
		// 	this.update()
		// }, 3000)

		/*
		 * BUBBLE
		 */
		this.bubble = 'Ping'

		this.updateBubbleText = () => {
			this.bubble = 'Pong!'
		}

		/*
		 * CODE
		 */
		this.editorSettings = {
			code: '<h2>Hello world!</h2>'
		}

		this.changeCode = () => {
			this.editorSettings.code = 'this.msg = "Hello RiotGear!";'
			this.editorSettings.mode = 'javascript'
		}

		/*
		 * CREDIT CARD NUMBER
		 */
		this.creditcard = {
			placeholder: 'Long number on front',
			cardnumber: '4000 0000 0000 0002'
		}

		this.changeCardNumber = () => {
			this.creditcard.cardnumber = 5105105105105100
		}
//
//		/*
//		 * DATE
//		 */
//		this.date = new rg.Date({
//			date: moment('14-01-1982', 'DD-MM-YYYY')
//		}).on('select', date => console.log(date))
//
//		this.changeDate = () => {
//			this.date.date = moment()
//		}
//
		/*
		 * DRAWER
		 */
		this.drawer = {
			header: 'Drawer',
			isvisible: true,
			position: 'bottom',
			items: [{
				text: 'Item 1'
			}, {
				text: 'Item 2'
			}]
		}

		this.openDrawer = () => {
			this.drawer.isvisible = true
		}

		/*
		 * INCLUDE
		 */
		this.include = {
			url: 'inc.html'
		}
		this.includeTwo = {
			url: 'inc.html',
			unsafe: true
		}
		this.includeThree = {
			url: 'inc2.html',
			unsafe: true
		}

		/*
		 * MARKDOWN
		 */
		this.markdown = {
			content: '**Some** content'
		}
		this.changeMarkdown = () => {
			this.markdown = {
				url: 'inc.md'
			}
		}
//
//		/*
//		 * MODAL
//		 */
//		this.modal = new rg.Modal({
//			isvisible: true,
//			heading: 'Modal heading',
//			buttons: [{
//				content: '<em>Ok</em>',
//				style: 'background-color:#000;color:#fff',
//				action: () => this.modal.isvisible = false
//			}]
//		})
//
//		this.toggleModal = () => {
//			this.modal.isvisible = !this.modal.isvisible
//		}
//
//		this.toggleModalType = () => {
//			this.modal.ghost = !this.modal.ghost
//		}
//
//		this.toggleModalDismissable = () => {
//			this.modal.dismissable = !this.modal.dismissable
//		}

		/*
		 * PHONE SIM
		 */
		this.phonesim = 'http://riotgear.js.org/'
		this.changePhoneSimURL = () => {
			this.phonesim = 'http://riotjs.com'
		}
//
//		/*
//		 * PLACEHOLDIT
//		 */
//		this.placeholdit = new rg.Placeholdit()
//		this.changePlacholdIt = () => {
//			this.placeholdit.width = 200
//			this.placeholdit.height = 100
//			this.placeholdit.background = '1fadc5'
//			this.placeholdit.color = '4df'
//			this.placeholdit.textsize = 50
//			this.placeholdit.text = 'JPEG'
//			this.placeholdit.format = 'jpg'
//		}
//
//		/*
//		 * SELECT
//		 */
//		this.select = new rg.Select({
//			autocomplete: false,
//			placeholder: 'Please select a card',
//			hasfilter: true,
//			filterplaceholder: 'Filter cards',
//			filterfield: 'text',
//			onopen: () => console.log('select opened'),
//			onclose: () => console.log('select closed'),
//			onfilter: () => console.log('select filtered'),
//			onselect: item => console.log('select', item),
//			options: [{
//				id: 0,
//				text: 'Visa'
//			}, {
//				id: 1,
//				text: 'MasterCard',
//				selected: true
//			}, {
//				id: 2,
//				text: 'American Express'
//			}, {
//				id: 3,
//				text: 'Discover'
//			}]
//		}).on('open', () => console.log('select opened'))
//			.on('close', () => console.log('select closed'))
//			.on('filter', () => console.log('select filtered'))
//			.on('select', () => console.log('select', item))
//
//		this.toggleAutocomplete = () => {
//			this.select.autocomplete = !this.select.autocomplete
//			this.select.update()
//		}
//
//		/*
//		 * UNSPLASH
//		 */
//		this.unsplash = new rg.Unsplash()
//		this.changeUnsplash = () => {
//			this.unsplash.width = 200
//			this.unsplash.height = 100
//			this.unsplash.greyscale = "true"
//			this.unsplash.random = "true"
//			this.unsplash.blur = "true"
//			this.unsplash.image = "491"
//			this.unsplash.gravity = "north"
//		}
//
//		/*
//		 * TIME
//		 */
//		this.time = new rg.Time({
//			ampm: true,
//			step: 15,
//			min: '00:00',
//			max: '23:59'
//		})
//
//		this.changeTime = () => {
//			this.time.placeholder = 'Select a time'
//		}
//
//		/*
//		 * TOGGLE
//		 */
//		this.toggle = new rg.Toggle({
//			checked: true
//		}).on('toggle', checked => console.log('checked', checked))
//
//		this.changeToggle = () => {
//			this.toggle.toggle()
//		}
//
//		/*
//		 * TAGS
//		 */
//		this.tags = new rg.Tags({
//			value: 'Canada',
//			placeholder: 'Choose a country',
//			options: [{
//				text: 'England'
//			}, {
//				text: 'Scotland'
//			}, {
//				text: 'Ireland'
//			}, {
//				text: 'Wales'
//			}],
//			tags: [{
//				text: 'Russia'
//			}]
//		}).on('add', tag => console.log('add tag', tag))
//			.on('remove', tag => console.log('remove tag', tag))
//
//		/*
//		 * TOASTS
//		 */
//		this.toasts = new rg.Toasts({
//			toasts: [{
//				content: 'Hey look at me!'
//			}]
//		})
//
//		this.changeToasts = () => {
//			this.toasts.add({
//				content: 'Me is a new toast'
//			})
//			this.toasts.position = 'bottomleft'
//		}
//
//		/*
//		 * TABS
//		 */
//		this.tabs = new rg.Tabs({
//			tabs: [{
//				heading: 'Tab <em>one</em>',
//				content: 'This is tab one'
//			}, {
//				heading: 'Tab two',
//				content: 'This is tab two',
//				active: true
//			}, {
//				heading: 'Disabled tab',
//				content: 'This is disabled tab',
//				disabled: true
//			}, {
//				heading: 'Tab three',
//				content: 'This is tab three content',
//				include: new rg.Include({
//					url: 'tab.html',
//					unsafe: true
//				})
//			}]
//		}).on('open', tab => console.log(tag))
//
//		this.changeTabContent = () => {
//			this.tabs.tabs[0].heading = 'take a look at tab three'
//			this.tabs.tabs[3].include.url = 'inc.html'
//		}

	</script>
</app>
