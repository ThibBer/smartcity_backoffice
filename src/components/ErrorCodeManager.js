module.exports.message = (error, customChecksCallback) => {
    console.error(error)
    let errorMessage = undefined;

    if (error?.message === "Network Error") {
        errorMessage = "Une erreur serveur rend cette action impossible, il est impossible de joindre le serveur";
    }else if (customChecksCallback !== undefined){
        errorMessage = customChecksCallback(error);
    }

    if(errorMessage === undefined){
        const errorData = error?.response.data?.error;

        if(errorData) {
            errorMessage = errorData;
        } else if (error.status >= 200 && error.status < 300) {
            errorMessage = undefined;
        } else if (error.status >= 400 && error.status < 500) {
            errorMessage = "Une erreur est survenue. Utilisation d'une donnée incorrecte ou non disponible " + error.response.data;
        } else if (error.status >= 500 && error.status < 600) {
            errorMessage = "Une erreur serveur est survenue. Réessayer dans quelques instants";
        }
    }

    return errorMessage ?? "Une erreur inattendue est survenue ...";
}