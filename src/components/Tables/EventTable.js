import React from 'react';
import BackOfficeTable from "./BackOfficeTable";
import eventColumns from "./columns/event";
import axios from "axios";

class EventTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            error: undefined
        }
    }

    rowMapper(object) {
        return (
            <>
                <td>{object.report.state}</td>
            </>
        );
    }

    async componentDidMount() {
        try{
            const response = await axios.get("http://localhost:2001/v1/event/");
            const events = response.data;

            this.setState({
                data: events,
            });
        }catch (error){
            this.setState({
                error: error,
            });
        }

    }

    render(){
        return (
            <BackOfficeTable key={this.state.data} columns={eventColumns} data={this.state.data} filter={this.props.filter} error={this.state.error} mapper={this.rowMapper} />
        )
    }
}

export default EventTable;