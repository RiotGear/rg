riot.tag2('rg-chart', '<canvas width="{opts.chart.width}" height="{opts.chart.height}"></canvas>', '', '', function(opts) {
var _this = this;

this.on('update', function () {
  if (!opts.chart) return;
  if (!opts.chart.height) opts.chart.height = 400;
  if (!opts.chart.width) opts.chart.width = 400;
});

this.on('mount', function () {
  if (!opts.chart) {
    opts.chart = {
      type: 'bar',
      data: {},
      options: {},
      width: 400,
      height: 400
    };
  }
  if (!opts.chart.height) opts.chart.height = 400;
  if (!opts.chart.width) opts.chart.width = 400;

  var ctx = _this.root.querySelector('canvas').getContext('2d');
  var chart = new Chart(ctx);
  switch (opts.chart.type) {
    case 'line':
      chart.Line(opts.chart.data, opts.chart.options);
      break;
    case 'radar':
      chart.Radar(opts.chart.data, opts.chart.options);
      break;
    case 'polar':
      chart.PolarArea(opts.chart.data, opts.chart.options);
      break;
    case 'pie':
      chart.Pie(opts.chart.data, opts.chart.options);
      break;
    case 'doughnut':
      chart.Doughnut(opts.chart.data, opts.chart.options);
      break;
    default:
      chart.Bar(opts.chart.data, opts.chart.options);
      break;
  }
  _this.trigger('loaded', chart);
});
}, '{ }');
