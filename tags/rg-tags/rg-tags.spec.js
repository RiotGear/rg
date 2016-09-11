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
		$('rg-tags .c-menu__item').length.should.equal(0)
	})

	it('clicking on field opens/closes dropdown and calls onopen/onclose', function () {
		$('rg-tags .c-menu').length.should.equal(0)
		$('rg-tags .c-field').focus()
		$('rg-tags .c-menu').length.should.equal(1)
		spyOnOpen.should.have.been.calledOnce
		$('rg-tags').parent().click()
		$('rg-tags .c-menu').length.should.equal(0)
		spyOnClose.should.have.been.calledOnce
	})

	it('pressing key down will highlight item', function () {
		$('rg-tags .c-field').focus()
		var e = jQuery.Event('keydown')
		e.keyCode = 38
		$('rg-tags .c-field').trigger(e)
		$('rg-tags .c-menu__item.c-menu__item--hover').text().should.contain('Discover')
	})

	it('selecting an item calls onselect and resets the menu', function () {
		$('rg-tags .c-field').focus()
		$('rg-tags .c-menu__item:nth-child(3)').click()
		$('rg-tags .c-field').focus()
		$('rg-tags .c-menu__item:nth-child(3)').is('.c-menu__item--active').should.be.false
		spyOnSelect.should.have.been.calledOnce
	})

	it('opens the dropdown on enter', function () {
		var e = jQuery.Event('keydown')
		e.keyCode = 13
		$('rg-tags .c-field').trigger(e)
		$('rg-tags .c-menu').length.should.equal(1)
		spyOnOpen.should.have.been.calledOnce
	})

	it('opens the dropdown on arrow up', function () {
		var e = jQuery.Event('keydown')
		e.keyCode = 40
		$('rg-tags .c-field').trigger(e)
		$('rg-tags .c-menu').length.should.equal(1)
		spyOnOpen.should.have.been.calledOnce
	})

	it('opens the dropdown on arrow down', function () {
		var e = jQuery.Event('keydown')
		e.keyCode = 38
		$('rg-tags .c-field').trigger(e)
		$('rg-tags .c-menu').length.should.equal(1)
		spyOnOpen.should.have.been.calledOnce
	})
})
