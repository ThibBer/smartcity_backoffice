function formatState(state){
    if(state === undefined){
        return "";
    }

    return state.charAt(0).toUpperCase() + state.slice(1);
}

const mapper = function(report) {
    const createdAt = new Date(report.created_at);

    return (
        <>
            <td>{report.id}</td>
            <td>{report.description}</td>
            <td>{report.report_type?.label}</td>
            <td>{formatState(report.state)}</td>
            <td>{report.zip_code + " " + report.city}<br/>{report.street + ", " + report.house_number}</td>
            <td>{createdAt.toLocaleDateString()} {createdAt.toLocaleTimeString()}</td>
        </>
    );
};

export default mapper;