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
                            {errors?.date_hour && <Error content={errors.date_hour}/>}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="report">Signalement</label>
                            <input id="report" type="number" className="form-control" placeholder="Signalement" defaultValue={event?.report} onChange={(event) => onInputChange(event, "report")}/>
                            {errors?.report && <Error content={errors.report}/>}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="creator">Créateur</label>
                            <input id="creator" type="number" className="form-control" placeholder="Créateur" defaultValue={event?.creator} onChange={(event) => onInputChange(event, "creator")}/>
                            {errors?.creator && <Error content={errors.creator}/>}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group mb-3">
                            <label htmlFor="description">Description</label>
                            <textarea id="description" className="form-control" placeholder="Description" rows="4" defaultValue={event?.description} onChange={(event) => onInputChange(event, "description")}/>
                            {errors?.description && <Error content={errors.description}/>}
                        </div>
                    </div>
                </div>
            </form>
        );
    }

    validation(event){
        const errors = {};

        const dateHour = event.date_hour;
        if(dateHour === undefined){
            errors.date_hour = "Date/heure invalide";
        }

        const report = event.report;
        if(report === undefined){
            errors.report = "Numéro de signalement invalide";
        }

        const creator = event.creator;
        if(creator === undefined){
            errors.creator = "Numéro du créateur invalide";
        }

        return {object: event, errors: errors, isValid: Object.keys(errors).length === 0};
    }
}

export default eventForm;