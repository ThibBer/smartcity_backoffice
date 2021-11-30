const mapper = function(event) {
    if(event === undefined){
        return (<></>)
    }

    const eventDate = new Date(event?.date_hour);
    return (
        <>
            <td>{event.id}</td>
            <td>{event.description ?? "/"}</td>
            <td>{eventDate?.toLocaleDateString()} {eventDate?.toLocaleTimeString()}</td>
            <td>{event.duration} minutes</td>
            <td>{event.report}</td>
            <td>{event.creator}</td>
        </>
    );
};

export default mapper;