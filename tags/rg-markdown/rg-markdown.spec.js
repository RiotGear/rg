describe('rg-markdown', function() {
  let tag, markdown
  let spy = sinon.spy()

  afterEach(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    tag = newTag('rg-markdown')
    tag.isMounted.should.be.true
  })

  it('renders HTML', function () {
    tag = newTag('rg-markdown', {
      markdown: { content: '**Some** other content' }
    })
    $('rg-markdown').html().should.contain('<p><strong>Some</strong> other content</p>')
  })

  it('renders url', function (done) {
    mockAjax()
    tag = newTag('rg-markdown')
    tag.opts.markdown.url = 'yay.html'
    tag.on('loaded', () => {
      $('rg-markdown').html().should.contain("<p>Yay!</p>")
      unmockAjax()
      done()
    })
    tag.update()
  })
})
