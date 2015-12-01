describe('rg-toast', function () {
	let tag, onClickSpy, onCloseSpy, toasts

	beforeEach(function () {
		onClickSpy = sinon.spy()
		onCloseSpy = sinon.spy()
		toasts = new RgToasts({
			position: 'bottomleft',
			toasts: [{
				content: 'Auto disappear',
				timeout: 500
			}, {
				content: 'Auto disappear call onclose',
				timeout: 1000
			}, {
				content: 'Sticky toast',
				sticky: true
			}]
		}).on('select', onClickSpy)
			.on('close', onCloseSpy)
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

	it('position can be set', function () {
		tag.RgToasts.position.should.equal('bottomleft')
	})

	it('has correct number of toasts', function () {
		$('rg-toasts .toast.isvisible').length.should.equal(3)
		$('rg-toasts .toast.isvisible').text().should.contain('Auto disappear')
		$('rg-toasts .toast.isvisible').text().should.contain('Auto disappear call onclose')
		$('rg-toasts .toast.isvisible').text().should.contain('Sticky toast')
	})

	it('disappears automatically after timeout with on close', function (done) {
		setTimeout(function () {
			$('rg-toasts .toast.isvisible').length.should.equal(1)
			onCloseSpy.should.have.been.called
			done()
		}, 1001)
	})

	it('disappears on click', function () {
		$('rg-toasts .toast.isvisible:first-child').click()
		$('rg-toasts .toast.isvisible').length.should.equal(2)
	})

	it('called onclick on click', function () {
		$('rg-toasts .toast.isvisible:nth-child(3)').click()
		onClickSpy.should.have.been.called
	})
})

describe('rg-toast no position', function () {
	let tag, toasts

	beforeEach(function () {
		toasts = new RgToasts({
			toasts: [{
				content: 'Auto disappear',
				timeout: 500
			}]
		})
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
		tag.RgToasts.position.should.equal('topright')
	})
})

describe('rg-toast no events', function () {
	let tag, onClickSpy, onCloseSpy, toasts

	beforeEach(function () {
		toasts = new RgToasts({
			toasts: [{
				content: 'Auto disappear',
				timeout: 500
			}, {
				content: 'Sticky toast',
				sticky: true
			}]
		})
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

	it('onclose not called after timeout', function (done) {
		setTimeout(function () {
			$('rg-toasts .toast.isvisible').length.should.equal(1)
			onCloseSpy.should.not.have.been.called
			done()
		}, 501)
	})

	it('onclick and onclose not called on click', function () {
		$('rg-toasts .toast.isvisible:nth-child(3)').click()
		onClickSpy.should.not.have.been.called
		onCloseSpy.should.not.have.been.called
	})
})
