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
    const jwt = localStorage.getItem("jwt");
    const decodedJWT = jwtManager.decode(jwt);
    const jwtIsValid = jwtManager.isValid(decodedJWT);

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