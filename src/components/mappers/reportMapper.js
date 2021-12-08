import ReportStates from "../data/ReportStates";

const mapper = function(report) {
    const createdAt = new Date(report.created_at);
    const reporter = report.reporter;
    console.log(report)

    return (
        <>
            <td>{report.id}</td>
            <td>{report.description}</td>
            <td>{report.report_type ? report.report_type?.label : "Inconnu"}</td>
            <td>{ReportStates[report.state]}</td>
            <td>{report.zip_code + " " + report.city}<br/>{report.street + ", " + report.house_number}</td>
            <td>{createdAt.toLocaleDateString()} {createdAt.toLocaleTimeString()}</td>
            <td>{reporter ? ("#" + reporter.id + " " + reporter.first_name + " " + reporter.last_name) : "Donnée indisponible"}</td>
        </>
    );
};

export default mapper;