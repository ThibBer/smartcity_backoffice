import React from "react";
import {Form} from "react-bootstrap";
import UserRoles from "../data/UserRoles"
import Error from "../Error";

class UserForm extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            errors: this.props.errors,
            user: {...this.props.data},
        }
    }

    formattedDate(sqlDate){
        if(sqlDate === undefined){
            return sqlDate;
        }

        const date = new Date(sqlDate);
        return date.getFullYear()  + '-' + this.twoDigitFormatNumber(date.getMonth() + 1) + '-' + this.twoDigitFormatNumber(date.getDate());
    }

    twoDigitFormatNumber(number){
        if(number <= 9){
            return "0" + number;
        }

        return number;
    }

    async componentDidUpdate(previousProps, previousState, snapshot){
        if(previousProps.errors !== this.props.errors){
            this.setState({errors: this.props.errors});
        }
    }

    onInputChange(event, name){
        const report = {...this.state.report};
        const value = event.target.value;

        report[name] = value;

        this.props.onInputChange(name, value);
        this.setState({report});
    }

    render(){
        return(
            <form>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="email">Adresse email</label>
                            <input id="email" type="email" className="form-control" placeholder="Adresse email" defaultValue={this.state.user?.email} onChange={(event) => this.onInputChange(event, "email")}/>
                            {this.state.errors?.email && <Error content={this.state.errors.email}/>}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="password">Mot de passe</label>
                            <input id="password" type="password" className="form-control" placeholder="Mot de passe" onChange={(event) => this.onInputChange(event, "password")}/>
                            {this.props.isAnUpdate && <><small><i className="far fa-info-circle"/> Laisser le champ vide permet de modifier un utilisateur sans modifier son mot de passe</small><br/></>}
                            {this.state.errors?.password && <Error content={this.state.errors.password}/>}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="birth_date">Date de naissance</label>
                            <input id="birth_date" type="date" className="form-control" placeholder="Date de naissance" defaultValue={this.formattedDate(this.state.user?.birth_date)} onChange={(event) => this.onInputChange(event, "birth_date")}/>
                            {this.state.errors?.birth_date && <Error content={this.state.errors.birth_date}/>}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="group">Rôle utilisateur</label>
                            <Form.Select id="group" onClick={(event) => this.onInputChange(event, "role")} value={this.state.user?.role}>
                                <option>Rôle</option>
                                {
                                    Object.keys(UserRoles).map(role =>
                                        <option key={role} value={role}>{UserRoles[role]}</option>
                                    )
                                }
                            </Form.Select>
                            {this.state.errors?.role && <Error content={this.state.errors.role}/>}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="lastname">Nom</label>
                            <input id="lastname" type="text" className="form-control" placeholder="Nom" defaultValue={this.state.user?.last_name} onChange={(event) => this.onInputChange(event, "last_name")}/>
                            {this.state.errors?.last_name && <Error content={this.state.errors.last_name}/>}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="firstname">Prénom</label>
                            <input id="firstname" type="text" className="form-control" placeholder="Prénom" defaultValue={this.state.user?.first_name} onChange={(event) => this.onInputChange(event, "first_name")}/>

                            {this.state.errors?.first_name && <Error content={this.state.errors.first_name}/>}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="city">Ville</label>
                            <input id="city" type="text" className="form-control" placeholder="Ville" defaultValue={this.state.user?.city} onChange={(event) => this.onInputChange(event, "city")}/>

                            {this.state.errors?.city && <Error content={this.state.errors.city}/>}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="street">Rue</label>
                            <input id="street" type="text" className="form-control" placeholder="Rue" defaultValue={this.state.user?.street} onChange={(event) => this.onInputChange(event, "street")}/>

                            {this.state.errors?.street && <Error content={this.state.errors.street}/>}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="zip_code">Code postal</label>
                            <input id="zip_code" type="number" className="form-control" placeholder="Code postal" defaultValue={this.state.user?.zip_code} onChange={(event) => this.onInputChange(event, "zip_code")}/>

                            {this.state.errors?.zip_code && <Error content={this.state.errors.zip_code}/>}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group mb-3">
                            <label htmlFor="house_number">Numéro</label>
                            <input id="house_number" type="text" className="form-control" placeholder="Numéro" defaultValue={this.state.user?.house_number} onChange={(event) => this.onInputChange(event, "house_number")}/>
                            {this.state.errors?.house_number && <Error content={this.state.errors.house_number}/>}
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default UserForm;