(function (global) {
  var metaViewport = document.querySelector('meta[name="viewport"]');
  var metaCharset = document.querySelector('meta[charset]');
  var metaViewportStr = metaViewport && metaViewport.outerHTML || '';
  var metaCharsetStr = metaCharset && metaCharset.outerHTML || '';
  var queryCache = {};

  /**
   * Get the styling nodes to inject in the head of the embedded document
   *
   * @param  {String} selector
   * @return {String}
   */
  function getStylingNodes (selector) {
    if (typeof queryCache[selector] === 'undefined') {
      queryCache[selector] = Array.prototype.map.call(
        document.querySelectorAll(selector),
        function (stylesheet) {
          return stylesheet.outerHTML;
        }
      ).join('');
    }

    return queryCache[selector];
  }

  /**
   * Get the content for the iframified version of a node.
   *
   * @param  {HTMLElement} node
   * @param  {Object} options
   * @return {String}
   */
  function getIframeContentForNode (node, options) {
    return '<!doctype html>' +
      '<html ' + options.htmlAttr + '>' +
      '<head>' +
        options.metaCharset +
        options.metaViewport +
        options.stylesheets +
        options.styles +
      '</head>' +
      '<body ' + options.bodyAttr + '>' +
        node.innerHTML +
      '</body>' +
      '</html>';
  }

  /**
   * Format an object of attributes into a HTML string
   *
   * @param  {Object} attrObj
   * @return {String}
   */
  function formatAttributes (attrObj) {
    var attributes = [];

    for (var attribute in attrObj) {
      attributes.push(attribute + '="' + attrObj[attribute] + '"');
    }

    return attributes.join(' ');
  }

  /**
   * Get document height (stackoverflow.com/questions/1145850/)
   *
   * @param  {Document} doc
   * @return {Number}
   */
  function getDocumentHeight (doc) {
    doc = doc || document;
    var body = doc.body;
    var html = doc.documentElement;

    return Math.max(
      body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight
    );
  }

  function getOptions (options) {
    var opts = options || {};
    opts.htmlAttr = formatAttributes(opts.htmlAttr || {});
    opts.bodyAttr = formatAttributes(opts.bodyAttr || {});
    opts.sizingTimeout = opts.sizingTimeout || 500;
    opts.styles = (opts.styles ? '<style>' + opts.styles + '</style>' : '');
    opts.stylesheets = getStylingNodes(opts.stylesSelector || 'link[rel*=stylesheet], style');
    opts.metaCharset = opts.metaCharset || metaCharsetStr;
    opts.metaViewport = opts.metaViewport || metaViewportStr;

    return opts;
  }

  /**
   * Transform a collection of nodes into an iframe version of themselves
   * including all the styles they need to perform correctly.
   *
   * @param  {HTMLElement} nodes
   * @param  {Object} options
   * @return undefined
   */
  function iframify (node, options) {
    options = getOptions(options);

    var iframe = document.createElement('iframe');
    var html = getIframeContentForNode(node, options);
    iframe.srcdoc = html;

    if (!('srcdoc' in iframe)) {
      console.log(
        'Your browser does not support the `srcdoc` attribute on elements.' +
        'Therefore, it is not possible to wrap this node with an iframe due' +
        'to CORS policy.'
      );

      return null;
    }

    node.parentNode.replaceChild(iframe, node);

    setTimeout(function () {
      var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
      iframe.height = getDocumentHeight(iframeDocument);
    }, options.sizingTimeout);

    return iframe;
  }

  global.iframify = iframify;
}(window));
