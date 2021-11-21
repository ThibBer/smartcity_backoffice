import React from 'react';
import BackOfficeTable from "./tables/BackOfficeTable";
import axios from "axios";
import BackOfficeModal from "./modals/BackOfficeModal";
import ErrorCodeManager from "./ErrorCodeManager"
import DeletePopup from "./modals/DeletePopup";

class BackEndPanel extends React.Component {

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
                user: undefined,
                error: undefined
            }
        }
    }

    async componentDidMount() {
        await this.loadTableContent();
    }

    async loadTableContent(){
        this.setState({
            tableContent: undefined
        });

        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + this.props.apiRoute);
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

    async componentDidUpdate(previousProps, previousState, snapshot){
        if(previousProps.modalIsVisible !== this.props.modalIsVisible){
            const modal = this.state.modal;
            modal.visibility = this.props.modalIsVisible;

            this.setState({modal});
        }

        if(previousProps.apiRoute !== this.props.apiRoute){
            await this.loadTableContent();
        }
    }

    /*EDIT MODAL CALLBACKS*/

    // ON CLOSE MODAL
    onHideModal(event){
        const modal = {
            visibility: false,
            data: undefined,
            error: undefined
        };

        this.setState({modal});

        this.props.onModalClosed();
    }

    // ON SAVE MODAL
    async onSaveModal(event, data, isAnUpdate){
        const modal = {...this.state.modal};
        modal.error = undefined;
        this.setState({modal});

        try {
            const webServiceAddress = process.env.REACT_APP_API_URL + this.props.apiRoute;
            if(isAnUpdate){
                await axios.patch(webServiceAddress, data);
            }else{
                const response = await axios.post(webServiceAddress, data);
                data.id = response.data.id;

                const tableContent = [...this.state.tableContent];
                tableContent.push(data)

                this.setState({tableContent});
            }

            modal.visibility = false;
        }catch (error) {
            modal.error = ErrorCodeManager.message(error.response ?? error);
        }

        modal.data = undefined;

        this.setState({modal});
    }

    /*TABLE CALLBACKS*/
    onClickEditButton(event, selectedObject){
        const modal = {...this.state.modal};
        modal.visibility = true;
        modal.data = selectedObject;

        this.setState({modal});
    }

    onClickDeleteButton(event, selectedObject){
        const popup = {...this.state.popup};
        popup.visibility = true;
        popup.data = selectedObject;

        this.setState({
            popup
        });
    }

    /*DELETE MODAL CALLBACKS*/
    async onCloseDeletePopup(event, isConfirmed){
        const popup = {...this.state.popup};

        popup.visibility = false;
        popup.error = undefined;

        if(isConfirmed){
            try {
                await axios.delete(process.env.REACT_APP_API_URL + this.props.apiRoute, {data: popup.data.id});
            }catch (error) {
                popup.error = ErrorCodeManager.message(error.response ?? error);
                popup.visibility = true;
            }
        }

        popup.data = undefined;

        this.setState({
            popup
        });
    }

    render(){
        return (
            <>
                <BackOfficeTable columns={this.props.columns} data={this.state.tableContent} onClickEditButton={(event, selectedObject) => this.onClickEditButton(event, selectedObject)} onClickDeleteButton={(event, selectedObject) => this.onClickDeleteButton(event, selectedObject)} error={this.state.error} mapper={this.props.mapper} />
                <BackOfficeModal data={this.state.modal.data} modalIsVisible={this.state.modal.visibility} form={this.props.form} title={this.props.singularTableLabel} error={this.state.modal.error} onHide={(event) => this.onHideModal(event)} onSave={(event, object, isAnUpdate) => this.onSaveModal(event, object, isAnUpdate)}/>
                <DeletePopup popupIsVisible={this.state.popup.visibility} title={this.props.singularTableLabel} onClose={(event, isConfirmed) => this.onCloseDeletePopup(event, isConfirmed)} error={this.state.popup.error}/>
            </>
        )
    }
}

export default BackEndPanel;