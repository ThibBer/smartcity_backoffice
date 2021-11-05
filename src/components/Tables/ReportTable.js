import React from 'react';
import BackOfficeTable from "./BackOfficeTable";
import reportColumns from "./columns/report";
import axios from "axios";

class ReportTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    async componentDidMount() {
        try{
            const response = await axios.get("http://localhost:2001/v1/report/");
            const reports = response.data;

            this.setState({data: reports});
        }catch (error) {
            console.log(error.response)
            this.setState({error: error.response});
        }

    }

    render(){
        return (
            <BackOfficeTable key={this.state.data} columns={reportColumns} data={this.state.data} filter={this.props.filter} error={this.state.error} />
        )
    }
}

export default ReportTable;