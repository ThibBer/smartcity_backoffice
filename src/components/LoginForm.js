import React from 'react';
import './../css/loginForm.css'

class SearchForm extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        }
    }

    async login(event){
        event.preventDefault();

        //TODO login
    }

    formDataAreValid(){
        return this.state.email.length > 0 && this.state.email.password > 0;
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="d-flex flex-column min-vh-100 justify-content-center w-50">
                        <form id="login-form" className="bg-dark p-5 text-light">
                            <div className="form-group">
                                <label>Adresse email</label>
                                <input className="form-control bg-dark" type="email" placeholder="Adresse email:" onChange={(event) => {
                                    this.setState({email: event.target.value});
                                }}/>
                            </div>

                            <div className="form-group">
                                <label>Mot de passe</label>
                                <input className="form-control bg-dark" type="password" placeholder="Mot de passe:" onChange={(event) => {
                                    this.setState({password: event.target.value});
                                }}/>
                            </div>

                            <button className="btn text-light mx-auto d-block border-white" onClick={(event) => this.login(event)} disabled={!this.formDataAreValid()}>Se connecter</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchForm;