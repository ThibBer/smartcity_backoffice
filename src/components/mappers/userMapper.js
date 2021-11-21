const mapper = function(user) {
    return (
        <>
            <td>{user.id}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
            <td>{(new Date(user.birth_date)).toLocaleDateString()}</td>
            <td>{user.role}</td>

            <td>{user.zip_code + " " + user.city}<br/>{user.street + ", " + user.house_number}</td>
        </>
    );
};

export default mapper;