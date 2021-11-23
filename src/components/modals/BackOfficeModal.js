import React from 'react';
import './../../css/panel.css'
import './../../css/verticalActionBar.css'
import {Modal} from "react-bootstrap";
import BackOfficeForm from "../forms/BackOfficeForm";
import Spinner from "../Spinner";
import Error from "../Error";

class BackOfficeModal extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            submitted: false,
            modalIsVisible : props.modalIsVisible,
            error: this.props.error ?? undefined,
            formErrors: {},
            modalData: {}
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

    onInputChange(event, name){
        const modalData = this.state.modalData

        modalData[name] = event.target.value;

        this.setState({modalData: modalData});
    }

    onClickSubmit(event) {
        const {object, errors, isValid} = this.props.form.validation(this.state.modalData);

        if(isValid){
            this.setState({submitted: true, modalData: {...object}, formErrors: {}});
            this.props.onSave(event, object, this.isAnUpdate);
        }else{
            this.setState({formErrors: errors});
        }
    }

    onHide(event) {
        this.setState({submitted: false, formErrors: {}, error: undefined, modalData: {}});
        this.props.onHide(event);
    }

    render() {
        return (
            <Modal show={this.state.modalIsVisible} onHide={(event) => this.onHide(event)} backdrop="static" keyboard={false} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{this.isAnUpdate ? "Modification" : "Création"} d'un {this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <BackOfficeForm data={this.state.modalData} form={this.props.form} onInputChange={(event, name) => this.onInputChange(event, name)} errors={this.state.formErrors} auxiliaryData={this.props.auxiliaryData}/>
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