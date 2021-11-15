module.exports.message = (error) => {
    let message = "Une erreur inattendue est survenue ...";

    if(error?.message === "Network Error"){
        message = "Une erreur serveur rend impossible l'accès aux données";
    }else if(error.status >= 500 && error.status < 600){
        message = "Une erreur serveur est survenue. Réessayer dans quelques instants";
    }else if(error.status >= 400 && error.status < 500 ){
        message = "Une erreur est survenue. La ressource demandée n'est pas disponible";
    }

    return message;
}