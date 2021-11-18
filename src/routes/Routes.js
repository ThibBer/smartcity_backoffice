import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";
import WalloniaFixed from "../components/WalloniaFixed";

export default function Routes(){
    return(
        <Router>
            <Switch>
                <Route path="/login">
                    <LoginForm/>
                </Route>
                <Route path="/">
                    <WalloniaFixed/>
                </Route>
            </Switch>
        </Router>
    );
}