import React from 'react';
import ReactDom from 'react-dom';
class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="header">
                <h2>Header</h2>
            </div>
        )
    }
}
export default Header;