riot.tag("rg-toggle",
   '<div class="c-toggle {\'c-toggle--\' + opts.toggle.type}">'+
   '   <label class="c-toggle__wrapper">'+
   '        <input type="checkbox" checked="{opts.toggle.checked}" onclick="{toggle}">'+
   '        <div class="c-toggle__track">'+
   '          <div class="c-toggle__handle"></div>'+
   '        </div>'+
   '   </label>'+
   '   {opts.toggle.text}'+
   '</div>', ".c-toggle{padding-top: 0.5vh;}", "",
   function(opts) {
    var _this = this;

    if (!opts.toggle) {
        opts.toggle = {
          type: "default"
        }
    }

    if (opts.text)
       opts.toggle.text = opts.text ;

    if (opts.type)
       opts.toggle.type = opts.type ;

       if (opts.checked)
          if (typeof opts.checked === "string")
             if (opts.checked.toLowerCase() === "true" || opts.checked.toLowerCase() === "false")
                if (opts.checked.toLowerCase() ==="true")
                   opts.toggle.checked = true ;
                else
                   opts.toggle.checked = false ;



    this.on("mount", function() {
        if (!opts.toggle) opts.toggle = {
            checked: false
        }
    });

    this.toggle = function() {
        opts.toggle.checked = !opts.toggle.checked;
        _this.trigger("toggle", opts.toggle.checked)
    }
});
