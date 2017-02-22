riot.tag("rg-pagination",
'<div class="c-pagination">'+
'     <div class="c-pagination__controls c-pagination__controls--backward">'+
'       <button class="c-pagination__control" disabled="{opts.pagination.page <= 1}" onclick="{first}">«</button>'+
'       <button class="c-pagination__control" disabled="{opts.pagination.page <= 1}" onclick="{back}">‹</button>'+
'     </div>'+
'     <div class="c-pagination__controls">'+
'       <span class="c-pagination__ellipsis" if="{opts.pagination.page > 2}">&hellip;</span>'+
'         <button class="c-pagination__page" onclick="{back}" if="{opts.pagination.page > 1}">{opts.pagination.page - 1}</button>'+
'         <button class="c-pagination__page c-pagination__page--current">{opts.pagination.page}</button>'+
'         <button class="c-pagination__page" onclick="{forward}" if="{opts.pagination.page < opts.pagination.pages}">{opts.pagination.page + 1}</button>'+
'         <span class="c-pagination__ellipsis" if="{opts.pagination.page < opts.pagination.pages - 1}">&hellip;'+
'        </span>'+
'       </div>'+
'     <div class="c-pagination__controls pagination__controls--forward">'+
'       <button class="c-pagination__control" disabled="{opts.pagination.page >= opts.pagination.pages}" onclick="{forward}">›</button>'+
'       <button class="c-pagination__control" disabled="{opts.pagination.page >= opts.pagination.pages}" onclick="{last}">»</button>'+
'     </div>'+
'</div>'
 , "", "",
 function(opts) {
    var _this = this;

    this.on("before-mount", function(){
      if (!opts.pagination){
          pagination = {
            pages: 10,
            page: 1
            }
         }
    if (opts.page)
       opts.pagination.page = Number(opts.page) ;

    if (opts.pages)
       opts.pagination.pages = Number(opts.pages) ;

    }) ;

    this.on("page", function() {
        var btns = _this.root.querySelectorAll("button");
        for (var i = 0; i < btns.length; i++) {
            btns[i].blur()
        }
    });

    this.forward = function() {
        opts.pagination.page++;
        _this.trigger("page", opts.pagination.page)
    };

    this.back = function() {
        opts.pagination.page--;
        _this.trigger("page", opts.pagination.page)
    };

    this.first = function() {
        opts.pagination.page = 1;
        _this.trigger("page", opts.pagination.page)
    };

    this.last = function() {
        opts.pagination.page = opts.pagination.pages;
        _this.trigger("page", opts.pagination.page)
    }
});
