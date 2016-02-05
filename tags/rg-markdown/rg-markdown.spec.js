describe('rg-markdown', function() {
  let tag, markdown
  let spy = sinon.spy()

  beforeEach(function() {
    markdown = {
      content: '**Some** other content'
    }
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
    $('rg-markdown').html().should.contain('<p><strong>Some</strong> other content</p>')
  })
})
