import React from "react";
class SelectTime extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="selecttime">
                <select onChange={this.props.onchange}>
                    <option value="7" >Last 7 Days</option>
                    <option value="15" >Last 15 Days</option>
                    <option value="30" >Last 30 Days</option>
                    <option value="60" >Last 60 Days</option>
                </select>
            </div>
        )
    }
}
export default SelectTime;