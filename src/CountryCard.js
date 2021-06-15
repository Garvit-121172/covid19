import React from "react";
import ReactDom from "react-dom";
class CountryCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="country_card">
                <img src={this.props.flag} alt={this.props.name} />
                <h2>{this.props.name}</h2>
                <div className="card_flex">
                    <p>New Cases:{this.props.newcases}</p>
                    <p>New Recoveries:{this.props.newrecovery}</p>
                    <p>New Deaths:{this.props.newdeaths}</p>
                    <p> Cases:{this.props.totcases}</p>
                    <p> Recovered:{this.props.totrecovery}</p>
                    <p> Deaths:{this.props.totdeaths}</p>
                </div>
            </div>
        )
    }
}
export default CountryCard;