import React from "react";

class BackOfficeForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.data,
            errors: this.props.errors
        }
    }

    componentDidUpdate(previousProps, previousState, snapshot){
        if(previousProps.errors !== this.props.errors){
            this.setState({errors: this.props.errors});
        }
    }

    formattedDate(sqlDate){
        if(sqlDate === undefined){
            return sqlDate;
        }

        const date = new Date(sqlDate);
        return date.getFullYear()  + '-' + this.state.twoDigitFormatNumber(date.getMonth() + 1) + '-' + this.state.twoDigitFormatNumber(date.getDate());
    }

    twoDigitFormatNumber(number){
        if(number <= 9){
            return "0" + number;
        }

        return number;
    }

    render(){
        return(
            this.props.form.getForm(this.state.data, this.state.errors, this.props.onInputChange)
        );
    }
}

export default BackOfficeForm;