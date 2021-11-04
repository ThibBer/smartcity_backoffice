import React from 'react';
import './../css/loginForm.css'
import './../css/verticalActionBar.css'
import {Accordion} from "react-bootstrap";
import SearchBar from "./SearchBar";

class VerticalActionsBar extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            onMenuItemSelected: props.onMenuItemSelected,
            login: "",
            firstname: "Thibaut",
            lastname: "BERG",
            role: "admin",
            currentButton: "user",
            buttons:[
                {name: "user", label: "Utilisateurs", icon: "fa-user"},
                {name: "report", label: "Signalement", icon: "fa-file-chart-line"},
                {name: "event", label: "Évenements", icon: "fa-calendar-week"},
                {name: "reportType", label: "Types de signalement", icon: "fa-list"},
            ]
        }
    }

    onMenuItemClick(event, name){
        this.setState({
            currentButton: name,
        });

        this.state.onMenuItemSelected(event, name);
    }

    render() {
        return (
            <div id="vertical-action-bar">
                <div className="row text-center">
                    <div className="col">
                        <h4>{this.state.firstname} {this.state.lastname}</h4>
                        <p>{this.state.role.toUpperCase()}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col ">
                        <Accordion className="pt-2">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Filtrer la liste</Accordion.Header>
                                <Accordion.Body>
                                    <SearchBar/>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <Accordion defaultActiveKey="0" className="pb-2">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Entités</Accordion.Header>
                                <Accordion.Body className="px-0">
                                    {
                                        this.state.buttons.map(button => {
                                            return (
                                                <div key={button.name} className=" w-100">
                                                    <button  className={"btn btn-nav-smartcity  w-100" + (this.state.currentButton === button.name ? " current-menu-item" : "")} onClick={(event) => this.onMenuItemClick(event, button.name)}>
                                                        <i className={"far "+  button.icon}/> {button.label}
                                                    </button>
                                                </div>
                                            )
                                        })
                                    }
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                </div>
            </div>
        );
    }
}

export default VerticalActionsBar;