import React from 'react';
import './../../css/panel.css'
import './../../css/verticalActionBar.css'
import {Modal} from "react-bootstrap";

class BackOfficeModal extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            modalIsVisible : props.modalIsVisible,
            error: undefined
        }

        this.modalData = []
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

    render() {
        return (
            <Modal show={this.state.modalIsVisible} onHide={this.props.onHide} backdrop="static" keyboard={false} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{this.isAnUpdate ? "Modification" : "Création"} {this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.form(this.modalData, (event, name) => this.onInputChange(event, name))}
                    {this.state.error && <><i className="far fa-info-circle"/>&nbsp;<small>{this.state.error}</small></>}
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-success" onClick={(event) => this.props.onHide(event)}>Fermer</button>
                    <button className="btn btn-smartcity" onClick={(event) => this.props.onSave(event, this.data, this.isAnUpdate)}>Valider</button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default BackOfficeModal;