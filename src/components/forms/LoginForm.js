import React from 'react';
import '../../css/loginForm.css'
import Error from "../Error";
import {Redirect} from "react-router-dom";

import axios from "axios";
import axiosRetry from 'axios-retry';
axiosRetry(axios, {retries: process.env.REACT_APP_EXPONENTIAL_RETRY_COUNT});

class LoginForm extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            error: undefined,
            isLogged: false
        }
    }

    async login(event){
        event.preventDefault();

        let errorMessage = undefined;

        try{
            const response = await axios.post(process.env.REACT_APP_API_URL + "/login", {email: this.state.email, password: this.state.password});
            const jwt = response.data;

            const payload = jwt.split(".")[1];
            const userData = JSON.parse(Buffer.from(payload, 'base64').toString('utf-8'));

            if(Date.now() >= userData.exp * 1000){
                this.setState({error: "Votre session à expirée. Veuillez vous connecter"});
            } else if(userData.role !== "admin"){
                this.setState({error: "Vous n'êtes pas autorisé à vous connecter."});
            }else{
                localStorage.setItem("jwt", jwt);
                this.setState({isLogged: true, error: undefined});
            }
        }catch (e) {
            const error = e.response;
            errorMessage = "Une erreur inattendue est survenue ...";

            if(error?.message === "Network Error"){
                errorMessage = "Une erreur serveur rend cette action impossible";
            }else if (error.status === 404){
                errorMessage = "Adresse email et/ou mot de passe invalide";
            }

            this.setState({error: errorMessage});
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
                            <form id="login-form" >
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

                                <button className="btn text-white mx-auto d-block border-white mt-md-3" onClick={(event) => this.login(event)}>Se connecter</button>
                            </form>
                            {this.state.error && <Error content={this.state.error}/>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginForm;