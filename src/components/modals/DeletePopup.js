import React from 'react';
import {Modal} from "react-bootstrap";
import Error from "../Error";
import PropTypes from "prop-types";

class DeletePopup extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            popupIsVisible: false,
            error: this.props.error
        }
    }

    componentDidUpdate(previousProps, previousState, snapshot){
        if(previousProps.popupIsVisible !== this.props.popupIsVisible){
            this.setState({
                popupIsVisible: this.props.popupIsVisible
            });
        }

        if(previousProps.error !== this.props.error){
            this.setState({
                error: this.props.error
            });
        }
    }

    render() {
        return (
            <Modal show={this.state.popupIsVisible} onHide={(event) => this.props.onClose(event, false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Suppression d'un {this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Êtes-vous certain de vouloir supprimer un élément de la table {this.props.title} ?</p>
                    {this.state.error && <Error content={this.state.error}/>}
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-success" onClick={(event) => this.props.onClose(event, false)}>Fermer</button>
                    <button className="btn btn-smartcity" onClick={(event) => this.props.onClose(event, true)}>Valider</button>
                </Modal.Footer>
            </Modal>
        );
    }
}

DeletePopup.propTypes = {
    popupIsVisible: PropTypes.bool,
    error: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string
}

export default DeletePopup;