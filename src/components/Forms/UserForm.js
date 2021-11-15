import React from "react";
import {Form} from "react-bootstrap";
import UserRoles from "./../data/UserRoles"
import FormError from "../FormError";

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

    getForm(user, errors, onInputChange){
        console.log("Render User Form")
        return(
            <form>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="email">Adresse email</label>
                            <input id="email" type="email" className="form-control" placeholder="Adresse email" defaultValue={user?.email} onChange={(event) => onInputChange(event, "email")}/>
                            {errors.email && <FormError content={errors.email}/>}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="password">Mot de passe</label>
                            <input id="password" type="password" className="form-control" placeholder="Mot de passe" onChange={(event) => onInputChange(event, "password")}/>
                            {errors.password && <FormError content={errors.password}/>}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="birth_date">Date de naissance</label>
                            <input id="birth_date" type="date" className="form-control" placeholder="Date de naissance" defaultValue={this.formattedDate(user?.birth_date)} onChange={(event) => onInputChange(event, "birth_date")}/>
                            {errors.birth_date && <FormError content={errors.birth_date}/>}
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
                            {errors.group && <FormError content={errors.group}/>}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="lastname">Nom</label>
                            <input id="lastname" type="text" className="form-control" placeholder="Nom" defaultValue={user?.last_name} onChange={(event) => onInputChange(event, "last_name")}/>
                            {errors.lastname && <FormError content={errors.lastname}/>}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="firstname">Prénom</label>
                            <input id="firstname" type="text" className="form-control" placeholder="Prénom" defaultValue={user?.first_name} onChange={(event) => onInputChange(event, "first_name")}/>

                            {errors.firstname && <FormError content={errors.firstname}/>}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="city">Ville</label>
                            <input id="city" type="text" className="form-control" placeholder="Ville" defaultValue={user?.city} onChange={(event) => onInputChange(event, "city")}/>

                            {errors.city && <FormError content={errors.city}/>}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="street">Rue</label>
                            <input id="street" type="text" className="form-control" placeholder="Rue" defaultValue={user?.street} onChange={(event) => onInputChange(event, "street")}/>

                            {errors.street && <FormError content={errors.street}/>}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="zip_code">Code postal</label>
                            <input id="zip_code" type="number" className="form-control" placeholder="Code postal" defaultValue={user?.zip_code} onChange={(event) => onInputChange(event, "zip_code")}/>

                            {errors.zip_code && <FormError content={errors.zip_code}/>}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="house_number">Numéro</label>
                            <input id="house_number" type="text" className="form-control" placeholder="Numéro" defaultValue={user?.house_number} onChange={(event) => onInputChange(event, "house_number")}/>
                            {errors.house_number && <FormError content={errors.house_number}/>}
                        </div>
                    </div>
                </div>
            </form>
        );
    }


    isValid(user, errors){
        /*RESET OBJECT PROPERTIES*/
        Object.keys(errors).forEach(key => {
            delete errors[key];
        })

        const email = user?.email;
        if(email === undefined || !email.match("[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")){
            errors.email = "Email invalide";
        }

        const password = user?.password;
        if(password === undefined || password.trim() === ""){
            errors.password = "Mot de passe invalide";
        }

        return Object.keys(errors).length === 0;
    }
}

export default UserForm;