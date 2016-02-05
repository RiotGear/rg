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
		$('rg-drawer .overlay').length.should.equal(1)
		$('rg-drawer .drawer').is('.drawer--visible').should.be.true
	})

	it('header is set correctly', function () {
		$('rg-drawer .heading').text().should.contain('Side Menu')
	})

	it('has items', function () {
		$('rg-drawer .menu__item').length.should.equal(2)
		$('rg-drawer .menu__item:nth-child(1)').text().should.contain('Item 1')
		$('rg-drawer .menu__item:nth-child(2)').text().should.contain('Item 2')
	})

	it('clicking an item activates it', function () {
		$('rg-drawer .menu__item:nth-child(1)').is('.menu__item--active').should.be.false
		$('rg-drawer .menu__item:nth-child(2)').is('.menu__item--active').should.be.false
		$('rg-drawer .menu__item:nth-child(1)').click()
		$('rg-drawer .menu__item:nth-child(1)').is('.menu__item--active').should.be.true
		$('rg-drawer .menu__item:nth-child(2)').is('.menu__item--active').should.be.false
		$('rg-drawer .menu__item:nth-child(2)').click()
		$('rg-drawer .menu__item:nth-child(1)').is('.menu__item--active').should.be.false
		$('rg-drawer .menu__item:nth-child(2)').is('.menu__item--active').should.be.true
	})

	it('clicking overlay closes draw', function () {
		$('rg-drawer .overlay').click()
		$('rg-drawer .overlay').length.should.equal(0)
		$('rg-drawer .drawer').is('.drawer--visible').should.be.false
	})
})
