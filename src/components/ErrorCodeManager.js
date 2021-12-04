module.exports.message = (error, customChecksCallback) => {
    console.error(error) //TODO Use console.error() only for debug
    let errorMessage = undefined;
    if (customChecksCallback !== undefined){
        errorMessage = customChecksCallback(error);
    }

    if(errorMessage === undefined){
        const errorData = error?.response?.data?.error;

        if (error?.message === "Network Error") {
            errorMessage = "Une erreur serveur rend cette action impossible, il est impossible de joindre le serveur";
        }else if(errorData) {
            errorMessage = errorData;
        } else if (error?.response.status >= 200 && error?.response.status < 300) {
            errorMessage = undefined;
        }else if (error?.response.status === 403){
            errorMessage = "Vous n'êtes pas autorisé à effectuer cette action."
        } else if (error?.response.status >= 400 && error?.response.status < 500) {
            errorMessage = "Une erreur est survenue. Utilisation d'une donnée incorrecte ou non disponible " + error.response.data;
        } else if (error?.response.status >= 500 && error?.response.status < 600) {
            errorMessage = "Une erreur serveur est survenue. Réessayer dans quelques instants";
        }
    }

    return errorMessage ?? "Une erreur inattendue est survenue ...";
}