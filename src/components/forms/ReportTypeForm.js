import React from "react";
import Error from "../Error";
import Comparator from "../../utils/Comparator";
import PropTypes from "prop-types";

class ReportTypeForm extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            errors: this.props.errors,
            reportType: {...this.props.data},
            imageSrc : this.props.data.image
        }
    }

    async componentDidUpdate(previousProps, previousState, snapshot){
        if(!Comparator.objectsAreEquals(previousProps.errors, this.props.errors)){
            this.setState({errors: this.props.errors});
        }
    }

    onInputChange(event, name){
        const report = {...this.state.report};
        const value = name === "image" ? event.target.files[0] : event.target.value;

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
                <div className="row">
                    <div className="col">
                        <div className="form-group mb-3">
                            <label htmlFor="image">Image</label>
                            {console.log(this.state.imageSrc)}
                            <input id="image" type="file" accept="image/*" className="form-control" placeholder="Image du signalement" onChange={(event) => this.onInputChange(event, "image")}/>
                            {(this.props.isAnUpdate && this.state.reportType?.image) &&
                                <>
                                    <p className="mt-5">Ancienne image</p>
                                    <img className="img-fluid" src={`${process.env.REACT_APP_API_URL}reportTypes/${this.state.imageSrc}`} alt="Icone non trouvée"/>
                                </>
                            }
                            {this.state.errors?.image && <Error content={this.state.errors.image}/>}
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

ReportTypeForm.propTypes = {
    onInputChange: PropTypes.func.isRequired,
    errors: PropTypes.object,
    data: PropTypes.object,
    isAnUpdate: PropTypes.bool,
}

export default ReportTypeForm;