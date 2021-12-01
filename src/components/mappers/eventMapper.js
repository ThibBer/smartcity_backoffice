const ReportStates = require("../data/ReportStates");

const mapper = function(event) {
    const eventDate = new Date(event?.date_hour);
    const creator = event.creator;

    return (
        <>
            <td>{event.id}</td>
            <td>{event.description ?? "/"}</td>
            <td>{eventDate?.toLocaleDateString()} {eventDate?.toLocaleTimeString()}</td>
            <td>{event.duration} minutes</td>
            <td>#{event.report?.id} - {ReportStates[event.report?.state]} <br/> {event.report?.zip_code + " " + event.report?.city}<br/>{event.report?.street + ", " + event.report?.house_number}</td>
            <td>#{creator?.id} {creator?.first_name} {creator?.last_name}</td>
        </>
    );
};

export default mapper;