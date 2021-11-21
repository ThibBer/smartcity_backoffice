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
            error: undefined,
            formErrors: {}
        }

        this.modalData = {}
        this.isAnUpdate = false;
    }

    componentDidUpdate(previousProps, previousState, snapshot){
        if(previousProps.modalIsVisible !== this.props.modalIsVisible){
            this.setState({
                modalIsVisible: this.props.modalIsVisible
            });
        }

        if(previousProps.data !== this.props.data){
            this.modalData = {...this.props.data};
            this.isAnUpdate = Object.keys(this.modalData).length !== 0;
        }

        if(previousProps.error !== this.props.error){
            this.setState({error: this.props.error})
        }
    }

    onInputChange(event, name){
        this.modalData[name] = event.target.value;
    }

    onClickSubmit(event) {
        this.setState({submitted: true, formErrors: {}, error: undefined});
        const formErrors = {};

        if (this.props.form.isValid(this.modalData, formErrors)) {
            this.props.onSave(event, this.modalData, this.isAnUpdate);
        }

        this.setState({formErrors});
    }

    onHide(event) {
        this.setState({submitted: false, formErrors: {}, error: undefined});
        this.props.onHide(event);
        this.modalData = {};
    }

    render() {
        return (
            <Modal show={this.state.modalIsVisible} onHide={(event) => this.onHide(event)} backdrop="static" keyboard={false} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{this.isAnUpdate ? "Modification" : "Création"} d'un {this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <BackOfficeForm data={this.modalData} form={this.props.form} onInputChange={(event, name) => this.onInputChange(event, name)} errors={this.state.formErrors}/>
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