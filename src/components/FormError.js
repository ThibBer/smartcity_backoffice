import React from "react";

class BackOfficeForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <small className="error"><i className="far fa-exclamation-triangle"/> {this.props.content}</small>
        );
    }
}

export default BackOfficeForm;