riot.tag("rg-alert", '<div class="c-alert if={opts.type} {\'c-alert--\' + opts.type}"><button class="c-button c-button--close" hide={opts.dismissable==false} onclick="{dismiss}">&times;</button>{opts.text}</div>', "", "", function(opts) {
    var _this = this;

    if (typeof opts.dismissable == "string") {
        opts.dismissable = Boolean(opts.dismissable);
    }

    if (typeof this.opts.dismissable != "boolean") {
        this.opts.dismissable = true;
    }

    if (typeof opts.timeout == "string")
        opts.timeout = Number(opts.timeout);

    if (typeof opts.timeout == "number" && opts.timeout > 0) {
        this.startTimer = function() {
            this.timer = setTimeout(function() {
                _this.dismiss();
            }, opts.timeout)
        };
        this.startTimer()
    }


    this.dismiss = function(e) {
        if (this.opts.timeout)
            clearTimeout(this.startTimer);

        this.unmount();
    } // onSelect
});

// Multiple Alets
riot.tag("rg-alerts", '<div each="{opts.alerts}"><rg-alert text="{text}" type="{type}" dismissable={dismissable} timeout={timeout}></rg-alert> </div>', "", "", function() {});
