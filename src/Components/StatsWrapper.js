import React from "react";
import StatsCard from "./StatsCard";
class StatsWrapper extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="statswrapper">
                <StatsCard todayCases={this.props.todayCases} heading="Cases" />
                <StatsCard todayCases={this.props.todayDeaths} heading="Deaths" />
                <StatsCard todayCases={this.props.todayRecovered} heading="Recovered" />
            </div>
        )
    }
}
export default StatsWrapper;