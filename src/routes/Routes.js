import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";
import WalloniaFixed from "../components/WalloniaFixed";

import jwtManager from "../JwtManager";

export default function Routes(){
    const jwtToken = localStorage.getItem("jwt");
    const jwt = jwtManager.decode(jwtToken);
    const jwtIsValid = jwtManager.isValid(jwt);

    if(!jwtIsValid){
        localStorage.removeItem("jwt");
    }

    return(
        <Router>
            <Switch>
                <Route path="/login">
                    {jwtIsValid ? <Redirect to={"/"}/> : <LoginForm/>}
                </Route>
                <Route path="/">
                    {jwtIsValid ? <WalloniaFixed/> : <Redirect to={"/login"}/>}
                </Route>
            </Switch>
        </Router>
    );
}