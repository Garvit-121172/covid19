import React from "react";
// import ReactDom from "react-dom";
class Select extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="select">
                <select onChange={this.props.onchange}>
                    <option value="worldwide">Global</option>
                    {this.props.list.map((country) => (
                        <option value={country.countryInfo.iso2} >{country.country}</option>
                    ))}
                </select>
            </div>
        )
    }
}
export default Select;