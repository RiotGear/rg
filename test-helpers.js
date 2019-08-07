const newTag = (tagName, opts) => {
  const element = document.createElement(tagName)
  document.body.appendChild(element)
  return window.riot.mount(element, opts)[0]
}

const OGXMLHttpRequest = XMLHttpRequest

const MockXMLHttpRequest = function() {
  return {
    open(_method, url) {
      this.url = url
      this.responseText = MockXMLHttpRequest[url]
      if (!this.responseText) {
        throw `Mocked url response missing for ${url}`
      }
    },
    send() {
      this.onload && this.onload(this.responseText)
    }
  }
}


MockXMLHttpRequest['yay.html'] = "Yay!"

const mockAjax = () => {
  window.XMLHttpRequest = MockXMLHttpRequest
}

const unmockAjax = () => {
  window.XMLHttpRequest = OGXMLHttpRequest
}