const mapper = function(event) {
    const eventDate = new Date(event.date);

    return (
        <>
            <td>{event.id}</td>
            <td>{eventDate.toLocaleDateString()} {eventDate.toLocaleTimeString()}</td>
            <td>{eventDate.length}</td>
            <td>{eventDate.report}</td>
            <td>{eventDate.creator}</td>
        </>
    );
};

export default mapper;