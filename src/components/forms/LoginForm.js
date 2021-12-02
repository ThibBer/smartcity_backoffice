import React from 'react';
import '../../css/loginForm.css'
import Error from "../Error";
import {Redirect} from "react-router-dom";
import JwtManager from "../../JwtManager";

import axios from "axios";
import axiosRetry from 'axios-retry';
import ErrorCodeManager from "../ErrorCodeManager";
import Spinner from "../Spinner";
axiosRetry(axios, {retries: process.env.REACT_APP_EXPONENTIAL_RETRY_COUNT});

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
            const response = await axios.post(process.env.REACT_APP_API_URL + "login", {email: this.state.email, password: this.state.password});
            const jwt = response.data;
            const decodedJWT = JwtManager.decode(jwt);

            if(!JwtManager.isValid(decodedJWT)){
                this.setState({error: "Votre session à expirée. Veuillez vous connecter"});
            } else if(decodedJWT.payload.user.role !== "admin"){
                this.setState({error: "Vous n'êtes pas autorisé à vous connecter."});
            }else{
                localStorage.setItem("jwt", jwt);
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
                                    <h3>Wallonia Fixed</h3>
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

                                {(!this.state.isLogged && this.state.loginSubmitted && !this.state.error) && <Spinner text={""} />}

                                <button className="btn text-white mx-auto d-block border-white mt-md-3" onClick={(event) => this.login(event)}>Se connecter</button>
                            </div>
                            {this.state.error && <Error content={this.state.error}/>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginForm;