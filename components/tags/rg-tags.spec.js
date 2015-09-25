describe('rg-tags', function() {
  let tag

  beforeEach(function() {
    $('body').append(`<rg-tags type="text"
                        value="Canada"
                        opened="false"
                        placeholder="Enter a country name">
                      </rg-tags>`)
    tag = riot.mount('rg-tags', {
      options: [{
        text: 'England'
      }, {
        text: 'Scotland'
      }, {
        text: 'Wales'
      }, {
        text: 'Ireland'
      }],
      tags: [{
        text: 'America'
      }]
    })[0]
  })

  afterEach(function() {
    tag.unmount()
  })

  it('is mounted', function() {
    tag.isMounted.should.be.true
  })

  it('has the correct value in the text box', function() {
    $('input[name=textbox]').val().should.equal('Canada')
  })

  it('has correct number of tags', function() {
    $('.tag').length.should.equal(1)
    $('.tag').text().should.contain('America')
  })

  it('pressing enter will add the value to the list of tags', function() {
    $('input[name=textbox]').focus()
    let e = $.Event('keydown')
    e.keyCode = 13
    $('input[name=textbox]').trigger(e)
    $('.tag').length.should.equal(2)
    $('.tag:nth-child(2)').text().should.contain('Canada')
  })

  it('pressing enter with no text will be ignored', function() {
    $('input[name=textbox]').focus()
    $('input[name=textbox]').val('')
    let e = $.Event('keydown')
    e.keyCode = 13
    $('input[name=textbox]').trigger(e)
    $('.tag').length.should.equal(1)
  })

  it('clicking on a tag will remove it', function() {
    $('.tag').click()
    $('.tag').length.should.equal(0)
  })

  it('pressing backspace will remove the tag and add the value to the input if value is empty', function() {
    $('input[name=textbox]').val('').trigger('input')
    let e = $.Event('keydown')
    e.keyCode = 8
    $('input[name=textbox]').trigger(e)
    $('.tag').length.should.equal(0)
    $('input[name=textbox]').val().should.equal('America')
  })

  it('filters the autocomplete list', function() {
    $('input[name=textbox]').val('land').trigger('input')
    $('.item').length.should.equal(3)
  })
})
