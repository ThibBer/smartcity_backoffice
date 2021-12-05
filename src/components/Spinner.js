import React from 'react';
import "./../css/spinner.css";
const PropTypes = require('prop-types');

class Spinner extends React.Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <div className="text-center">
                <div className="smartcity-spinner">
                    <div className="ring"/>
                    <div className="ring"/>
                    <div className="ring"/>
                    <div className="ring"/>
                    <div className="ring"/>
                </div>
                <p>{this.props.text ?? ""}</p>
            </div>
        );
    }
}

Spinner.propTypes = {
    text: PropTypes.string
}

export default Spinner;