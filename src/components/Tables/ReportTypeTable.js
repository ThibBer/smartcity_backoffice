import React from 'react';
import BackOfficeTable from "./BackOfficeTable";
import reportTypesColumns from "./columns/reportType";
import axios from "axios";

class ReportTypeTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: undefined,
            error: undefined
        }
    }

    async componentDidMount() {

        try{
            const response = await axios.get("http://localhost:2001/v1/reportType/");
            const reportTypes = response.data;

            this.setState({
                data: reportTypes
            });
        }catch (error) {
            this.setState({
                error: error
            });
        }
    }

    rowMapper(reportType) {
        return (
            <>
                <td>{reportType.label}</td>
            </>
        );
    }

    render(){
        return (
            <BackOfficeTable columns={reportTypesColumns} data={this.state.data} filter={this.props.filter} error={this.state.error} mapper={this.rowMapper} />
        )
    }
}

export default ReportTypeTable;