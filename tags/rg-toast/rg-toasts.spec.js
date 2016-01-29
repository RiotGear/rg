describe('rg-toast', function () {
	let tag, onClickSpy, onCloseSpy, toasts

	beforeEach(function () {
		onClickSpy = sinon.spy()
		onCloseSpy = sinon.spy()
		toasts = {
			position: 'bottomleft',
			toasts: [{
				text: 'Auto disappear',
				timeout: 500
			}, {
				text: 'Auto disappear call onclose',
				timeout: 1000
			}, {
				text: 'Sticky toast',
				sticky: true
			}]
		}
		$('body').append('<rg-toasts></rg-toasts>')
		tag = riot.mount('rg-toasts', {
			toasts
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

	it('position can be set', function () {
		$('rg-toasts .toasts--bottomleft').length.should.equal(1)
	})

	it('has correct number of toasts', function () {
		$('rg-toasts .toast').length.should.equal(3)
		$('rg-toasts .toast').text().should.contain('Auto disappear')
		$('rg-toasts .toast').text().should.contain('Auto disappear call onclose')
		$('rg-toasts .toast').text().should.contain('Sticky toast')
	})

	it('disappears on click', function () {
		$('rg-toasts .toast:first-child').click()
		$('rg-toasts .toast').length.should.equal(2)
	})

	it('called onclick on click', function () {
		$('rg-toasts .toast:nth-child(3)').click()
		onClickSpy.should.have.been.called
	})
})

describe('rg-toast no position', function () {
	let tag, toasts

	beforeEach(function () {
		toasts = {
			toasts: [{
				text: 'Auto disappear',
				timeout: 500
			}]
		}
		$('body').append('<rg-toasts></rg-toasts>')
		tag = riot.mount('rg-toasts', {
			toasts
		})[0]
	})

	afterEach(function () {
		tag.unmount()
	})

	it('is mounted', function () {
		tag.isMounted.should.be.true
	})

	it('position is defaulted', function () {
		$('rg-toasts .toasts--bottomright').length.should.equal(1)
	})
})

describe('rg-toast no events', function () {
	let tag, onClickSpy, onCloseSpy, toasts

	beforeEach(function () {
		toasts = {
			toasts: [{
				text: 'Auto disappear',
				timeout: 500
			}, {
				text: 'Sticky toast',
				sticky: true
			}]
		}
		onClickSpy = sinon.spy()
		onCloseSpy = sinon.spy()
		$('body').append('<rg-toasts></rg-toasts>')
		tag = riot.mount('rg-toasts', {
			toasts
		})[0]
	})

	afterEach(function () {
		tag.unmount()
	})

	it('is mounted', function () {
		tag.isMounted.should.be.true
	})

	it('onclick and onclose not called on click', function () {
		$('rg-toasts .toast:nth-child(3)').click()
		onClickSpy.should.not.have.been.called
		onCloseSpy.should.not.have.been.called
	})
})
