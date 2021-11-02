import React from 'react';
import './../css/loginForm.css'
import './../css/verticalActionBar.css'
import {Accordion} from "react-bootstrap";
import SearchBar from "./SearchBar";

class VerticalActionsBar extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            login: "",
            firstname: "Jean",
            lastname: " Dupont",
            role: "admin"

        }
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
                    <div className="col">
                        <Accordion defaultActiveKey="0" className="pt-2">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Filtrer la liste</Accordion.Header>
                                <Accordion.Body>
                                    <SearchBar/>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <Accordion className="pb-2">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Entités</Accordion.Header>
                                <Accordion.Body>
                                    <button className="btn"><i className="far fa-user"/> Utilisateurs</button>
                                    <button className="btn"><i className="far fa-file-chart-line"/> Signalement</button>
                                    <button className="btn"><i className="far fa-calendar-week"/> Évenements</button>
                                    <button className="btn"><i className="far fa-list"/> Types de signalement</button>
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