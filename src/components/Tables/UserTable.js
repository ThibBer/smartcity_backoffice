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
            },
            error: undefined
        }
    }

    async componentDidMount() {
        try {
            const response = await axios.get("http://localhost:2001/v1/user/");
            const users = response.data;

            this.setState({data: users});
        }catch (error) {
            this.setState({
                error: error
            })
        }
    }

    // ON CLOSE MODAL
    onHideModal(event){
        this.setModalVisibility(false);
    }

    // ON SAVE MODAL
    async onSaveModal(event, data){
        if(data !== this.state.data){
            try {
                await axios.patch("http://localhost:2001/v1/user/", data);
            }catch (error) {
                console.error('Failure!');
                console.error(error)
            }
        }


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

    onClickEditButton(event, user){
        this.setState({
            modal: {
                visibility: true,
                data: user
            }
        })
    }

    async onClickDeleteButton(event, user){
        //TODO Api call delete user
        console.error("TODO Api call delete user");
    }

    render(){
        return (
            <>
                <BackOfficeTable columns={userColumns} data={this.state.data} filter={this.props.filter} onClickEditButton={(event, user) => this.onClickEditButton(event, user)} onClickDeleteButton={(event, user) => this.onClickDeleteButton(event, user)} error={this.state.error} />

                <UserModal data={this.state.modal.data} modalIsVisible={this.modalIsVisible()} onHide={(event) => this.onHideModal(event)} onSave={(event, object) => this.onSaveModal(event, object)}/>
            </>
        )
    }
}

export default UserTable;