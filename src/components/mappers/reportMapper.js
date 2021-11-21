const mapper = function(report) {
    const createdAt = new Date(report.create_at);

    return (
        <>
            <td>{report.id}</td>
            <td>{report.description}</td>
            <td>{report.state}</td>
            <td>{report.zip_code + " " + report.city}<br/>{report.street + ", " + report.house_number}</td>
            <td>{createdAt.toLocaleDateString()} {createdAt.toLocaleTimeString()}</td>
        </>
    );
};

export default mapper;