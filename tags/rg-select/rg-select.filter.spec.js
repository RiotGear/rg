describe('rg-select', function () {
	let tag, select
	let spyOnOpen = sinon.spy()
	let spyOnClose = sinon.spy()
	let spyOnSelect = sinon.spy()
	let spyOnFilter = sinon.spy()

	beforeEach(function () {
		select = {
			placeholder: 'Please select a card',
			filter: 'text',
			options: [{
				id: 0,
				text: 'Visa'
			}, {
				id: 1,
				text: 'MasterCard'
			}, {
				id: 2,
				text: 'American Express'
			}, {
				id: 3,
				text: 'Discover'
			}]
		}
		$('body').append('<rg-select></rg-select>')
		tag = riot.mount('rg-select', {
			select
		})[0]
		tag.on('open', spyOnOpen)
			.on('close', spyOnClose)
			.on('select', spyOnSelect)
			.on('filter', spyOnFilter)

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

	it('text input is editable', function () {
		should.not.exist($('rg-select .field').attr('readonly'))
	})

	it('opens the menu on focus', function () {
		$('rg-select .menu').length.should.equal(0)
		$('rg-select .field').focus()
		$('rg-select .menu').length.should.equal(1)
	})

	it('adding text to box filters the options list', function () {
		$('rg-select .menu').length.should.equal(0)
		$('rg-select .field').focus()
		$('rg-select .menu').length.should.equal(1)
		$('rg-select .menu__item').length.should.equal(4)
		spyOnOpen.should.have.been.calledOnce
		$('rg-select .field').val('m').trigger('input')
		spyOnFilter.should.have.been.calledOnce
		$('rg-select .menu__item').length.should.equal(2)
	})
})
