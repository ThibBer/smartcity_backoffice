import React from 'react';
import BackOfficeTable from "./BackOfficeTable";
import userColumns from "./columns/user";
import axios from "axios";

class UserTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    async componentDidMount() {
        const response = await axios.get("http://localhost:2001/v1/user/");
        const users = response.data;

        this.setState({data: users});
    }

    render(){
        return (
            <BackOfficeTable key={this.state.data} columns={userColumns} data={this.state.data} filter={this.props.filter} />
        )
    }
}

export default UserTable;