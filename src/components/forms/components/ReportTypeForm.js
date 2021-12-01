import React from "react";
import Error from "../../Error";

class ReportTypeForm extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            errors: this.props.errors,
            reportType: {...this.props.data},
        }
    }

    async componentDidUpdate(previousProps, previousState, snapshot){
        if(previousProps.errors !== this.props.errors){
            this.setState({errors: this.props.errors});
        }
    }

    onInputChange(event, name){
        const report = {...this.state.report};
        const value = event.target.value;

        report[name] = value;

        this.props.onInputChange(name, value);
        this.setState({report});
    }

    render(){
        return(
            <form>
                <div className="row">
                    <div className="col">
                        <div className="form-group mb-3">
                            <label htmlFor="label">Libellé</label>
                            <input id="label" type="text" className="form-control" placeholder="Libellé" defaultValue={this.state.reportType?.label} onChange={(event) => this.onInputChange(event, "label")}/>
                            {this.state.errors?.label && <Error content={this.state.errors.label}/>}
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default ReportTypeForm;