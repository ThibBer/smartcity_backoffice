module.exports = (eventForm, isAnUpdate) => {
    const errors = {};
    const event = {...eventForm};

    const dateHour = event.date_hour;
    if(dateHour === undefined){
        errors.date_hour = "Date/heure invalide";
    }

    const duration = event.duration;
    if(duration === undefined || isNaN(duration) || duration <= 0){
        errors.duration = "Durée de l'événement invalide";
    }

    const report = event.report;
    if(report === undefined){
        errors.report = "Signalement invalide";
    }

    const creator = event.creator;
    if(creator === undefined){
        errors.creator = "Créateur invalide";
    }

    return {object: event, errors: errors, isValid: Object.keys(errors).length === 0};
}