riot.tag("rg-tabs",
    '<div class="c-tabs {\'c-tabs--\' + opts.tabs.type}">'+
    '   <div class="c-tabs__headings"> '+
    '     <div each="{opts.tabs.tabs}" class="c-tab-heading {\'c-tab-heading--active\': active, \'c-tab-heading--disabled\': disabled}"'+
                   ' onclick="{parent.open}"> {heading}'+
    '     </div>'+
    '   </div>'+
    '   <div each="{opts.tabs.tabs}" class="c-tabs__tab {\'c-tabs__tab--active\': active}">'+
    '     <div if="{text}"> {text} </div> <div if="{include}"> {include.responseText}'+
    '     </div>'+
    '   </div>'+
    '</div>', "", "",
    function(opts) {
    var _this = this;

    var fetch = function fetch(tab) {
        var req = new XMLHttpRequest;
        req.onload = function(resp) {
            var activeTab = _this.root.querySelector(".c-tabs__tab--active");
            if (activeTab) activeTab.innerHTML = req.responseText;
            _this.trigger("loaded", tab)
        };
        req.open("get", tab.include, true);
        req.send();
        _this.trigger("loading", tab)
    };
