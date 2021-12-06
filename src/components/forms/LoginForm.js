import React from 'react';
import '../../css/loginForm.css'
import Error from "../Error";
import {Redirect} from "react-router-dom";
import JwtManager from "../../JwtManager";
import ErrorCodeManager from "../ErrorCodeManager";
import Spinner from "../Spinner";
import GitHubLogo from "../../images/github.svg";
import HenalluxLogo from "../../images/henallux.svg";
import BernardNicolas from "../../images/bernard_nicolas.jpg";
import BergThibaut from "../../images/berg_thibaut.png";

import ApiWebService from "../../api/ApiWebService";

class LoginForm extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            error: undefined,
            isLogged: false,
            loginSubmitted: false
        }
    }

    async login(event){
        event.preventDefault();
        this.setState({error: undefined, isLogged: false, loginSubmitted: true})

        try{
            const response = await ApiWebService.post("login", {email: this.state.email, password: this.state.password});

            const jwt = response.data;
            const decodedJWT = JwtManager.decode(jwt);

            if(!JwtManager.isValid(decodedJWT)){
                this.setState({error: "Votre session à expirée. Veuillez vous connecter"});
            } else if(decodedJWT.payload.user.role !== "admin"){
                this.setState({error: "Vous n'êtes pas autorisé à vous connecter."});
            }else{
                localStorage.setItem(process.env.REACT_APP_JWT_KEY, jwt);
                this.setState({isLogged: true, error: undefined, loginSubmitted: false});
            }
        }catch (error) {
            const errorMessage = ErrorCodeManager.message(error, function(error){
                if(error?.status === 404){
                    return "Adresse email et/ou mot de passe invalide";
                }
            });

            this.setState({error: errorMessage, loginSubmitted: false});
        }
    }

    render() {
        if(this.state.isLogged){
            return <Redirect to="/"/>
        }

        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="d-flex flex-column min-vh-100 justify-content-center w-50">
                        <div id="form-container" className="bg-smartcity p-5 text-light">
                            <div id="login-form">
                                <div className={"text-center"}>
                                    <h3>Wallonia Fixed - Administration</h3>
                                </div>
                                <div className="form-group">
                                    <label>Adresse email</label>
                                    <input className="form-control bg-smartcity" type="email" placeholder="Adresse email" name="email" onChange={(event) => {
                                        this.setState({email: event.target.value});
                                    }}/>
                                </div>

                                <div className="form-group mt-md-3">
                                    <label>Mot de passe</label>
                                    <input className="form-control bg-smartcity" type="password" placeholder="Mot de passe" name="password" onChange={(event) => {
                                        this.setState({password: event.target.value});
                                    }}/>
                                </div>

                                {(!this.state.isLogged && this.state.loginSubmitted && !this.state.error) && <Spinner />}

                                <button className="btn text-white mx-auto d-block border-white mt-md-3" onClick={(event) => this.login(event)}>Se connecter</button>
                            </div>
                            {this.state.error && <Error content={this.state.error}/>}
                        </div>
                        <div className="text-center">
                            <small>Créé par BERG Thibaut & BERNARD Nicolas pour le projet SmartCity - Henallux IESN (IG3)</small>
                        </div>

                        <ul id="icons-list" className="list-inline mx-auto mt-3">
                            <li><a target="_blank" rel="noreferrer" href="https://www.henallux.be/"><img src={HenalluxLogo} width="55" alt="Logo henallux"/></a></li>
                            <li><a target="_blank" rel="noreferrer" href="https://github.com/ThibBer/smartcity_backoffice"><img src={GitHubLogo} width="55" alt="Logo github"/></a></li>
                            <li><a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/nicolas-bernico-bernard"><img src={BernardNicolas} width="55" alt="Nicolas Bernard"/></a></li>
                            <li><a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/thibautberg/"><img src={BergThibaut} width="55" alt="Thibaut Berg"/></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginForm;