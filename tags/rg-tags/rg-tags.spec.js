describe('rg-tags', function () {
	let tag, tags

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
	})

	afterEach(function () {
		tag.unmount()
	})

	it('is mounted', function () {
		tag.isMounted.should.be.true
	})

	it('has no items visible on load', function () {
		$('rg-tags .menu__item').length.should.equal(0)
	})

	it('selecting an item calls onselect and resets the menu', function () {
		$('rg-tags .field').focus()
		$('rg-tags .menu__item:nth-child(3)').click()
		tag.root.querySelectorAll('.tag').length.should.equal(1)
		tag.root.querySelector('.button').click()
		tag.root.querySelectorAll('.tag').length.should.equal(0)
	})
})
