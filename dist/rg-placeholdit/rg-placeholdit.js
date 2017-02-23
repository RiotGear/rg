riot.tag("rg-placeholdit",
          '<img riot-src="https://placeholdit.imgix.net/~text?bg={opts.placeholdit.background}'+
          '&txtclr={opts.placeholdit.color}&txt={opts.placeholdit.text}'+
          '&txtsize={opts.placeholdit.textsize}&w={opts.placeholdit.width}'+
          '&h={opts.placeholdit.height}&fm={opts.placeholdit.format}">', "", "",
          function(opts) {

    this.on("before-mount", function() {
        if (!opts.placeholdit) opts.placeholdit = {};
        opts.placeholdit.width = opts.placeholdit.width || 450;
        opts.placeholdit.height = opts.placeholdit.height || 250;
        opts.placeholdit.background = opts.placeholdit.background || "000";
        opts.placeholdit.color = opts.placeholdit.color || "fff";
        opts.placeholdit.text = opts.placeholdit.text || opts.placeholdit.width + " x " + opts.placeholdit.height;
        opts.placeholdit.textsize = opts.placeholdit.textsize || 30;
        opts.placeholdit.format = opts.placeholdit.format || "png"

        if (opts.width)
           opts.placeholdit.width = Number(opts.width) ;

        if (opts.height)
          opts.placeholdit.height = Number(opts.height) ;

        if (opts.background)
           opts.placeholdit.background = opts.background ;

        if (opts.color)
           opts.placeholdit.color = opts.color ;

        if (opts.text)
          opts.placeholdit.text = opts.text ;

        if (opts.textsize)
           opts.placeholdit.textsize = Number(opts.textsize) ;

        if (opts.format)
           opts.placeholdit.text = opts.format ;

    })
});
