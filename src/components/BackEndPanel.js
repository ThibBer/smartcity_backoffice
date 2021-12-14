import React from 'react';
import BackOfficeTable from "./tables/BackOfficeTable";
import BackOfficeModal from "./modals/BackOfficeModal";
import ErrorCodeManager from "./ErrorCodeManager"
import DeletePopup from "./modals/DeletePopup";

import PropTypes from "prop-types";
import ApiWebService from "../api/ApiWebService";
import {Form} from "react-bootstrap";
import ElementsByPage from "./data/ElementsByPage";

import Comparator from "../utils/Comparator";


class BackEndPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tableContent: undefined,
            error: undefined,
            filter: "",
            currentPagination: 1,
            nbElementsPerPage: ElementsByPage[0],
            allEntitiesCount: 0,
            apiRoute: this.props.currentItem.apiRoute,
            modal: {
                visibility: false,
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

    onModalClosed(){
        const modal = {...this.state.modal};
        modal.visibility = false;

        this.setState(modal);
    }

    onClickAddElementButton(){
        const modal = {...this.state.modal};
        modal.visibility = true;

        this.setState(modal);
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

        if(!Comparator.objectsAreEquals(previousProps.currentItem, this.props.currentItem)){
            await this.setState({tableContent: undefined, apiRoute: this.props.currentItem.apiRoute, currentPagination: 1});
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

        this.onModalClosed();
    }

    // ON SAVE MODAL
    async onSaveModal(event, data, isAnUpdate){
        const modal = {...this.state.modal};
        const tableContent = [...this.state.tableContent];

        try {
            if(isAnUpdate){
                await ApiWebService.patch(this.state.apiRoute, data);

                tableContent[this.state.modal.rowIndex] = data;
            }else{
                const response = await ApiWebService.post(this.state.apiRoute, data);

                data.id = response.data.id;

                tableContent.push(data);
            }

            modal.visibility = false;
            modal.error = undefined;
            modal.data = undefined;
        }catch (error) {
            modal.error = ErrorCodeManager.message(error);
        }

        this.onModalClosed();
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

    getTableIcon(){
        return (<i className={"far " + this.props.currentItem.icon}/>);
    }

    async onUpdateElementsByPage(event){
        await this.setState({nbElementsPerPage: event.target.value, currentPagination: 1});
        await this.loadTableContent();
    }

    render() {
        return (
            <>
                <div className="row text-center">
                    <div className="col">
                        <h3 id="table-label">{this.getTableIcon()}&nbsp;&nbsp;{this.props.currentItem.label}</h3>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <button className="btn btn-smartcity rounded-pill" onClick={(event) => this.onClickAddElementButton(event)}>
                            <i className="far fa-plus-circle"/>&nbsp;&nbsp;Ajouter un élément
                        </button>
                    </div>
                    <div className={"col-2"}>
                        <div className={"row"}>
                            <div className={"col-6"}>
                                <p>Nombre d'élements</p>
                            </div>
                            <div className={"col-6"}>
                                <Form.Select onChange={(event) => this.onUpdateElementsByPage(event)} value={this.state.nbElementsPerPage}>
                                    {
                                        ElementsByPage.map((nbElementsPerPage) =>{
                                            return <option key={nbElementsPerPage} value={nbElementsPerPage}>{nbElementsPerPage}</option>
                                        })
                                    }
                                </Form.Select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <BackOfficeTable columns={this.props.currentItem.columns} data={this.state.tableContent}
                                         onClickEditButton={(event, selectedObject, rowIndex) => this.onClickEditButton(event, selectedObject, rowIndex)}
                                         onClickDeleteButton={(event, selectedObject, rowIndex) => this.onClickDeleteButton(event, selectedObject, rowIndex)}
                                         error={this.state.error} mapper={this.props.currentItem.mapper} filter={this.state.filter}
                                         allEntitiesCount={this.state.allEntitiesCount}
                                         onPaginationClick={(newPagination) => this.onPaginationClick(newPagination)}
                                         nbElementsPerPage={this.state.nbElementsPerPage}
                                         currentPagination={this.state.currentPagination}/>

                        <BackOfficeModal data={this.state.modal.data} modalIsVisible={this.state.modal.visibility}
                                         title={this.props.currentItem.singularTableLabel} error={this.state.modal.error}
                                         onHide={(event) => this.onHideModal(event)}
                                         onSave={(event, object, isAnUpdate) => this.onSaveModal(event, object, isAnUpdate)}
                                         apiRoute={this.state.apiRoute}
                        />

                        <DeletePopup popupIsVisible={this.state.popup.visibility} title={this.props.currentItem.singularTableLabel}
                                     onClose={(event, isConfirmed) => this.onCloseDeletePopup(event, isConfirmed)}
                                     error={this.state.popup.error}/>
                    </div>
                </div>
            </>
        )
    }
}

BackEndPanel.propTypes = {
    modalIsVisible: PropTypes.bool,
    filter: PropTypes.string,
    currentItem: PropTypes.object.isRequired
}

export default BackEndPanel;