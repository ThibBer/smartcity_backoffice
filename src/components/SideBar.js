import React from 'react';
import './../css/loginForm.css'
import './../css/verticalActionBar.css'
import {Accordion} from "react-bootstrap";
import SearchBar from "./SearchBar";
import SideBarItems from "./data/SideBarItems"

class SideBar extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            onMenuItemSelected: props.onMenuItemSelected,
            login: "",
            firstname: "Thibaut",
            lastname: "BERG",
            role: "admin",
            currentButton: "user"
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
                                        SideBarItems.map(button => {
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

export default SideBar;