import React from 'react';
import BackOfficeTable from "./tables/BackOfficeTable";
import BackOfficeModal from "./modals/BackOfficeModal";
import ErrorCodeManager from "./ErrorCodeManager"
import DeletePopup from "./modals/DeletePopup";

import PropTypes from "prop-types";
import ApiWebService from "../api/ApiWebService";


class BackEndPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tableContent: undefined,
            error: undefined,
            filter: "",
            currentPagination: 1,
            nbElementsPerPage: this.props.nbElementsPerPage,
            allEntitiesCount: 0,
            apiRoute: this.props.apiRoute,
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
            tableContent: undefined,
            error: undefined
        });

        const filter = this.state.filter;
        try {
            const webServiceAddress = this.state.apiRoute + "/filter/" + this.state.nbElementsPerPage * (this.state.currentPagination - 1) + "&" + this.state.nbElementsPerPage + (filter && ("&" + filter));
            const response = await ApiWebService.get(webServiceAddress);

            const jsonResponse = response.data

            //countWithoutLimit : values which contains filter
            this.setState({tableContent: jsonResponse.data, allEntitiesCount: jsonResponse.countWithoutLimit});
        }catch (error) {
            this.setState({
                error: ErrorCodeManager.message(error)
            });
        }
    }

    async componentDidUpdate(previousProps, previousState, snapshot){
        if(previousProps.modalIsVisible !== this.props.modalIsVisible){
            const modal = this.state.modal;
            modal.visibility = this.props.modalIsVisible;

            this.setState({modal});
        }

        if(previousProps.nbElementsPerPage !== this.props.nbElementsPerPage){
            await this.setState({nbElementsPerPage: this.props.nbElementsPerPage, currentPagination: 1});

            await this.loadTableContent();
        }

        if(previousProps.apiRoute !== this.props.apiRoute){
            await this.setState({tableContent: undefined, apiRoute: this.props.apiRoute, currentPagination: 1});
            await this.loadTableContent();
        }

        if(previousProps.filter !== this.props.filter){
            await this.setState({filter: this.props.filter});
            await this.loadTableContent();
        }
    }

    /*EDIT MODAL CALLBACKS*/

    // ON CLOSE MODAL
    onHideModal(){
        const modal = {
            visibility: false,
            data: undefined,
            error: undefined,
            rowIndex: undefined
        };

        this.setState({modal});

        this.props.onModalClosed();
    }

    // ON SAVE MODAL
    async onSaveModal(event, data, isAnUpdate){
        const modal = {...this.state.modal};
        const tableContent = [...this.state.tableContent];

        try {
            const webServiceAddress = process.env.REACT_APP_API_URL + this.state.apiRoute;
            if(isAnUpdate){
                await ApiWebService.get(webServiceAddress, data);

                tableContent[this.state.modal.rowIndex] = data;
            }else{
                const response = await ApiWebService.post(webServiceAddress, data);

                data.id = response.data.id;

                tableContent.push(data);
            }

            modal.visibility = false;
            modal.error = undefined;
            modal.data = undefined;
        }catch (error) {
            modal.error = ErrorCodeManager.message(error);
        }

        this.props.onModalClosed();
        this.setState({modal, tableContent});
    }

    /*TABLE CALLBACKS*/
    async onClickEditButton(event, selectedObject, rowIndex){
        const modal = {...this.state.modal};

        modal.visibility = true;
        modal.data = selectedObject;
        modal.rowIndex = rowIndex;

        this.setState({modal});
    }

    onClickDeleteButton(event, selectedObject, rowIndex){
        const popup = {...this.state.popup};
        popup.visibility = true;
        popup.data = selectedObject;
        popup.rowIndex = rowIndex;

        const modal = {...this.state.modal};

        this.setState({
            popup,
            modal
        });
    }

    /*DELETE MODAL CALLBACKS*/
    async onCloseDeletePopup(event, isConfirmed){
        const popup = {...this.state.popup};
        const tableContent = [...this.state.tableContent];

        popup.visibility = false;
        popup.error = undefined;

        if(isConfirmed){
            try {
                await ApiWebService.delete(this.state.apiRoute, popup.data);

                tableContent.splice(this.state.popup.rowIndex, 1);
            }catch (error) {
                popup.visibility = true;
                popup.error = ErrorCodeManager.message(error);
            }
        }

        popup.data = undefined
        popup.rowIndex = undefined;

        this.setState({
            popup, tableContent
        });
    }

    async onPaginationClick(newPagination){
        if(this.state.currentPagination !== newPagination){
            await this.setState({currentPagination: newPagination});

            await this.loadTableContent();
        }
    }

    render() {
        return (
            <>
                <BackOfficeTable columns={this.props.columns} data={this.state.tableContent}
                                 onClickEditButton={(event, selectedObject, rowIndex) => this.onClickEditButton(event, selectedObject, rowIndex)}
                                 onClickDeleteButton={(event, selectedObject, rowIndex) => this.onClickDeleteButton(event, selectedObject, rowIndex)}
                                 error={this.state.error} mapper={this.props.mapper} filter={this.state.filter}
                                 allEntitiesCount={this.state.allEntitiesCount}
                                 onPaginationClick={(newPagination) => this.onPaginationClick(newPagination)}
                                 nbElementsPerPage={this.state.nbElementsPerPage}
                                 currentPagination={this.state.currentPagination}/>

                <BackOfficeModal data={this.state.modal.data} modalIsVisible={this.state.modal.visibility}
                                 title={this.props.singularTableLabel} error={this.state.modal.error}
                                 onHide={(event) => this.onHideModal(event)}
                                 onSave={(event, object, isAnUpdate) => this.onSaveModal(event, object, isAnUpdate)}
                                 apiRoute={this.state.apiRoute}
                />

                <DeletePopup popupIsVisible={this.state.popup.visibility} title={this.props.singularTableLabel}
                             onClose={(event, isConfirmed) => this.onCloseDeletePopup(event, isConfirmed)}
                             error={this.state.popup.error}/>
            </>
        )
    }
}

BackEndPanel.propTypes = {
    nbElementsPerPage: PropTypes.number,
    apiRoute: PropTypes.string,
    modalIsVisible: PropTypes.bool,
    filter: PropTypes.string,
    onModalClosed: PropTypes.func.isRequired,
    columns: PropTypes.array,
    mapper: PropTypes.func.isRequired,
    singularTableLabel: PropTypes.string
}

export default BackEndPanel;