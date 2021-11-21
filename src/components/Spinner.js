import React from 'react';
import "./../css/spinner.css";

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
                <p>{this.props.text ?? "Chargement des données en cours"}</p>
            </div>
        );
    }
}

export default Spinner;