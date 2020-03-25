import React, {Component} from 'react';
import Chart from 'react-apexcharts'

class BarChart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            options: {
                plotOptions: {
                    bar: {
                        distributed: true
                    }
                },
                xaxis: {
                    categories: props.labels,
                    labels: {
                        show: false,
                    },
                    tooltip: {
                        enabled: false
                    }
                },
                yaxis: {
                    labels: {
                        formatter: function (val) {
                            return val + '%';
                        }
                    }
                },
                title: {
                    text: 'Found labels based on probability',
                    align: 'center'
                },
                dataLabels: {
                    enabled: true,
                    formatter: function (val) {
                        return val + '%';
                    }
                },
            },
            series: [{
                name: 'Google Vision API',
                data: props.values
            }],
        }
    }

    render() {
        return (
            <Chart options={this.state.options} series={this.state.series} type="bar"/>
        );
    }
}

export default BarChart;