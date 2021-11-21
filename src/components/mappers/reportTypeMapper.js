const mapper = function(reportType) {
    return (
        <>
            <td>{reportType.id}</td>
            <td>{reportType.label}</td>
        </>
    );
};

export default mapper;