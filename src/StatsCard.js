import React from "react";
class StatsCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="statscard">
                <h2>{this.props.heading}</h2>
                <p>{this.props.cases}</p>
            </div>
        )
    }

}
export default StatsCard;