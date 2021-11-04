import React from 'react';
import './../../css/panel.css'
import './../../css/verticalActionBar.css'
import {Modal, Form} from "react-bootstrap";

class UserModal extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            modalIsVisible : props.modalIsVisible
        }

        this.user = props.data;
    }

    componentDidUpdate(previousProps, previousState, snapshot){
        if(previousProps.modalIsVisible !== this.props.modalIsVisible){
            this.setState({
                modalIsVisible: this.props.modalIsVisible
            });
        }

        if(previousProps.data !== this.props.data){
            this.setState({
                data: this.props.data
            });

            this.user = this.props.data;
        }
    }

    onInputChange(event, name){
        this.user[name] = event.target.value;
    }

    formattedDate(sqlDate){
        if(sqlDate === undefined){
            return sqlDate;
        }

        const date = new Date(sqlDate);
        return date.getFullYear()  + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' +  ('0' + date.getDate()).slice(-2);
    }

    render() {
        return (
            <Modal show={this.state.modalIsVisible} onHide={this.props.onHide} backdrop="static" keyboard={false} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{this.user === undefined ? "Création" : "Modification"} d'un utilisateur</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="email">Adresse email</label>
                                    <input id="email" type="email" className="form-control" placeholder="Adresse email" defaultValue={this.user?.email} onChange={(event) => this.onInputChange(event, "email")}/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="email">Mot de passe</label>
                                    <input id="password" type="password" className="form-control" placeholder="Mot de passe" onChange={(event) => this.onInputChange(event, "password")}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="birth_date">Date de naissance</label>
                                    <input id="birth_date" type="date" className="form-control" placeholder="Date de naissance" defaultValue={this.formattedDate(this.user?.birth_date)}/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="group">Rôle utilisateur</label>
                                    <Form.Select id="group">
                                        <option>Rôle</option>
                                        <option value="user">Utilisateur</option>
                                        <option value="admin">Administrateur</option>
                                    </Form.Select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="lastname">Nom</label>
                                    <input id="lastname" type="text" className="form-control" defaultValue={this.user?.last_name} onChange={(event) => this.onInputChange(event, "last_name")}/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="firstname">Prénom</label>
                                    <input id="firstname" type="text" className="form-control" defaultValue={this.user?.first_name} onChange={(event) => this.onInputChange(event, "first_name")}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="city">Ville</label>
                                    <input id="city" type="text" className="form-control" placeholder="Ville" defaultValue={this.user?.city} onChange={(event) => this.onInputChange(event, "city")}/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="street">Rue</label>
                                    <input id="street" type="text" className="form-control" placeholder="Rue" defaultValue={this.user?.street} onChange={(event) => this.onInputChange(event, "street")}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="zip_code">Code postal</label>
                                    <input id="zip_code" type="text" className="form-control" placeholder="Code postal" defaultValue={this.user?.zip_code} onChange={(event) => this.onInputChange(event, "zip_code")}/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="house_number">Numéro</label>
                                    <input id="house_number" type="text" className="form-control" placeholder="Numéro" defaultValue={this.user?.house_number} onChange={(event) => this.onInputChange(event, "house_number")}/>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-success" onClick={(event) => this.props.onHide(event)}>Fermer</button>
                    <button className="btn btn-smartcity" onClick={(event) => this.props.onSave(event, this.user)}>Valider</button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default UserModal;