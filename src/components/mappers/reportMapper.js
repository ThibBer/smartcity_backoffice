const mapper = function(report) {
    return (
        <>
            <td>{report.report_type.label}</td>
            <td>{report.state}</td>
            <td>{report.zip_code + " " + report.city}</td>
            <td>{report.street + " " + report.house_number}</td>
        </>
    );
};

export default mapper;