const deepClone = obj => {
  if(obj===null || typeof obj !== "object"){
    return obj;
  }

  if(obj instanceof Date){
    return new Date(obj.getTime());
  }

  if(Array.isArray(obj)){
    var clonedArr = [];
    obj.forEach(function(element){
      clonedArr.push(deepClone(element))
    });
    return clonedArr;
  }

  let clonedObj = new obj.constructor();
  for(var prop in obj){
    if(obj.hasOwnProperty(prop)){
      clonedObj[prop] = deepClone(obj[prop]);
    }
  }
  return clonedObj;
}

const newTag = (tagName, opts) => {
  const element = document.createElement(tagName)
  document.body.appendChild(element)
  const tag = window.riot.mount(element, deepClone(opts))[0]

  // in anticipation of riot 4
  tag.$ = q => tag.root.querySelector(q)
  tag.$$ = q => tag.root.querySelectorAll(q)
  return tag
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
MockXMLHttpRequest.is_mock = true

OGXMLHttpRequest.is_mock = false
const mockAjax = () => {
  window.XMLHttpRequest = MockXMLHttpRequest
}

const unmockAjax = () => {
  window.XMLHttpRequest = OGXMLHttpRequest
}

const mySpy = (tag, events) => {
  let last = {}
  const spies = {}
  events.forEach( e => {
    spies[e] = sinon.spy()
    tag.on(e, spies[e])
  })
  const validate = (values) => {
    Object.assign(last,values)
    events.forEach(e => {
      spies[e].callCount.should.equal(last[e] || 0)
    })
  }
  validate.reset = () => {
    last = {}
    events.forEach(e => spies[e].resetHistory())
  }
  return validate
}