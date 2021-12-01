module.exports = (userForm, isAnUpdate) => {
    const errors = {};
    const user = {...userForm};
    const email = user?.email;
    if (email === undefined || !email.match("[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
        errors.email = "Email invalide";
    }

    const birth_date = user?.birth_date;
    const now = new Date();
    const birthDate = new Date(birth_date);
    if (birth_date === undefined) {
        errors.birth_date = "Date invalide";
    } else if (new Date(birthDate) >= now) {
        errors.birth_date = "La date ne peut pas être égale ou après aujourd'hui";
    }

    const password = user?.password;
    if (!isAnUpdate && (password === undefined || password.trim() === "")) {
        errors.password = "Mot de passe invalide";
    }

    const role = user?.role;
    if (role === undefined || role === "Rôle") {
        errors.role = "Rôle invalide";
    }

    const firstName = user?.first_name;
    if (firstName === undefined || firstName.trim() === "") {
        errors.first_name = "Prénom invalide";
    }

    const lastName = user?.last_name;
    if (lastName === undefined || lastName.trim() === "") {
        errors.last_name = "Nom invalide";
    }

    const city = user?.city;
    if (city === undefined || city.trim() === "") {
        errors.city = "Ville invalide";
    }

    const street = user?.street;
    if (street === undefined || street.trim() === "") {
        errors.street = "Rue invalide";
    }

    const zipCode = user?.zip_code;
    if (zipCode === undefined) {
        errors.zip_code = "Code postal invalide";
    }

    const houseNumber = user?.house_number;
    if (houseNumber === undefined || houseNumber.trim() === "") {
        errors.house_number = "Numéro d'habitation invalide";
    }

    return {object: user, errors: errors, isValid: Object.keys(errors).length === 0};
}