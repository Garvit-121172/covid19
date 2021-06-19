import React from 'react';
import { Line } from 'react-chartjs-2';
class MyChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x1: props.x1,
            y1: props.y1,
            y2: props.y2,
            y3: props.y3
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (state.y3 !== props.y3) {
            state.x1 = props.x1;
            state.y1 = props.y1;
            state.y2 = props.y2;
            state.y3 = props.y3;
        }
    }
    render() {
        const data = {
            labels: this.state.x1,
            datasets: [
                {
                    label: "TotalCases",
                    data: this.state.y1,
                    fill: true,
                    backgroundColor: "rgba(75,192,192,0.2)",
                    borderColor: "rgba(75,192,192,1)"
                },
                {
                    label: "Deaths",
                    data: this.state.y2,
                    fill: true,
                    backgroundColor: "rgba(75,192,192,0.2)",
                    borderColor: "rgba(75,192,192,1)"
                },
                {
                    label: "Recovered",
                    data: this.state.y3,
                    fill: false,
                    borderColor: "#742774"
                }
            ]
        }

        return (
            <div className="chart">
                <Line data={data} />
            </div>
        )
    }
}
export default MyChart;