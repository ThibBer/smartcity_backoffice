import React from "react";
import {Form} from "react-bootstrap";
import UserRoles from "./../data/UserRoles"

function formattedDate(sqlDate){
    if(sqlDate === undefined){
        return sqlDate;
    }

    const date = new Date(sqlDate);
    return date.getFullYear()  + '-' + twoDigitFormatNumber(date.getMonth() + 1) + '-' + twoDigitFormatNumber(date.getDate());
}

function twoDigitFormatNumber(number){
    if(number <= 9){
        return "0" + number;
    }

    return number;
}

export default function UserForm(user, onInputChange){
    return(
        <form>
            <div className="row">
                <div className="col-6">
                    <div className="form-group mb-3">
                        <label htmlFor="email">Adresse email</label>
                        <input id="email" type="email" className="form-control" placeholder="Adresse email" defaultValue={user?.email} onChange={(event) => onInputChange(event, "email")}/>
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group mb-3">
                        <label htmlFor="email">Mot de passe</label>
                        <input id="password" type="password" className="form-control" placeholder="Mot de passe" onChange={(event) => onInputChange(event, "password")}/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <div className="form-group mb-3">
                        <label htmlFor="birth_date">Date de naissance</label>
                        <input id="birth_date" type="date" className="form-control" placeholder="Date de naissance" defaultValue={formattedDate(user?.birth_date)} onChange={(event) => onInputChange(event, "birth_date")}/>
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group mb-3">
                        <label htmlFor="group">Rôle utilisateur</label>
                        <Form.Select id="group">
                            <option>Rôle</option>
                            {
                                Object.keys(UserRoles).map(role =>
                                    (user?.role === role) ? <option key={role} value={role} defaultValue>{UserRoles[role]}</option> : <option key={role} value={role}>{UserRoles[role]}</option>
                                )
                            }
                        </Form.Select>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <div className="form-group mb-3">
                        <label htmlFor="lastname">Nom</label>
                        <input id="lastname" type="text" className="form-control" defaultValue={user?.last_name} onChange={(event) => onInputChange(event, "last_name")}/>
                        <small className="error"><i className="far fa-exclamation-triangle"/> Nom de famille invalide</small>
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group mb-3">
                        <label htmlFor="firstname">Prénom</label>
                        <input id="firstname" type="text" className="form-control" defaultValue={user?.first_name} onChange={(event) => onInputChange(event, "first_name")}/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <div className="form-group mb-3">
                        <label htmlFor="city">Ville</label>
                        <input id="city" type="text" className="form-control" placeholder="Ville" defaultValue={user?.city} onChange={(event) => onInputChange(event, "city")}/>
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group mb-3">
                        <label htmlFor="street">Rue</label>
                        <input id="street" type="text" className="form-control" placeholder="Rue" defaultValue={user?.street} onChange={(event) => onInputChange(event, "street")}/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <div className="form-group mb-3">
                        <label htmlFor="zip_code">Code postal</label>
                        <input id="zip_code" type="text" className="form-control" placeholder="Code postal" defaultValue={user?.zip_code} onChange={(event) => onInputChange(event, "zip_code")}/>
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group mb-3">
                        <label htmlFor="house_number">Numéro</label>
                        <input id="house_number" type="text" className="form-control" placeholder="Numéro" defaultValue={user?.house_number} onChange={(event) => onInputChange(event, "house_number")}/>
                    </div>
                </div>
            </div>
        </form>
    );
}