<rg-chart>

  <canvas></canvas>

  <script>
    Chart.defaults.global.responsive = true

    this.on('mount', () => {
      drawChart()
    })

    this.on('loaded', c => {
      this.on('unmount', () => {
        c.destroy()
      })
    })

    const drawChart = () => {
      if (!opts.chart) opts.chart = {}

      let ctx = this.root.querySelector('canvas').getContext('2d')
      let chart = new Chart(ctx)
      let c = null
      switch (opts.chart.type) {
        case 'line':
          c = chart.Line(opts.chart.data, opts.chart.options)
          break;
        case 'radar':
          c = chart.Radar(opts.chart.data, opts.chart.options)
          break;
        case 'polar':
          c = chart.PolarArea(opts.chart.data, opts.chart.options)
          break;
        case 'pie':
          c = chart.Pie(opts.chart.data, opts.chart.options)
          break;
        case 'doughnut':
          c = chart.Doughnut(opts.chart.data, opts.chart.options)
          break;
        default:
          c = chart.Bar(opts.chart.data, opts.chart.options)
          break;
      }
      this.trigger('loaded', c)
    }

  </script>

  <style scoped>
    :scope {
      display: inline-block;
      width: 100%;
    }

  </style>

</rg-chart>
