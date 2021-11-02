import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import LoginForm from "../components/LoginForm";
import BackOffice from "../components/BackOffice";

export default function Routes(){
    return(
        <Router>
            <Switch>
                <Route path="/login">
                    <LoginForm/>
                </Route>
                <Route path="/">
                    <BackOffice/>
                </Route>
            </Switch>
        </Router>
    );
}