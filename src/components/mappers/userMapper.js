import UserRoles from "../data/UserRoles";

const mapper = function(user) {
    const birthDate = new Date(user.birth_date);

    return (
        <>
            <td>{user.id}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
            <td>{birthDate.toLocaleDateString()}</td>
            <td>{UserRoles[user.role]}</td>
            <td>{user.zip_code + " " + user.city}<br/>{user.street + ", " + user.house_number}</td>
        </>
    );
};

export default mapper;