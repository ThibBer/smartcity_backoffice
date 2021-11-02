import React from 'react';
import './../css/topBar.css'
import logo from '../logo.svg'

class SearchForm extends React.Component{

    constructor(props) {
        super(props);
    }

    logout() {

    }

    render() {
        return (
            <div className="container-fluid bg-dark">
                <div className="row">
                    <div className="col-4">
                        <img src={logo} alt="logo" width={100}/>
                    </div>
                    <div className="col-4">
                        <h3 className="text-white">WALLONIA FIXED</h3>
                    </div>
                    <div className="col-4">
                        <a href="" onClick={(event => this.logout(event))}><i className="fal fa-sign-out-alt text-white fa-2x"></i></a>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchForm;