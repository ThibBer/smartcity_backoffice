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
    function jwtIsValid(){
        const jwtToken = localStorage.getItem(process.env.REACT_APP_JWT_KEY);
        const jwt = jwtManager.decode(jwtToken);
        const jwtIsValid = jwtToken !== null && jwtManager.isValid(jwt);

        if(!jwtIsValid){
            localStorage.removeItem(process.env.REACT_APP_JWT_KEY);
        }

        return jwtIsValid;
    }

    const HomeComponent = () => jwtIsValid() ? <WalloniaFixed/> : <Redirect to={"/login"}/>
    const LoginComponent = () => jwtIsValid() ? <Redirect to={"/"}/> : <LoginForm/>

    return(
        <Router>
            <Switch>
                <Route exact path="/login" component={LoginComponent}/>
                <Route path="/" component={HomeComponent}/>
            </Switch>
        </Router>
    );
}