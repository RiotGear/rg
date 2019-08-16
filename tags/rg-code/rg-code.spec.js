describe('rg-code', function() {
  let tag, spy, editor

  const getOpts = extra => {
    const _default = {
      theme: 'monokai',
      mode: 'javascript',
      tabsize: '2',
      softtabs: 'true',
      wordwrap: 'true',
      readonly: 'true',
      onchange: spy
    }
    return Object.assign(_default, extra)
  }

  beforeEach(function() {
    spy = sinon.spy()
  })

  afterEach(function() {
    tag.unmount()
  })

  it('allows code for opts', function() {
    tag = newTag('rg-code', {
      editor: getOpts({ code: '<h2>Hello world!</h2>' })
    })
    tag.isMounted.should.be.true
    spy.should.not.have.been.called
  })

  it('allows url for opts', function(done) {
    mockAjax()
    tag = newTag('rg-code', {
      editor: getOpts({ url: 'yay.html' })
    })
    tag.isMounted.should.be.true
    setTimeout(() => {
      // gotta kick this into another thread to catch the faked ajax
      tag.root.innerText.should.equal('1\nYay!')
      unmockAjax()
      done()
    },0)
  })
})

describe('rg-code no opts', function() {
  let tag

  beforeEach(function() {
    $('body').append('<rg-code></rg-code>')
    tag = riot.mount('rg-code')[0]
  })

  afterEach(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
  })
})
