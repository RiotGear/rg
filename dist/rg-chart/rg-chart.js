riot.tag2('rg-chart', '<canvas></canvas>', 'rg-chart,[riot-tag="rg-chart"] { display: inline-block; width: 100%; }', '', function(opts) {
var _this = this;

Chart.defaults.global.responsive = true;

this.on('mount', function () {
  drawChart();
});

this.on('loaded', function (instance) {
  _this.on('unmount', function () {
    instance.destroy();
  });
});

var drawChart = function drawChart() {
  if (!opts.chart) opts.chart = {};

  var ctx = _this.root.querySelector('canvas').getContext('2d');
  var chart = new Chart(ctx);
  var instance = null;
  switch (opts.chart.type) {
    case 'line':
      instance = chart.Line(opts.chart.data, opts.chart.options);
      break;
    case 'radar':
      instance = chart.Radar(opts.chart.data, opts.chart.options);
      break;
    case 'polar':
      instance = chart.PolarArea(opts.chart.data, opts.chart.options);
      break;
    case 'pie':
      instance = chart.Pie(opts.chart.data, opts.chart.options);
      break;
    case 'doughnut':
      instance = chart.Doughnut(opts.chart.data, opts.chart.options);
      break;
    default:
      instance = chart.Bar(opts.chart.data, opts.chart.options);
      break;
  }
  _this.trigger('loaded', instance);
};
});
