describe('rg-map', function () {
	let tag

	afterEach(function () {
		tag.unmount()
	})

	it('is mounted', function () {
		$('body').append('<rg-map></rg-map>')
		tag = riot.mount('rg-map')[0]
		tag.isMounted.should.be.true
	})

	it('doesnt add map script tag twice', function () {
		$('body').append('<script id="gmap_script"></script>')
		$('body').append('<rg-map></rg-map>')
		tag = riot.mount('rg-map')[0]
		$('#gmap_script').length.should.equal(1)
	})
})
