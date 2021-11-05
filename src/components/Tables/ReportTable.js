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

    rowMapper(report) {
        return (
            <>
                <td>{report.report_type.label}</td>
                <td>{report.state}</td>
                <td>{report.zip_code + " " + report.city}</td>
                <td>{report.street + " " + report.house_number}</td>
            </>
        );
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
            <BackOfficeTable key={this.state.data} columns={reportColumns} data={this.state.data} filter={this.props.filter} error={this.state.error} mapper={this.rowMapper}/>
        )
    }
}

export default ReportTable;