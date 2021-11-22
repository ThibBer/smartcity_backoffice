import React from "react";
import {Form} from "react-bootstrap";
import ReportStates from "./../data/ReportStates"
import Error from "../Error";

class reportForm{
    getForm(report, errors, onInputChange, auxiliaryData){
        return(
            <form>
                <div className="row">
                    <div className="col">
                        <div className="form-group mb-3">
                            <label htmlFor="description">Description</label>

                            <textarea className="form-control" id="description" rows="3" placeholder="Description" defaultValue={report?.description} onChange={(event) => onInputChange(event, "description")}/>
                            {errors.description && <Error content={errors.description}/>}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="form-group mb-3">
                            <label htmlFor="state">État</label>
                            <Form.Select id="state" onClick={(event) => onInputChange(event, "state")}>
                                <option>État</option>
                                {
                                    Object.keys(ReportStates).map(state =>
                                        (report?.state === state) ? <option key={state} value={state} defaultValue>{ReportStates[state]}</option> : <option key={state} value={state}>{ReportStates[state]}</option>
                                    )
                                }
                            </Form.Select>
                            {errors.state && <Error content={errors.state}/>}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="creator">Créateur</label>
                            <input id="creator" type="number" className="form-control" placeholder="Créateur" defaultValue={report?.creator} onChange={(event) => onInputChange(event, "creator")}/>

                            {errors.creator && <Error content={errors.creator}/>}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="creator">Type de report</label>
                            <Form.Select id="reportType" onClick={(event) => onInputChange(event, "reportType")}>
                                <option>État</option>
                                {
                                    Object.keys(auxiliaryData.reportTypes).map((str, index) =>{
                                        const reportType = auxiliaryData.reportTypes[index];

                                        return (report?.report_type.id === reportType.id) ? <option key={index} value={reportType.id} defaultValue>{reportType.label}</option> : <option key={index} value={reportType.id}>{reportType.label}</option>
                                    })
                                }
                            </Form.Select>
                            {errors.creator && <Error content={errors.creator}/>}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="city">Ville</label>
                            <input id="city" type="text" className="form-control" placeholder="Ville" defaultValue={report?.city} onChange={(event) => onInputChange(event, "city")}/>

                            {errors.city && <Error content={errors.city}/>}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="street">Rue</label>
                            <input id="street" type="text" className="form-control" placeholder="Rue" defaultValue={report?.street} onChange={(event) => onInputChange(event, "street")}/>

                            {errors.street && <Error content={errors.street}/>}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="zip_code">Code postal</label>
                            <input id="zip_code" type="number" className="form-control" placeholder="Code postal" defaultValue={report?.zip_code} onChange={(event) => onInputChange(event, "zip_code")}/>

                            {errors.zip_code && <Error content={errors.zip_code}/>}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="house_number">Numéro</label>
                            <input id="house_number" type="text" className="form-control" placeholder="Numéro" defaultValue={report?.house_number} onChange={(event) => onInputChange(event, "house_number")}/>
                            {errors.house_number && <Error content={errors.house_number}/>}
                        </div>
                    </div>
                </div>
            </form>
        );
    }

    isValid(formReport, errors){
        const report = {...formReport};
        const state = report?.state;
        if(state === undefined || state === "État"){
            errors.state = "État invalide";
        }

        const city = report?.city;
        if(city === undefined || city.trim() === ""){
            errors.city = "Ville invalide";
        }

        const street = report?.street;
        if(street === undefined || street.trim() === ""){
            errors.street = "Rue invalide";
        }

        const zipCode = report?.zip_code;
        if(zipCode === undefined){
            errors.zip_code = "Code postal invalide";
        }

        const houseNumber = report?.house_number;
        if(houseNumber === undefined || houseNumber.trim() === ""){
            errors.house_number = "Numéro d'habitation invalide";
        }

        return Object.keys(errors).length === 0;
    }
}

export default reportForm;