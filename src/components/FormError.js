import React from "react";

class BackOfficeForm extends React.Component {
    render(){
        return(
            <small className="error"><i className="far fa-exclamation-triangle"/> {this.props.content}</small>
        );
    }
}

export default BackOfficeForm;