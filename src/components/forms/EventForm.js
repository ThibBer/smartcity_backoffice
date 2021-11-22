import React from "react";
import Error from "../Error";

class eventForm{
    getForm(event, errors, onInputChange){
        return(
            <form>
                <div className="row">
                    <div className="col">
                        <div className="form-group mb-3">
                            <label htmlFor="date_hour">Date / heure</label>
                            <input id="date_hour" type="datetime-local" className="form-control" defaultValue={event?.date_hour?.substr(0, 16)} onChange={(event) => onInputChange(event, "date_hour")}/>
                            {errors.date_hour && <Error content={errors.date_hour}/>}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="report">Signalement</label>
                            <input id="report" type="number" className="form-control" placeholder="Signalement" defaultValue={event?.report} onChange={(event) => onInputChange(event, "report")}/>
                            {errors.report && <Error content={errors.report}/>}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="creator">Créateur</label>
                            <input id="creator" type="number" className="form-control" placeholder="Créateur" defaultValue={event?.creator} onChange={(event) => onInputChange(event, "creator")}/>
                            {errors.creator && <Error content={errors.creator}/>}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group mb-3">
                            <label htmlFor="description">Description</label>
                            <textarea id="description" className="form-control" placeholder="Description" rows="4" defaultValue={event?.description} onChange={(event) => onInputChange(event, "description")}/>
                            {errors.description && <Error content={errors.description}/>}
                        </div>
                    </div>
                </div>
            </form>
        );
    }

    isValid(event, errors){

        const email = event?.email;
        if(email === undefined || !email.match("[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")){
            errors.email = "Email invalide";
        }

        const password = event?.password;
        if(password === undefined || password.trim() === ""){
            errors.password = "Mot de passe invalide";
        }

        const birth_date = event?.birth_date;
        const now = new Date();
        const birthDate = new Date(birth_date);

        if(birth_date === undefined){
            errors.birth_date = "Date invalide";
        }else if(new Date(birthDate) >= now){
            errors.birth_date = "La date ne peut pas être égale ou après aujourd'hui";
        }

        const role = event?.role;
        if(role === undefined || role === "Rôle"){
            errors.role = "Rôle invalide";
        }

        const firstName = event?.first_name;
        if(firstName === undefined || firstName.trim() === ""){
            errors.first_name = "Prénom invalide";
        }

        const lastName = event?.last_name;
        if(lastName === undefined || lastName.trim() === ""){
            errors.last_name = "Nom invalide";
        }

        const city = event?.city;
        if(city === undefined || city.trim() === ""){
            errors.city = "Ville invalide";
        }

        const street = event?.street;
        if(street === undefined || street.trim() === ""){
            errors.street = "Rue invalide";
        }

        const zipCode = event?.zip_code;
        if(zipCode === undefined){
            errors.zip_code = "Code postal invalide";
        }

        const houseNumber = event?.house_number;
        if(houseNumber === undefined || houseNumber.trim() === ""){
            errors.house_number = "Numéro d'habitation invalide";
        }

        return Object.keys(errors).length === 0;
    }
}

export default eventForm;