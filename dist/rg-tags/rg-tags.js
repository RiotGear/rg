riot.tag("rg-tags",
     '<div class="c-tags">'+
     '  <span class="c-tags__container">'+
     '    <button each="{opts.tags.tags}" onclick="{removeTag}" type="c-button" class="c-button c-button--{type} c-tag"> {text} '+
     '      <span class="c-tag__close">×</span>'+
     '   </button>'+
     '  </span>'+
     '  <div class="c-tags__field-container">'+
     '     <input type="{opts.tags.filter ? \'search\' : \'text\'}" ref="selectfield" class="c-field" '+
     '                placeholder="{opts.tags.placeholder}" onkeydown="{navigate}" oninput="{filterOptions}" onfocus="{open}"'+
     '                __readonly="{!opts.tags.filter}">'+
     '                 <ul class="c-card c-card--menu u-higher" if="{opts.tags.isvisible}">'+
     '                    <li each="{options}" no-reorder onclick="{parent.select}" class="c-card__item '+
     '                          {\'c-card__item--active\': selected, \'c-card__item--disabled\': disabled, \'c-menu__item--hover\': active}"> {text}'+
     '                    </li>'+
     '                 </ul>'+
     '  </div>'+
     '</div>',
     'rg-tags .c-card--menu,[riot-tag="rg-tags"] .c-card--menu,[data-is="rg-tags"] .c-card--menu{ position: relative; }', "",
    function(opts) {
    var _this = this;

    if (!opts.tags) opts.tags = {
        options: [],
        tags: []
        }
    else {
          if (!opts.tags.type)
            opts.tags.type = "default" ;
          } // else..if

    if (!opts.tags.options) opts.tags.options = [];
    if (!opts.tags.tags) opts.tags.tags = [];

    if (opts.type)
       opts.tags.type = opts.type ;

    if (opts.placeholder)
       opts.tags.placeholder = opts.placeholder ;

    if (opts.filter) {
        filter = toBoolean (opts.filter) ;

        if (filter)
           opts.tags.filter = "text";
        else
          opts.tags.filter = undefined ;
    }

    var defType = opts.tags.type ;

    for (i = 0 ; i < opts.tags.options.length ; i++) {
        if (!opts.tags.options[i].type)
           opts.tags.options[i].type = defType;
    }  // for

    for (i = 0 ; i < opts.tags.tags.length ; i++) {
        if (!opts.tags.tags[i].type)
           opts.tags.tags[i].type = defType;
    }  // for


    var handleClickOutside = function handleClickOutside(e) {
        if (!_this.root.contains(e.target)) _this.close();
        _this.update()
    };


    var applyFieldText = function applyFieldText() {
        _this.refs.selectfield.value = "";
        for (var i = 0; i < opts.tags.options.length; i++) {
            var item = opts.tags.options[i];
            item.selected = false
        }
    };

    this.filterOptions = function() {
        _this.options = opts.tags.options;
        if (opts.tags.filter) _this.options = _this.options.filter(function(option) {
            var attr = option[opts.tags.filter];
            return attr && attr.toLowerCase().indexOf(_this.refs.selectfield.value.toLowerCase()) > -1
        });
        _this.trigger("filter", _this.refs.selectfield.value)
    };


    function getWindowDimensions() {
        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName("body")[0],
            x = w.innerWidth || e.clientWidth || g.clientWidth,
            y = w.innerHeight || e.clientHeight || g.clientHeight;
        return {
            width: x,
            height: y
        }
    }

    var positionDropdown = function positionDropdown() {
        var w = getWindowDimensions();
        var m = _this.root.querySelector(".c-card--menu");
        if (!m) return;
        if (!opts.tags.isvisible) {
            m.style.marginTop = "";
            m.style.marginLeft = "";
            return
        }
        var pos = m.getBoundingClientRect();
        if (w.width < pos.left + pos.width) {
            m.style.marginLeft = w.width - (pos.left + pos.width) - 20 + "px"
        }
        if (pos.left < 0) {
            m.style.marginLeft = "20px"
        }
        if (w.height < pos.top + pos.height) {
            m.style.marginTop = w.height - (pos.top + pos.height) - 20 + "px"
        }
    };

    this.navigate = function(e) {
        if ([13, 38, 40].indexOf(e.keyCode) > -1 && !opts.tags.isvisible) {
            e.preventDefault();
            _this.open();
            return true
        }

        var length = _this.options.length;

        if (length > 0 && [13, 38, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
            var activeIndex = null;
            for (var i = 0; i < length; i++) {
                var item = _this.options[i];
                if (item.active) {
                    activeIndex = i;
                    break
                }
            }

            if (activeIndex != null) _this.options[activeIndex].active = false;

            if (e.keyCode == 38) {
                if (activeIndex == null || activeIndex == 0) _this.options[length - 1].active = true;
                else _this.options[activeIndex - 1].active = true
            } else if (e.keyCode == 40) {
                if (activeIndex == null || activeIndex == length - 1) _this.options[0].active = true;
                else _this.options[activeIndex + 1].active = true
            } else if (e.keyCode == 13 && activeIndex != null) {
                _this.select({
                    item: _this.options[activeIndex]
                })
            }
        }
        return true
    };
