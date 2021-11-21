import React from "react";

class Error extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            content: this.props.content ?? ""
        }
    }

    componentDidUpdate(previousProps, previousState, snapshot){
        if(previousProps.content !== this.props.content){
            this.setState({content: this.props.content})
        }
    }

    render(){
        return(
            <small className="error"><i className={"far " +( this.props.icon ?? "fa-exclamation-triangle")}/> {this.props.content}</small>
        );
    }
}

export default Error;