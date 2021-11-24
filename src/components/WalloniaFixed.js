import React from 'react';
import TopBar from "./menus/TopBar";
import SideBar from "./menus/SideBar";
import BackEndPanel from "./BackEndPanel";
import SideBarItems from "./data/SideBarItems";

class WalloniaFixed extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            currentItem: SideBarItems[0],
            modalIsVisible: false,
            loadAuxiliaryData: false
        }
    }

    onMenuItemSelected(event, item){
        this.setState({currentItem: item});
    }

    onModalClosed(){
        this.setState({modalIsVisible: false, loadAuxiliaryData: false})
    }

    getTableIcon(){
        return (<i className={"far " + this.state.currentItem.icon}/>);
    }

    onClickAddElementButton(event){
        this.setState({modalIsVisible: true, loadAuxiliaryData: true});
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row min-vh-100">
                    <div className="col">
                        <div className="d-flex flex-column h-100">
                            <div className="row">
                                <TopBar/>
                            </div>
                            <div className="row flex-grow-1">
                                <div className="col-2 py-4">
                                    <SideBar onMenuItemSelected={(event, item) => this.onMenuItemSelected(event, item)}/>
                                </div>
                                <div className="col-10 py-4">
                                    <div id="panel" className="p-3">
                                        <div className="row text-center">
                                            <div className="col">
                                                <h3 id="table-label">{this.getTableIcon()}&nbsp;&nbsp;{this.state.currentItem.label}</h3>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col">
                                                <button className="btn btn-smartcity rounded-pill" onClick={(event) => this.onClickAddElementButton(event)}>
                                                    <i className="far fa-plus-circle"/>&nbsp;&nbsp;Ajouter un élément
                                                </button>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col">
                                                <BackEndPanel modalIsVisible={this.state.modalIsVisible} singularTableLabel={this.state.currentItem.singularLabel} onModalClosed={() => this.onModalClosed()} apiRoute={this.state.currentItem.apiRoute} form={this.state.currentItem.form} columns={this.state.currentItem.columns} mapper={this.state.currentItem.mapper} loadAuxiliaryData={this.state.loadAuxiliaryData}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WalloniaFixed;