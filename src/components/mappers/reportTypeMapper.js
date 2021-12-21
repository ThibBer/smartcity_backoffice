const mapper = function(reportType) {
    const imageURL = `${process.env.REACT_APP_API_URL}reportTypes/${reportType.image}`;

    return (
        <>
            <td>{reportType.id}</td>
            <td>{reportType.label}</td>
            <td>{reportType.image ? <a href={imageURL} target="_blank" rel="noreferrer"><img className="img-fluid" width={250} src={imageURL} alt={"Impossible de charger la ressource"}/></a> : "Pas disponible" }</td>
        </>
    );
};

export default mapper;