riot.tag("rg-drawer",
    '<div class="c-overlay c-overlay--dismissable" if="{opts.isvisible}" onclick="{close}"></div>' +
    ' <div class="o-drawer u-highest {\'o-drawer--\' + opts.position || \'c-drawer--top\'} {\'o-drawer--visible\': opts.isvisible}">' +
    ' <div class="c-card">' +
    ' <header class="c-card__header">' +
    '<h2 class="c-heading c-heading--xsmall">{opts.header}' +
    '<div class="c-heading__sub">{opts.subheading}</div>' +
    '</h2>' +
    '</header>' +
    ' <ul class="c-card--menu"> <li class="c-card__item {\'c-card__item--active\': active}" each="{opts.items}" onclick="{parent.select}"> {text} </li> </ul>' +
    ' <div class="c-card__body"> <yield></yield> </div>' +
    '</div>' +
    '<div class="c-card__footer">' +
    '<div class="c-input-group"> <button class="c-button c-button--block" each="{opts.footer.items}" onclick="{parent.select}"> {text} </button>' +
    ' </div></div></div>', "", "",
    function(opts) {
        var _this = this;

        this.on ("before-mount", function(){
          if (!opts.footer){
            footer: []
            }
        })

        this.close = function() {
            opts.isvisible = false ;
            _this.trigger('close');
        };

        this.select = function(e) {
            opts.items.forEach(function(item) {
                return item.active = false
            });
            e.item.active = true;
            _this.trigger("select", e.item)
        }
    });
