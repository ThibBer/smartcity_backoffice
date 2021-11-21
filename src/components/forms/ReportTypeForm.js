import React from "react";
import Error from "../Error";

class ReportTypeForm{
    getForm(reportType, errors, onInputChange){
        return(
            <form>
                <div className="row">
                    <div className="col">
                        <div className="form-group mb-3">
                            <label htmlFor="label">Libellé</label>
                            <input id="label" type="text" className="form-control" placeholder="Libellé" defaultValue={reportType?.label} onChange={(event) => onInputChange(event, "label")}/>
                            {errors.label && <Error content={errors.label}/>}
                        </div>
                    </div>
                </div>
            </form>
        );
    }

    isValid(reportType, errors){
        const label = reportType?.label;

        if(label === undefined || label.trim() === ""){
            errors.label = "Libellé invalide";
        }

        return Object.keys(errors).length === 0;
    }
}

export default ReportTypeForm;