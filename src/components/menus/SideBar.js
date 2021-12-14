import React from 'react';
import '../../css/loginForm.css'
import '../../css/verticalActionBar.css'
import {Accordion} from "react-bootstrap";
import SearchBar from "./SearchBar";
import SideBarItems from "../data/SideBarItems"
import UserRoles from "../data/UserRoles"
import jwtManager from "../../utils/JwtManager";
import PropTypes from "prop-types";

class SideBar extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            currentButton: SideBarItems[0],
            firstname: "",
            lastname: "",
            role: ""
        }
    }

    componentDidMount() {
        const jwtToken = localStorage.getItem(process.env.REACT_APP_JWT_KEY);
        const jwt = jwtManager.decode(jwtToken);
        const {first_name, last_name, role} = jwt.payload.user;

        this.setState({firstname: first_name,lastname: last_name, role: UserRoles[role]});
    }

    onMenuItemClick(event, item){
        this.setState({
            currentButton: item,
        });

        this.props.onMenuItemSelected(event, item);
    }

    render() {
        return (
            <div id="vertical-action-bar">
                <div className="row text-center">
                    <div className="col">
                        <h4>{this.state.firstname.toUpperCase()} {this.state.lastname.toUpperCase()}</h4>
                        <p className={"user-role"}>{this.state.role?.toUpperCase()}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col ">
                        <Accordion className="pt-2">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Filtrer la liste</Accordion.Header>
                                <Accordion.Body>
                                    <SearchBar onFilter={(filterValue) => this.props.onFilter(filterValue)}/>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <Accordion defaultActiveKey="0" className="pb-2">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Navigation</Accordion.Header>
                                <Accordion.Body className="px-0">
                                    {
                                        SideBarItems.map(item => {
                                            return (
                                                <div key={item.name} className=" w-100">
                                                    <button  className={"btn btn-nav-smartcity  w-100" + (this.state.currentButton.name === item.name ? " current-menu-item" : "")} onClick={(event) => this.onMenuItemClick(event, item)}>
                                                        <i className={"far "+  item.icon}/> {item.label}
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

SideBar.propTypes = {
    onMenuItemSelected: PropTypes.func.isRequired
}

export default SideBar;