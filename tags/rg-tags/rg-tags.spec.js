describe('rg-tags', function () {
	let tag, tags
	let spyOnOpen = sinon.spy()
	let spyOnClose = sinon.spy()
	let spyOnSelect = sinon.spy()

	beforeEach(function () {
		tags = {
			placeholder: 'Please select a card',
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
		}
		$('body').append('<rg-tags></rg-tags>')
		tag = riot.mount('rg-tags', {
			tags
		})[0]
		tag.on('open', spyOnOpen)
			.on('close', spyOnClose)
			.on('select', spyOnSelect)

	})

	afterEach(function () {
		spyOnOpen.reset()
		spyOnClose.reset()
		spyOnSelect.reset()
		tag.unmount()
	})

	it('is mounted', function () {
		tag.isMounted.should.be.true
	})

	it('has no items visible on load', function () {
		$('rg-tags .menu__item').length.should.equal(0)
	})

	it('clicking on field opens/closes dropdown and calls onopen/onclose', function () {
		$('rg-tags .menu').length.should.equal(0)
		$('rg-tags .field').focus()
		$('rg-tags .menu').length.should.equal(1)
		spyOnOpen.should.have.been.calledOnce
		$('rg-tags').parent().click()
		$('rg-tags .menu').length.should.equal(0)
		spyOnClose.should.have.been.calledOnce
	})

	it('pressing key down will highlight item', function () {
		$('rg-tags .field').focus()
		var e = jQuery.Event('keydown')
		e.keyCode = 38
		$('rg-tags .field').trigger(e)
		$('rg-tags .menu__item.menu__item--hover').text().should.contain('Discover')
	})

	it('selecting an item calls onselect and resets the menu', function () {
		$('rg-tags .field').focus()
		$('rg-tags .menu__item:nth-child(3)').click()
		$('rg-tags .field').focus()
		$('rg-tags .menu__item:nth-child(3)').is('.menu__item--active').should.be.false
		spyOnSelect.should.have.been.calledOnce
	})

	it('opens the dropdown on enter', function () {
		var e = jQuery.Event('keydown')
		e.keyCode = 13
		$('rg-tags .field').trigger(e)
		$('rg-tags .menu').length.should.equal(1)
		spyOnOpen.should.have.been.calledOnce
	})

	it('opens the dropdown on arrow up', function () {
		var e = jQuery.Event('keydown')
		e.keyCode = 40
		$('rg-tags .field').trigger(e)
		$('rg-tags .menu').length.should.equal(1)
		spyOnOpen.should.have.been.calledOnce
	})

	it('opens the dropdown on arrow down', function () {
		var e = jQuery.Event('keydown')
		e.keyCode = 38
		$('rg-tags .field').trigger(e)
		$('rg-tags .menu').length.should.equal(1)
		spyOnOpen.should.have.been.calledOnce
	})
})
