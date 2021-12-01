import React from 'react';
import './../../css/panel.css'
import './../../css/verticalActionBar.css'
import {Modal} from "react-bootstrap";
import Spinner from "../Spinner";
import Error from "../Error";

/*Form*/
import UserForm from "../forms/components/UserForm";
import ReportForm from "../forms/components/ReportForm";
import EventForm from "../forms/components/EventForm";
import ReportTypeForm from "../forms/components/ReportTypeForm";

/*Validators*/
import ReportFormValidator from "../forms/validators/ReportFormValidator";
import UserFormValidator from "../forms/validators/UserFormValidator";
import EventFormValidator from "../forms/validators/EventFormValidator";
import ReportTypeFormValidator from "../forms/validators/ReportTypeFormValidator";
import axios from "axios";

class BackOfficeModal extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            submitted: false,
            modalIsVisible : props.modalIsVisible,
            error: this.props.error ?? undefined,
            formErrors: {},
            modalData: this.props.modalData
        }

        this.isAnUpdate = false;
    }

    componentDidUpdate(previousProps, previousState, snapshot){
        if(previousProps.modalIsVisible !== this.props.modalIsVisible){
            this.setState({
                modalIsVisible: this.props.modalIsVisible,
            });
        }

        if(previousProps.data !== this.props.data){
            this.setState({modalData: {...this.props.data}})
            this.isAnUpdate = this.props.data !== undefined && Object.keys(this.props.data).length > 0;
        }

        if(previousProps.error !== this.props.error){
            this.setState({error: this.props.error})
        }
    }

    onInputChange(name, value){
        const modalData = {...this.state.modalData};

        modalData[name] = value;

        this.setState({modalData: modalData});
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
        const {object, errors, isValid} = validator({...this.state.modalData}, this.isAnUpdate);

        if(isValid){
            this.setState({submitted: true, modalData: object, formErrors: {}});
            this.props.onSave(event, object, this.isAnUpdate);
        }else{
            this.setState({formErrors: errors});
        }

        this.setState({submitted: false});
    }

    onHide(event) {
        this.setState({submitted: false, formErrors: {}, error: undefined, modalData: {}});
        this.props.onHide(event);
    }

    getForm(){
        if(this.props.apiRoute === "user"){
            return <UserForm data={this.state.modalData} errors={this.state.formErrors} onInputChange={(name, value) => this.onInputChange(name, value)} isAnUpdate={this.isAnUpdate}/>
        }

        if(this.props.apiRoute === "report"){
            return <ReportForm data={this.state.modalData} errors={this.state.formErrors} onInputChange={(name, value) => this.onInputChange(name, value)} isAnUpdate={this.isAnUpdate}/>
        }

        if(this.props.apiRoute === "event"){
            return <EventForm data={this.state.modalData} errors={this.state.formErrors} onInputChange={(name, value) => this.onInputChange(name, value)} isAnUpdate={this.isAnUpdate}/>
        }

        if(this.props.apiRoute === "reportType"){
            return <ReportTypeForm data={this.state.modalData} errors={this.state.formErrors} onInputChange={(name, value) => this.onInputChange(name, value)} isAnUpdate={this.isAnUpdate}/>
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
                    {(this.state.submitted && this.state.error === undefined && Object.keys(this.state.formErrors).length === 0) && <Spinner text={""} />}

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

export default BackOfficeModal;