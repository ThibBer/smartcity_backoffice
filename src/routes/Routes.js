import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

export default function Routes(){
    return(
        <Router>
            <Switch>
                <Route path="/login">
                </Route>
                <Route path="/">
                </Route>
            </Switch>
        </Router>
    );
}