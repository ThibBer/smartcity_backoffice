import React from 'react';
import '../../css/loginForm.css'
import axios from "axios";
import Error from "../Error";

class LoginForm extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            error: undefined
        }
    }

    async login(event){
        event.preventDefault();

        let errorMessage = undefined;

        try{
            const response = await axios.post(process.env.REACT_APP_API_URL + "/login", {email: this.state.email, password: this.state.password});
        }catch (e) {
            const error = e.response;
            errorMessage = "Une erreur inattendue est survenue ...";

            if(error?.message === "Network Error"){
                errorMessage = "Une erreur serveur rend cette action impossible";
            }else if (error.status === 404){
                errorMessage = "Adresse email et/ou mot de passe invalide";
            }
        }

        this.setState({error: errorMessage});
    }

    formDataAreValid(){
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    render() {
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