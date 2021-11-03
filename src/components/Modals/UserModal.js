import React from 'react';
import './../../css/panel.css'
import './../../css/verticalActionBar.css'
import {Modal} from "react-bootstrap";

class UserModal extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            modalIsVisible : props.modalIsVisible
        }
    }

    setModalVisibility(state){
        this.setState({modalIsVisible: state})
    }

    render() {
        return (
            <Modal size="lg" show={this.state.modalIsVisible} onHide={() => this.setModalVisibility(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-success" onClick={(event) => {
                        this.setModalVisibility(false);
                    }}>Fermer</button>
                    <button className="btn btn-smartcity" onClick={(event) => {
                        this.onModalSaved(event);
                    }}>Valider</button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default UserModal;