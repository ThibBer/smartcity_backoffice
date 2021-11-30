import React from "react";

class BackOfficeForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: this.props.errors
        }
    }

    componentDidUpdate(previousProps, previousState, snapshot){
        if(previousProps.errors !== this.props.errors){
            this.setState({errors: this.props.errors});
        }
    }

    render(){
        return(
            this.props.form.getForm(this.props.data, this.state.errors, this.props.onInputChange, this.props.auxiliaryData, this.props.isAnUpdate)
        );
    }
}

export default BackOfficeForm;