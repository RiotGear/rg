describe('rg-select', function () {
	let tag, select
	let spyOnOpen = sinon.spy()
	let spyOnClose = sinon.spy()
	let spyOnSelect = sinon.spy()

	beforeEach(function () {
		select = {
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
		$('body').append('<rg-select></rg-select>')
		tag = riot.mount('rg-select', {
			select
		})[0]
		tag.on('open', spyOnOpen)
			.on('close', spyOnClose)
			.on('select', spyOnSelect)
	})

	afterEach(function () {
		spyOnOpen.resetHistory()
		spyOnClose.resetHistory()
		spyOnSelect.resetHistory()
		tag.unmount()
	})

	it('is mounted', function () {
		tag.isMounted.should.be.true
	})

	it('text input is readonly', function () {
		should.exist($('rg-select .field').attr('readonly'))
	})

	it('has no items visible on load', function () {
		$('rg-select .menu__item').length.should.equal(0)
	})

	it('focusing/blurring field opens/closes dropdown and triggers open/close event', function () {
		$('rg-select .menu').length.should.equal(0)
		tag.root.querySelector('.field').focus()
		$('rg-select .menu').length.should.equal(1)
		spyOnOpen.should.have.been.calledOnce
		$('rg-select').parent().click()
		$('rg-select .menu').length.should.equal(0)
		spyOnClose.should.have.been.calledOnce
	})

	it('pressing key down will highlight item', function () {
		const field = tag.root.querySelector(".field")
		field.focus()
		tag.keydown({ keyCode: 38, preventDefault: () => {} })
		tag.update()
		$('rg-select .menu__item.menu__item--hover').text().should.contain('Discover')
	})

	it('selecting an item sets it to selected and calls onselect', function () {
		const field = tag.root.querySelector(".field")
		field.focus()
		$('rg-select .menu__item:nth-child(3)')[0].click()
		field.value.should.equal('American Express')
		field.blur()
		field.focus()
		$('rg-select .menu__item:nth-child(3)').is('.menu__item--active').should.be.true
		spyOnSelect.should.have.been.calledOnce
	})

	it('opens the dropdown on enter', function () {
		tag.keydown({ keyCode: 13, preventDefault: () => {} })
		tag.update()
		$('rg-select .menu').length.should.equal(1)
		spyOnOpen.should.have.been.calledOnce
	})

	it('opens the dropdown on arrow up', function () {
		tag.keydown({ keyCode: 38, preventDefault: () => {} })
		tag.update()
		$('rg-select .menu').length.should.equal(1)
		spyOnOpen.should.have.been.calledOnce
	})

	it('opens the dropdown on arrow down', function () {
		tag.keydown({ keyCode: 40, preventDefault: () => {} })
		tag.update()
		$('rg-select .menu').length.should.equal(1)
		spyOnOpen.should.have.been.calledOnce
	})
})
