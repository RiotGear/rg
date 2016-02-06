<rg-chart>

  <canvas width="{ opts.chart.width }" height="{ opts.chart.height }"></canvas>

  <script>
    this.on('update', () => {
      if (!opts.chart) return
      if (!opts.chart.height) opts.chart.height = 400
      if (!opts.chart.width) opts.chart.width = 400
    })

    this.on('mount', () => {
      if (!opts.chart) {
        opts.chart = {
          type: 'bar',
          data: {},
          options: {},
          width: 400,
          height: 400
        }
      }
      if (!opts.chart.height) opts.chart.height = 400
      if (!opts.chart.width) opts.chart.width = 400

      let ctx = this.root.querySelector('canvas').getContext('2d')
      let chart = new Chart(ctx)
      switch (opts.chart.type) {
        case 'line':
          chart.Line(opts.chart.data, opts.chart.options)
          break;
        case 'radar':
          chart.Radar(opts.chart.data, opts.chart.options)
          break;
        case 'polar':
          chart.PolarArea(opts.chart.data, opts.chart.options)
          break;
        case 'pie':
          chart.Pie(opts.chart.data, opts.chart.options)
          break;
        case 'doughnut':
          chart.Doughnut(opts.chart.data, opts.chart.options)
          break;
        default:
          chart.Bar(opts.chart.data, opts.chart.options)
          break;
      }
      this.trigger('loaded', chart)
    })

  </script>

</rg-chart>
