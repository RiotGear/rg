riot.tag("rg-markdown", "", "", "", function(opts) {
    var _this = this ;

    this.on("before-mount", function() {

      if (!opts.markdown) {
         opts.markdown = {
            content: (opts.content ? opts.content : "")
         }
      }

      if (opts.content) {
         opts.markdown.content = opts.content ;
         }

     if (this.__.innerHTML)
        opts.markdown.content = this.__.innerHTML ;


    }) ;


    this.on("mount", function() {
      if (commonmark) {
          this.reader = new commonmark.Parser;
          this.writer = new commonmark.HtmlRenderer
      }

        if (!opts.markdown) opts.markdown = {};
        if (opts.markdown.content) {
            _this.root.innerHTML = _this.writer.render(_this.reader.parse(opts.markdown.content))
        } else if (opts.markdown.url) {
            (function() {
                var req = new XMLHttpRequest;
                req.onload = function(resp) {
                    _this.root.innerHTML = _this.writer.render(_this.reader.parse(req.responseText));
                    _this.trigger("loaded")
                };
                req.open("get", opts.markdown.url, true);
                req.send();
                _this.trigger("loading")
            })()
        }
    }) ;

});
