<rg-chart>

  <canvas></canvas>

  <script>
    Chart.defaults.global.responsive = true

    this.on('mount', () => {
      drawChart()
    })

    this.on('loaded', chart => {
      this.on('unmount', () => {
        chart.destroy()
      })
    })

    const drawChart = () => {
      if (!opts.chart) opts.chart = {}

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
    }

  </script>

  <style scoped>
    :scope {
      display: inline-block;
      width: 100%;
    }

  </style>

</rg-chart>
