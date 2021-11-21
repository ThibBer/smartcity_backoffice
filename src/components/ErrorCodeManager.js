module.exports.message = (error) => {
    let errorMessage = "Une erreur inattendue est survenue ...";

    if(error?.message === "Network Error"){
        errorMessage = "Une erreur serveur rend cette action impossible";
    }else if(error.status >= 200 && error.status < 300 ){
        errorMessage = undefined;
    }else if(error.status >= 400 && error.status < 500 ){
        errorMessage = "Une erreur est survenue. La ressource demandée n'est pas disponible";
    }else if(error.status >= 500 && error.status < 600){
        errorMessage = "Une erreur serveur est survenue. Réessayer dans quelques instants";
    }

    return errorMessage;
}