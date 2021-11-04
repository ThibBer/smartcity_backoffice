import React from 'react';
import BackOfficeTable from "./BackOfficeTable";
import userColumns from "./columns/user";
import axios from "axios";
import UserModal from "../Modals/UserModal";

class UserTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            modal: {
                visibility: false,
                data: {}
            }
        }
    }

    async componentDidMount() {
        const response = await axios.get("http://localhost:2001/v1/user/");
        const users = response.data;

        this.setState({data: users});
    }

    // ON CLOSE MODAL
    onHideModal(event){
        this.setModalVisibility(false);
    }

    // ON SAVE MODAL
    onSaveModal(event, data){



        this.setModalVisibility(false);
    }

    // UPDATE MODAL VISIBILITY
    setModalVisibility(visibility){
        this.setState({
            modal: {
                visibility: visibility
            }
        });
    }

    modalIsVisible(){
        return this.state.modal.visibility && this.state.modal.data !== undefined;
    }

    onClickEditButton(event, rowData){
        this.setState({
            modal: {
                visibility: true,
                data: rowData
            }
        })
    }

    onClickDeleteButton(event){

    }

    render(){
        return (
            <>
                <BackOfficeTable key={this.state.data} columns={userColumns} data={this.state.data} filter={this.props.filter} onClickEditButton={(event, rowData) => this.onClickEditButton(event, rowData)} />

                <UserModal modalIsVisible={this.modalIsVisible()} data={this.state.modal.data} onHide={(event) => this.onHideModal(event)} onSave={(event, object) => this.onSaveModal(event, object)}/>
            </>
        )
    }
}

export default UserTable;