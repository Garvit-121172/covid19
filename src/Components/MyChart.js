import React from 'react';
import { Line } from 'react-chartjs-2';
class MyChart extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.caseYval);
    }
    data = {
        labels: this.props.caseXval,
        datasets: [
            {
                label: "TotalCases",
                data: this.props.caseYval,
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            },
            {
                label: "Deaths",
                data: [3, 5, 8, 4, 4, 6],
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            },
            {
                label: "Recovered",
                data: [33, 25, 35, 51, 54, 76],
                fill: false,
                borderColor: "#742774"
            }
        ]
    }
    render() {
        return (
            <div className="chart">
                <Line data={this.data} />
            </div>
        )
    }
}
export default MyChart;