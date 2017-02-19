riot.tag("rg-modal",
          '<div class="c-overlay {c-overlay--dismissable: opts.modal.dismissable}"  if="{opts.modal.isvisible}" onclick="{close}">' +
          '<div class="c-overlay">' +
          '<div class="o-modal {o-modal--ghost: opts.modal.ghost} {o-modal--full: opts.modal.full}" if="{opts.modal.isvisible}">' +
          '<div class="c-card">' +
          '<header class="c-card__header">' +
          '<button if="{opts.modal.dismissable}" type="button" class="c-button c-button--close" onclick="{close}">&times;</button>' +
          '<h2 class="c-heading">{opts.modal.heading}</h2>' +
          '</header>' +
          '<div class="c-card__body o-panel">' +
          '<yield></yield>' +
          '</div>' +
          '<footer class="c-card__footer" {\'c-card__footer--block\': !opts.modal.ghost}">' +
          '<div class="c-input-group">'+
          '<button each="{opts.modal.buttons}" type="button" class="c-button {c-button--block: blockbuttons} {\'c-button--\' + type}" onclick="{action}" riot-style="{style}"> {text} </button>'+
          '</div>'+
          '</footer>' +
          '</div>' +
          '</div>',
         'rg-modal .o-modal--ghost .o-modal__footer .c-button,[riot-tag="rg-modal"] .o-modal--ghost .c-card__footer .c-button,[data-is="rg-modal"] .o-modal--ghost .c-card__footer .c-button{ margin: 0 .5em 0 0; }', "", function(opts) {

    var _this = this;

    this.on("before-mount", function() {

        if (!opts.modal)
          opts.modal = {
                  /*
                  isvisible: ((typeof opts.visible == "undefined") ? Boolean(opts.visible) : true),
                  dismissable: ((typeof opts.dismissable == "undefined") ? Boolean(opts.dismissable) : true),
                  full: ((typeof opts.fullscreen == "undefined") ? Boolean(opts.fullscreen) : false),
                  ghost: ((typeof opts.ghost == "undefined") ? Boolean(opts.ghost) : false),
                  */
                  isvisible: true,
                  dismissable: true,
                  full: false,
                  ghost: false,
                  heading: (opts.heading ? opts.heading : 'Note'),
                  buttons: [{
                      text: 'Close',
                      type: 'brand',
                      action: function() { this.close() }
                    }],
                    blockbuttons: true
                  }
    });

    this.close = function() {
        if (opts.modal.dismissable) {
            opts.modal.isvisible = false;
            _this.trigger("close") ;
        }
    }
});
