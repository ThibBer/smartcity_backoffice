import React from 'react';
import BackOfficeTable from "./BackOfficeTable";
import userColumns from "./columns/user";
import axios from "axios";
import BackOfficeModal from "../Modals/BackOfficeModal";
import UserForm from "../Forms/UserForm"
import ErrorCodeManager from "../ErrorCodeManager"
import DeletePopup from "../DeletePopup";

class UserBackOffice extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tableContent: undefined,
            error: undefined,
            modal: {
                visibility: this.props.modalIsVisible,
                data: undefined,
                error: undefined
            },
            popup: {
                visibility: false,
                user: undefined
            }
        }
    }

    async componentDidMount() {
        try {
            const response = await axios.get("http://localhost:2001/v1/user/");
            const users = response.data;

            this.setState({
                tableContent: users
            });
        }catch (error) {
            this.setState({
                error: error.response ?? error
            })
        }
    }

    componentDidUpdate(previousProps, previousState, snapshot){
        if(previousProps.modalIsVisible !== this.props.modalIsVisible){
            const modal = this.state.modal;
            modal.visibility = this.props.modalIsVisible;

            this.setState({modal});
        }
    }

    rowMapper(user) {
        return (
            <>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{(new Date(user.birth_date)).toLocaleDateString()}</td>
                <td>{user.role}</td>

                <td>{user.zip_code + " " + user.city}</td>
                <td>{user.street + " " + user.house_number}</td>
            </>
        );
    }

    // ON CLOSE MODAL
    onHideModal(event){
        this.setModalVisibility(false);

        this.props.onModalClosed();
    }

    // ON SAVE MODAL
    async onSaveModal(event, user, isAnUpdate){
        const modal = this.state.modal;
        try {
            if(isAnUpdate){
                await axios.patch("http://localhost:2001/v1/user/", user);
            }else{
                await axios.post("http://localhost:2001/v1/user/", user);
            }

            modal.error = undefined;
            modal.visibility = false;
        }catch (error) {
            modal.error = ErrorCodeManager.message(error.response ?? error);
        }

        this.setState({modal});
    }

    // UPDATE MODAL VISIBILITY
    setModalVisibility(visibility){
        const modal = this.state.modal;
        modal.visibility = visibility;

        this.setState({modal});
    }

    onClickEditButton(event, user){
        const modal = this.state.modal;
        modal.visibility = true;
        modal.data = user;

        this.setState({modal});
    }

    onClickPopupDeleteButton(){

    }

    onClosePopup(){

    }

    onClickDeleteButton(event, user){
        //TODO Api call delete user

        const popup = this.state.popup;
        popup.visibility = true;
        popup.user = user;

        this.setState({
            popup
        });
    }

    render(){
        return (
            <>
                <BackOfficeTable columns={userColumns} data={this.state.tableContent} filter={this.props.filter} onClickEditButton={(event, user) => this.onClickEditButton(event, user)} onClickDeleteButton={(event, user) => this.onClickDeleteButton(event, user)} error={this.state.error} mapper={this.rowMapper} />

                <BackOfficeModal data={this.state.modal.data} modalIsVisible={this.state.modal.visibility} form={UserForm} title={"d'un utilisateur"} error={this.state.modal.error} onHide={(event) => this.onHideModal(event)} onSave={(event, object, isAnUpdate) => this.onSaveModal(event, object, isAnUpdate)}/>

                <DeletePopup popupIsVisible={this.state.popup.visibility} title={"Suppression d'un utilisateur"} content={"Etes-vous certains de vouloir supprimer " + this.state.popup.user?.first_name + " " + this.state.popup.user?.last_name}/>
            </>
        )
    }
}

export default UserBackOffice;