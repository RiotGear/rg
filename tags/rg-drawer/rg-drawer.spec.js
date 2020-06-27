describe('rg-drawer', function () {
	let tag, drawer
	let onClickSpy = sinon.spy()
	let onCloseSpy = sinon.spy()

	beforeEach(function () {
		$('body').append('<rg-drawer></rg-drawer>')
		drawer = {
			header: 'Side Menu',
			isvisible: true,
			items: [{
				text: 'Item 1'
			}, {
				text: 'Item 2'
			}]
		}

		tag = riot.mount('rg-drawer', {
			drawer
		})[0]

		tag.on('select', onClickSpy)
		.on('close', onCloseSpy)
	})

	afterEach(function () {
		tag.unmount()
	})

	it('is mounted', function () {
		tag.isMounted.should.be.true
	})

	it('has an overlay', function () {
		$('rg-drawer .c-overlay').length.should.equal(1)
		$('rg-drawer .c-drawer').is('.c-drawer--visible').should.be.true
	})

	it('header is set correctly', function () {
		$('rg-drawer .c-heading').text().should.contain('Side Menu')
	})

	it('has items', function () {
		$('rg-drawer .c-menu__item').length.should.equal(2)
		$('rg-drawer .c-menu__item:nth-child(1)').text().should.contain('Item 1')
		$('rg-drawer .c-menu__item:nth-child(2)').text().should.contain('Item 2')
	})

	it('clicking an item activates it', function () {
		$('rg-drawer .c-menu__item:nth-child(1)').is('.c-menu__item--active').should.be.false
		$('rg-drawer .c-menu__item:nth-child(2)').is('.c-menu__item--active').should.be.false
		$('rg-drawer .c-menu__item:nth-child(1)').click()
		$('rg-drawer .c-menu__item:nth-child(1)').is('.c-menu__item--active').should.be.true
		$('rg-drawer .c-menu__item:nth-child(2)').is('.c-menu__item--active').should.be.false
		$('rg-drawer .c-menu__item:nth-child(2)').click()
		$('rg-drawer .c-menu__item:nth-child(1)').is('.c-menu__item--active').should.be.false
		$('rg-drawer .c-menu__item:nth-child(2)').is('.c-menu__item--active').should.be.true
	})

	it('clicking overlay closes draw', function () {
		$('rg-drawer .c-overlay').click()
		$('rg-drawer .c-overlay').length.should.equal(0)
		$('rg-drawer .c-drawer').is('.c-drawer--visible').should.be.false
	})
})
