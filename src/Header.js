import React from 'react';
import ReactDom from 'react-dom';
class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="header">
                <input placeholder={this.props.placeholder} onChange={this.props.onchange} />
            </div>
        )
    }
}
export default Header;