window._charts = {
	linechart: {
		type: 'line',
		data: {
			labels: ["January", "February", "March", "April", "May", "June", "July"],
			datasets: [{
				label: "My First dataset",
				fillColor: "rgba(220,220,220,0.2)",
				strokeColor: "rgba(220,220,220,1)",
				pointColor: "rgba(220,220,220,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(220,220,220,1)",
				data: [65, 59, 80, 81, 56, 55, 40]
			}, {
				label: "My Second dataset",
				fillColor: "rgba(151,187,205,0.2)",
				strokeColor: "rgba(151,187,205,1)",
				pointColor: "rgba(151,187,205,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(151,187,205,1)",
				data: [28, 48, 40, 19, 86, 27, 90]
			}]
		}
	},

	barchart: {
		type: 'bar',
		data: {
			labels: ["January", "February", "March", "April", "May", "June", "July"],
			datasets: [{
				label: "My First dataset",
				fillColor: "rgba(220,220,220,0.5)",
				strokeColor: "rgba(220,220,220,0.8)",
				highlightFill: "rgba(220,220,220,0.75)",
				highlightStroke: "rgba(220,220,220,1)",
				data: [65, 59, 80, 81, 56, 55, 40]
			}, {
				label: "My Second dataset",
				fillColor: "rgba(151,187,205,0.5)",
				strokeColor: "rgba(151,187,205,0.8)",
				highlightFill: "rgba(151,187,205,0.75)",
				highlightStroke: "rgba(151,187,205,1)",
				data: [28, 48, 40, 19, 86, 27, 90]
			}]
		}
	},

	radarchart: {
		type: 'radar',
		data: {
			labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
			datasets: [{
				label: "My First dataset",
				fillColor: "rgba(220,220,220,0.2)",
				strokeColor: "rgba(220,220,220,1)",
				pointColor: "rgba(220,220,220,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(220,220,220,1)",
				data: [65, 59, 90, 81, 56, 55, 40]
			}, {
				label: "My Second dataset",
				fillColor: "rgba(151,187,205,0.2)",
				strokeColor: "rgba(151,187,205,1)",
				pointColor: "rgba(151,187,205,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(151,187,205,1)",
				data: [28, 48, 40, 19, 96, 27, 100]
			}]
		}
	},

	polarchart: {
		type: 'polar',
		data: [{
			value: 300,
			color: "#F7464A",
			highlight: "#FF5A5E",
			label: "Red"
		}, {
			value: 50,
			color: "#46BFBD",
			highlight: "#5AD3D1",
			label: "Green"
		}, {
			value: 100,
			color: "#FDB45C",
			highlight: "#FFC870",
			label: "Yellow"
		}, {
			value: 40,
			color: "#949FB1",
			highlight: "#A8B3C5",
			label: "Grey"
		}, {
			value: 120,
			color: "#4D5360",
			highlight: "#616774",
			label: "Dark Grey"
		}]
	},

	piechart: {
		type: 'pie',
		data: [{
			value: 300,
			color: "#F7464A",
			highlight: "#FF5A5E",
			label: "Red"
		}, {
			value: 50,
			color: "#46BFBD",
			highlight: "#5AD3D1",
			label: "Green"
		}, {
			value: 100,
			color: "#FDB45C",
			highlight: "#FFC870",
			label: "Yellow"
		}]
	},

	doughnutchart: {
		type: 'doughnut',
		data: [{
			value: 300,
			color: "#F7464A",
			highlight: "#FF5A5E",
			label: "Red"
		}, {
			value: 50,
			color: "#46BFBD",
			highlight: "#5AD3D1",
			label: "Green"
		}, {
			value: 100,
			color: "#FDB45C",
			highlight: "#FFC870",
			label: "Yellow"
		}]
	}
}