import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import LoginForm from "../components/LoginForm";

export default function Routes(){
    return(
        <Router>
            <Switch>
                <Route path="/login">
                    <LoginForm/>
                </Route>
                <Route path="/">
                </Route>
            </Switch>
        </Router>
    );
}