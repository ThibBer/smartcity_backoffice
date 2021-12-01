module.exports = (eventForm, isAnUpdate) => {
    const errors = {};
    const event = {...eventForm};

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