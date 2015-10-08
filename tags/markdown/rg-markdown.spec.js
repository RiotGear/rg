describe('rg-markdown', function() {
  let tag, markdown
  let spy = sinon.spy()

  beforeEach(function() {
    markdown = new RgMarkdown()
    $('body').append('<rg-markdown></rg-markdown>')
    tag = riot.mount('rg-markdown', {
      markdown
    })[0]
  })

  afterEach(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
  })

  it('renders HTML', function () {
    markdown.parse('# Heading')
    $('rg-markdown').html().should.contain('<h1>Heading</h1>')
  })
})
