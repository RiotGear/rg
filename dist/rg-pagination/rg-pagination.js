riot.tag2('rg-pagination', '<div class="c-pagination"> <div class="c-pagination__controls c-pagination__controls--backward"> <button class="c-pagination__control" __disabled="{opts.pagination.page <= 1}" onclick="{first}">«</button> <button class="c-pagination__control" __disabled="{opts.pagination.page <= 1}" onclick="{back}">‹</button> </div> <div class="c-pagination__controls"> <span class="c-pagination__ellipsis" if="{opts.pagination.page > 2}">&hellip;</span> <button class="c-pagination__page" onclick="{back}" if="{opts.pagination.page > 1}">{opts.pagination.page - 1}</button> <button class="c-pagination__page c-pagination__page--current">{opts.pagination.page}</button> <button class="c-pagination__page" onclick="{forward}" if="{opts.pagination.page < opts.pagination.pages}">{opts.pagination.page + 1}</button> <span class="c-pagination__ellipsis" if="{opts.pagination.page < opts.pagination.pages - 1}">&hellip;</span> </div> <div class="c-pagination__controls c-pagination__controls--forward"> <button class="c-pagination__control" __disabled="{opts.pagination.page >= opts.pagination.pages}" onclick="{forward}">›</button> <button class="c-pagination__control" __disabled="{opts.pagination.page >= opts.pagination.pages}" onclick="{last}">»</button> </div> </div>', '', '', function(opts) {
var _this = this;

this.on('update', function () {
  if (!opts.pagination) opts.pagination = {
    pages: 1,
    page: 1
  };
});

this.on('page', function () {
  var btns = _this.root.querySelectorAll('button');
  for (var i = 0; i < btns.length; i++) {
    btns[i].blur();
  }
});

this.forward = function () {
  opts.pagination.page++;
  _this.trigger('page', opts.pagination.page);
};

this.back = function () {
  opts.pagination.page--;
  _this.trigger('page', opts.pagination.page);
};

this.first = function () {
  opts.pagination.page = 1;
  _this.trigger('page', opts.pagination.page);
};

this.last = function () {
  opts.pagination.page = opts.pagination.pages;
  _this.trigger('page', opts.pagination.page);
};
});
