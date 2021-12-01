import React from 'react';
import TopBar from "./menus/TopBar";
import SideBar from "./menus/SideBar";
import BackEndPanel from "./BackEndPanel";
import SideBarItems from "./data/SideBarItems";
import {Form} from "react-bootstrap";
import ElementsByPage from "./data/ElementsByPage";

class WalloniaFixed extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            currentItem: SideBarItems[0],
            modalIsVisible: false,
            filter: undefined,
            nbElementsPerPage: ElementsByPage[0]
        }
    }

    onMenuItemSelected(event, item){
        this.setState({currentItem: item});
    }

    onModalClosed(){
        this.setState({modalIsVisible: false})
    }

    getTableIcon(){
        return (<i className={"far " + this.state.currentItem.icon}/>);
    }

    onClickAddElementButton(){
        this.setState({modalIsVisible: true});
    }

    onFilter(filter){
        this.setState({filter})
    }

    onUpdateElementsByPage(event){
        const nbElementsPerPage = event.target.value;

        this.setState({nbElementsPerPage})
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
                                    <SideBar onMenuItemSelected={(event, item) => this.onMenuItemSelected(event, item)} onFilter={(filterValue) => this.onFilter(filterValue)}/>
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
                                                <BackEndPanel modalIsVisible={this.state.modalIsVisible} singularTableLabel={this.state.currentItem.singularLabel} onModalClosed={() => this.onModalClosed()} apiRoute={this.state.currentItem.apiRoute} columns={this.state.currentItem.columns} mapper={this.state.currentItem.mapper} filter={this.state.filter} nbElementsPerPage={this.state.nbElementsPerPage}/>
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