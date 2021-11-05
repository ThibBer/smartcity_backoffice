import React from 'react';
import './../css/panel.css'
import './../css/verticalActionBar.css'
import UserTable from "./Tables/UserTable";
import ReportTable from "./Tables/ReportTable";
import EventTable from "./Tables/EventTable";
import ReportTypeTable from "./Tables/ReportTypeTable";

class Panel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            currentTable: props.currentButtonChoice ?? "user"
        }
    }

    getCurrentTableComponent(){
        switch(this.state.currentTable){
            case "user":
                return <UserTable/>
            case "report":
                return <ReportTable/>
            case "event":
                return <EventTable/>
            case "reportType":
                return <ReportTypeTable/>
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

    render() {
        return (
            <div id="panel" className="p-3">
                <div className="row text-center">
                    <div className="col">
                        <h3 id="table-label">{this.getTableIcon(this.state.currentTable)} {this.getTableLabel(this.state.currentTable)}</h3>
                    </div>
                </div>
                {/*HEADER*/}
                <div className="row">
                    <div className="col">
                        <button className="btn btn-smartcity rounded-pill"><i
                            className="far fa-plus-circle"/>&nbsp;&nbsp;Ajouter un élément
                        </button>
                    </div>
                </div>

                {/*TABLE*/}
                <div className="row">
                    <div className="col">
                        {this.getCurrentTableComponent()}
                    </div>
                </div>
            </div>

        );
    }
}

export default Panel;