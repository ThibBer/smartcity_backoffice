import React from 'react';
import BackOfficeTable from "./BackOfficeTable";
import eventColumns from "./columns/event";
import axios from "axios";

class EventTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: undefined,
            error: undefined
        }
    }

    rowMapper(event) {
        const date = new Date(event.date);
        const creator = event.creator;
        const report = event.report;

        return (
            <>
                <td>{date.toLocaleDateString() + " - " + date.toLocaleTimeString()}</td>
                <td>{event.length}</td>
                <td>{creator.first_name + " " + creator.last_name}</td>
                <td>{report.report_type.label}</td>
                <td>{report.street + ", " + report.house_number} <br/> {report.city + " " + report.zip_code}</td>
            </>
        );
    }

    async componentDidMount() {
        try{
            const response = await axios.get("http://localhost:2001/v1/event/");
            const events = response.data;
            console.log(events)

            this.setState({
                data: events
            });
        }catch (error){
            this.setState({
                error: error
            });
        }

    }

    render(){
        return (
            <BackOfficeTable key={this.state.data} columns={eventColumns} data={this.state.data} filter={this.props.filter} error={this.state.error} mapper={this.rowMapper}/>
        )
    }
}

export default EventTable;