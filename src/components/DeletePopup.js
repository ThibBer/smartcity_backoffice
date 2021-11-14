import React from 'react';
import {Modal} from "react-bootstrap";

class DeletePopup extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            popupIsVisible: false
        }
    }

    componentDidUpdate(previousProps, previousState, snapshot){
        if(previousProps.popupIsVisible !== this.props.popupIsVisible){
            this.setState({
                popupIsVisible: this.props.popupIsVisible
            });
        }
    }

    render() {
        return (
            <Modal show={this.state.popupIsVisible} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{this.props.content}</p>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-success" onClick={(event) => this.props.onHide(event)}>Fermer</button>
                    <button className="btn btn-smartcity" onClick={(event) => this.props.onSave(event, this.data, this.isAnUpdate)}>Valider</button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default DeletePopup;