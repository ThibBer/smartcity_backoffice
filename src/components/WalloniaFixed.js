import React from 'react';
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import UserBackOffice from "./Tables/UserBackOffice";
import ReportTable from "./Tables/ReportTable";
import EventTable from "./Tables/EventTable";
import ReportTypeTable from "./Tables/ReportTypeTable";

class WalloniaFixed extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            currentButtonChoice: "user",
            modalIsVisible: false
        }
    }

    onMenuItemSelected(event, buttonName){
        this.setState({currentButtonChoice: buttonName});
    }

    getTable(){
        switch(this.state.currentButtonChoice){
            case "user":
                return <UserBackOffice modalIsVisible={this.state.modalIsVisible} onModalClosed={() => this.onModalClosed()}/>
            case "report":
                return <ReportTable modalIsVisible={this.state.modalIsVisible} onModalClosed={() => this.onModalClosed()}/>
            case "event":
                return <EventTable modalIsVisible={this.state.modalIsVisible} onModalClosed={() => this.onModalClosed()}/>
            case "reportType":
                return <ReportTypeTable modalIsVisible={this.state.modalIsVisible} onModalClosed={() => this.onModalClosed()}/>
            default:
                return "";
        }
    }

    getTableLabel(name){
        let label;
        switch(name){
            case "user":
                label = "Utilisateurs";
                break;
            case "report":
                label = "Signalements";
                break;
            case "event":
                label = "Événements";
                break;
            case "reportType":
                label = "Types de signalement";
                break;
            default:
                label = "";
        }

        return label;
    }

    getTableIcon(name){
        switch(name){
            case "user":
                return (<i className="far fa-user"/>);
            case "report":
                return (<i className="far fa-file-chart-line"/>);
            case "event":
                return (<i className="far fa-calendar-week"/>);
            case "reportType":
                return (<i className="far fa-list"/>);
            default:
                return "";
        }
    }

    onModalClosed(){
        this.setState({modalIsVisible: false})
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
                            <div className="row flex-grow-1 px-3">
                                <div className="col-2 py-4">
                                    <SideBar onMenuItemSelected={(event, itemSelected) => this.onMenuItemSelected(event, itemSelected)}/>
                                </div>
                                <div className="col-10 py-4">
                                    <div id="panel" className="p-3">
                                        <div className="row text-center">
                                            <div className="col">
                                                <h3 id="table-label">{this.getTableIcon(this.state.currentButtonChoice)}&nbsp;&nbsp;{this.getTableLabel(this.state.currentButtonChoice)}</h3>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col">
                                                <button className="btn btn-smartcity rounded-pill" onClick={(event) => {this.setState({modalIsVisible: true})}}>
                                                    <i className="far fa-plus-circle"/>&nbsp;&nbsp;Ajouter un élément
                                                </button>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col">
                                                {this.getTable()}
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