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
    function jwtIsValid(key){
        const jwtToken = localStorage.getItem(key);
        const jwt = jwtManager.decode(jwtToken);
        const jwtIsValid = jwtToken !== null && jwtManager.isValid(jwt);

        if(!jwtIsValid){
            localStorage.removeItem(key);
        }

        return jwtIsValid;
    }

    const HomeComponent = () => jwtIsValid("jwt") ? <WalloniaFixed/> : <Redirect to={"/login"}/>
    const LoginComponent = () => jwtIsValid("jwt") ? <Redirect to={"/"}/> : <LoginForm/>

    return(
        <Router>
            <Switch>
                <Route exact path="/login" component={LoginComponent}/>
                <Route path="/" component={HomeComponent}/>
            </Switch>
        </Router>
    );
}