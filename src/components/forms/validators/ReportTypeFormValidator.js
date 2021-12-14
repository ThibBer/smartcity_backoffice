const validator = (reportTypeForm) => {
    const errors = {};
    const reportType = {...reportTypeForm}
    const label = reportType?.label;

    if(label === undefined || label.trim() === ""){
        errors.label = "Libellé invalide";
    }

    return {object: reportType, errors: errors, isValid: Object.keys(errors).length === 0};
}

export default validator;