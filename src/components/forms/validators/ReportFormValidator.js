module.exports = (formReport, isAnUpdate) => {
    const errors = {};
    const report = {...formReport};

    const state = report?.state;
    if(state === undefined || state === "État"){
        errors.state = "État invalide";
    }

    const reporter = report?.reporter;
    if(reporter === undefined){
        errors.reporter = "Créateur invalide";
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

    const reportType = report.report_type;
    if(reportType === undefined || reportType === "Type de signalement"){
        errors.report_type = "Type de signalement invalide";
    }

    report.created_at = Date.now();

    return {object: report, errors: errors, isValid: Object.keys(errors).length === 0};
}