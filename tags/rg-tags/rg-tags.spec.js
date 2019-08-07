describe('rg-tags', function () {
	let tag, tags
	const default_opts = {
		tags: {
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
	}

	afterEach(function () {
		tag.unmount()
	})

	it('is mounted (no opts)', function () {
		tag = newTag('rg-tags')
		tag.isMounted.should.be.true
	})

	it('is mounted (empty opts.tags)', function () {
		tag = newTag('rg-tags', {tags: {}})
		tag.isMounted.should.be.true
	})

	it('has no items visible on load', function () {
		tag = newTag('rg-tags', default_opts)
		$('rg-tags .menu__item').length.should.equal(0)
	})

	it('loads a tag via opts', function () {
		tag = newTag('rg-tags', {tags: { tags: [ { name: 'foo' } ]}})
		tag.root.querySelectorAll('.tag').length.should.equal(1)
	})

	it('selecting an item calls onselect and resets the menu', function () {
		tag = newTag('rg-tags',default_opts)
		$('rg-tags .field').focus()
		$('rg-tags .menu__item:nth-child(3)').click()
		tag.root.querySelectorAll('.tag').length.should.equal(1)
		tag.root.querySelector('.button').click()
		tag.root.querySelectorAll('.tag').length.should.equal(0)
	})

	it('cannot add the same tag twice', function() {
		tag = newTag('rg-tags',default_opts)
		tag.addTag(default_opts.tags.options[0])
		tag.update()
		tag.root.querySelectorAll('.tag').length.should.equal(1)
		tag.addTag(default_opts.tags.options[0])
		tag.update()
		tag.root.querySelectorAll('.tag').length.should.equal(1)
		tag.addTag(default_opts.tags.options[1])
		tag.update()
		tag.root.querySelectorAll('.tag').length.should.equal(2)
		tag.root.querySelectorAll('.tag')[1].click()
		tag.root.querySelectorAll('.tag').length.should.equal(1)
	})
})
