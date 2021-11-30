import React from "react";
import {Form} from "react-bootstrap";
import UserRoles from "./../data/UserRoles"
import Error from "../Error";

class UserForm{
    formattedDate(sqlDate){
        if(sqlDate === undefined){
            return sqlDate;
        }

        const date = new Date(sqlDate);
        return date.getFullYear()  + '-' + this.twoDigitFormatNumber(date.getMonth() + 1) + '-' + this.twoDigitFormatNumber(date.getDate());
    }

    twoDigitFormatNumber(number){
        if(number <= 9){
            return "0" + number;
        }

        return number;
    }

    getForm(user, errors, onInputChange, auxiliaryData, isAnUpdate){
        return(
            <form>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="email">Adresse email</label>
                            <input id="email" type="email" className="form-control" placeholder="Adresse email" defaultValue={user?.email} onChange={(event) => onInputChange(event, "email")}/>
                            {errors?.email && <Error content={errors.email}/>}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="password">Mot de passe</label>
                            <input id="password" type="password" className="form-control" placeholder="Mot de passe" onChange={(event) => onInputChange(event, "password")}/>
                            {isAnUpdate && <><small><i className="far fa-info-circle"/> Laisser le champ vide permet de modifier un utilisateur sans modifier son mot de passe</small><br/></>}
                            {errors?.password && <Error content={errors.password}/>}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="birth_date">Date de naissance</label>
                            <input id="birth_date" type="date" className="form-control" placeholder="Date de naissance" defaultValue={this.formattedDate(user?.birth_date)} onChange={(event) => onInputChange(event, "birth_date")}/>
                            {errors?.birth_date && <Error content={errors.birth_date}/>}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="group">Rôle utilisateur</label>
                            <Form.Select id="group" onClick={(event) => onInputChange(event, "role")}>
                                <option>Rôle</option>
                                {
                                    Object.keys(UserRoles).map(role =>
                                        (user?.role === role) ? <option key={role} value={role} defaultValue>{UserRoles[role]}</option> : <option key={role} value={role}>{UserRoles[role]}</option>
                                    )
                                }
                            </Form.Select>
                            {errors?.role && <Error content={errors.role}/>}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="lastname">Nom</label>
                            <input id="lastname" type="text" className="form-control" placeholder="Nom" defaultValue={user?.last_name} onChange={(event) => onInputChange(event, "last_name")}/>
                            {errors?.last_name && <Error content={errors.last_name}/>}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="firstname">Prénom</label>
                            <input id="firstname" type="text" className="form-control" placeholder="Prénom" defaultValue={user?.first_name} onChange={(event) => onInputChange(event, "first_name")}/>

                            {errors?.first_name && <Error content={errors.first_name}/>}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="city">Ville</label>
                            <input id="city" type="text" className="form-control" placeholder="Ville" defaultValue={user?.city} onChange={(event) => onInputChange(event, "city")}/>

                            {errors?.city && <Error content={errors.city}/>}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="street">Rue</label>
                            <input id="street" type="text" className="form-control" placeholder="Rue" defaultValue={user?.street} onChange={(event) => onInputChange(event, "street")}/>

                            {errors?.street && <Error content={errors.street}/>}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="zip_code">Code postal</label>
                            <input id="zip_code" type="number" className="form-control" placeholder="Code postal" defaultValue={user?.zip_code} onChange={(event) => onInputChange(event, "zip_code")}/>

                            {errors?.zip_code && <Error content={errors.zip_code}/>}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="house_number">Numéro</label>
                            <input id="house_number" type="text" className="form-control" placeholder="Numéro" defaultValue={user?.house_number} onChange={(event) => onInputChange(event, "house_number")}/>
                            {errors?.house_number && <Error content={errors.house_number}/>}
                        </div>
                    </div>
                </div>
            </form>
        );
    }

    validation(user, isAnUpdate){
        const errors = {};
        const email = user?.email;
        if(email === undefined || !email.match("[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")){
            errors.email = "Email invalide";
        }

        const birth_date = user?.birth_date;
        const now = new Date();
        const birthDate = new Date(birth_date);

        if(birth_date === undefined){
            errors.birth_date = "Date invalide";
        }else if(new Date(birthDate) >= now){
            errors.birth_date = "La date ne peut pas être égale ou après aujourd'hui";
        }

        const password = user?.password;
        if(!isAnUpdate && (password === undefined || password.trim() === "")){
            errors.password = "Mot de passe invalide";
        }

        const role = user?.role;
        if(role === undefined || role === "Rôle"){
            errors.role = "Rôle invalide";
        }

        const firstName = user?.first_name;
        if(firstName === undefined || firstName.trim() === ""){
            errors.first_name = "Prénom invalide";
        }

        const lastName = user?.last_name;
        if(lastName === undefined || lastName.trim() === ""){
            errors.last_name = "Nom invalide";
        }

        const city = user?.city;
        if(city === undefined || city.trim() === ""){
            errors.city = "Ville invalide";
        }

        const street = user?.street;
        if(street === undefined || street.trim() === ""){
            errors.street = "Rue invalide";
        }

        const zipCode = user?.zip_code;
        if(zipCode === undefined){
            errors.zip_code = "Code postal invalide";
        }

        const houseNumber = user?.house_number;
        if(houseNumber === undefined || houseNumber.trim() === ""){
            errors.house_number = "Numéro d'habitation invalide";
        }

        return {object: user, errors: errors, isValid: Object.keys(errors).length === 0};
    }
}

export default UserForm;