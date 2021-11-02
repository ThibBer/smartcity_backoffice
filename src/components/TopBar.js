import React from 'react';
import './../css/topBar.css'
import logo from '../logo.svg'

class TopBar extends React.Component{
    logout() {

    }

    render() {
        return (
            <div id="top-bar" className="row bg-smartcity">
                <div className="col-4">
                    <img src={logo} alt="logo" width={100}/>
                </div>
                <div className="col-4 text-center">
                    <h3 className="text-white">WALLONIA FIXED</h3>
                </div>
                <div className="col-4 text-right">
                    <a href="/" onClick={(event => this.logout(event))}><i className="fal fa-sign-out-alt text-white fa-2x"/></a>
                </div>
            </div>
        );
    }
}

export default TopBar;