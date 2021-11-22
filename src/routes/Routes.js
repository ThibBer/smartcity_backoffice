import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";
import WalloniaFixed from "../components/WalloniaFixed";

export default function Routes(){
    const jwtExist = localStorage.getItem("jwt") !== null;

    return(
        <Router>
            <Switch>
                <Route path="/login">
                    {!jwtExist ? <LoginForm/> : <Redirect to={"/"}/>}
                </Route>
                <Route path="/">
                    {jwtExist ? <WalloniaFixed/> : <Redirect to={"/login"}/>}
                </Route>
            </Switch>
        </Router>
    );
}