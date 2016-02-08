riot.tag2('rg-chart', '<canvas></canvas>', 'rg-chart,[riot-tag="rg-chart"] { display: inline-block; width: 100%; }', '', function(opts) {
var _this = this;

Chart.defaults.global.responsive = true;

this.on('mount', function () {
  drawChart();
});

this.on('loaded', function (chart) {
  _this.on('unmount', function () {
    chart.destroy();
  });
});

var drawChart = function drawChart() {
  if (!opts.chart) opts.chart = {};

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
};
});
