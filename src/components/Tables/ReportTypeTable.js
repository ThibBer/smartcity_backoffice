import React from 'react';
import BackOfficeTable from "./BackOfficeTable";
import reportTypesColumns from "./columns/reportType";
import axios from "axios";

class ReportTypeTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    async componentDidMount() {
        const response = await axios.get("http://localhost:2001/v1/reportType/");
        const reportTypes = response.data;

        this.setState({data: reportTypes});
    }

    render(){
        return (
            <BackOfficeTable key={this.state.data} columns={reportTypesColumns} data={this.state.data} filter={this.props.filter} />
        )
    }
}

export default ReportTypeTable;