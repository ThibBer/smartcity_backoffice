import React from 'react';
import BackOfficeTable from "./BackOfficeTable";
import eventColumns from "./columns/event";
import axios from "axios";

class EventTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {data: []}
    }

    async componentDidMount() {
        const response = await axios.get("http://localhost:2001/v1/event/");
        const events = response.data;

        this.setState({data: events});
    }

    render(){
        return (
            <BackOfficeTable columns={eventColumns} filter={this.props?.filter} data={this.props.data}/>
        )
    }
}

export default EventTable;