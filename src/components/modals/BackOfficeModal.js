import React from 'react';
import './../../css/panel.css'
import './../../css/verticalActionBar.css'
import {Modal} from "react-bootstrap";
import Spinner from "../Spinner";
import Error from "../Error";

/*Form*/
import UserForm from "../forms/UserForm";
import ReportForm from "../forms/ReportForm";
import EventForm from "../forms/EventForm";
import ReportTypeForm from "../forms/ReportTypeForm";

/*Validators*/
import ReportFormValidator from "../forms/validators/ReportFormValidator";
import UserFormValidator from "../forms/validators/UserFormValidator";
import EventFormValidator from "../forms/validators/EventFormValidator";
import ReportTypeFormValidator from "../forms/validators/ReportTypeFormValidator";
import Comparator from "../../utils/Comparator";
import PropTypes from "prop-types";

class BackOfficeModal extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            submitted: false,
            modalIsVisible : props.modalIsVisible,
            error: this.props.error ?? undefined,
            formErrors: {},
            data: this.props.data
        }

        this.isAnUpdate = false;
    }

    componentDidUpdate(previousProps, previousState, snapshot){
        if(previousProps.modalIsVisible !== this.props.modalIsVisible){
            this.setState({
                modalIsVisible: this.props.modalIsVisible,
            });
        }

        if(!Comparator.objectsAreEquals(previousProps.data, this.props.data)){
            this.setState({data: {...this.props.data}})
            this.isAnUpdate = this.props.data !== undefined && Object.keys(this.props.data).length > 0;
        }

        if(previousProps.error !== this.props.error){
            this.setState({error: this.props.error})
        }
    }

    onInputChange(name, value){
        const data = {...this.state.data};

        data[name] = value;

        this.setState({data: data});
    }

    getValidator(){
        if(this.props.apiRoute === "user"){
            return UserFormValidator
        }

        if(this.props.apiRoute === "report"){
            return ReportFormValidator
        }

        if(this.props.apiRoute === "event"){
            return EventFormValidator
        }

        if(this.props.apiRoute === "reportType"){
            return ReportTypeFormValidator
        }
    }

    onClickSubmit(event) {
        const validator = this.getValidator();
        const {object, errors, isValid} = validator({...this.state.data}, this.isAnUpdate);

        if(isValid){
            this.setState({submitted: true, data: object, formErrors: {}});
            this.props.onSave(event, object, this.isAnUpdate);
        }else{
            this.setState({formErrors: errors});
        }

        this.setState({submitted: false});
    }

    onHide(event) {
        this.setState({submitted: false, formErrors: {}, error: undefined, data: {}});
        this.props.onHide(event);
    }

    getForm(){
        if(this.props.apiRoute === "user"){
            return <UserForm data={this.state.data} errors={this.state.formErrors} onInputChange={(name, value) => this.onInputChange(name, value)} isAnUpdate={this.isAnUpdate}/>
        }

        if(this.props.apiRoute === "report"){
            return <ReportForm data={this.state.data} errors={this.state.formErrors} onInputChange={(name, value) => this.onInputChange(name, value)} isAnUpdate={this.isAnUpdate}/>
        }

        if(this.props.apiRoute === "event"){
            return <EventForm data={this.state.data} errors={this.state.formErrors} onInputChange={(name, value) => this.onInputChange(name, value)} isAnUpdate={this.isAnUpdate}/>
        }

        if(this.props.apiRoute === "reportType"){
            return <ReportTypeForm data={this.state.data} errors={this.state.formErrors} onInputChange={(name, value) => this.onInputChange(name, value)} isAnUpdate={this.isAnUpdate}/>
        }
    }

    render() {
        return (
            <Modal show={this.state.modalIsVisible} onHide={(event) => this.onHide(event)} backdrop="static" keyboard={false} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{this.isAnUpdate ? "Modification" : "Création"} d'un {this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.getForm()}
                    {(this.state.submitted && this.state.error === undefined && Object.keys(this.state.formErrors).length === 0) && <Spinner />}

                    {this.state.error && <Error content={this.state.error} icon={"fa-info-circle"}/>}
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-success" onClick={(event) => this.onHide(event)}>Fermer</button>
                    <button className="btn btn-smartcity" onClick={(event) => this.onClickSubmit(event)}>Valider</button>
                </Modal.Footer>
            </Modal>
        );
    }
}

BackOfficeModal.propTypes = {
    modalIsVisible: PropTypes.bool,
    error: PropTypes.string,
    data: PropTypes.object,
    apiRoute: PropTypes.string,
    onSave: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
    title: PropTypes.string,
}

export default BackOfficeModal;